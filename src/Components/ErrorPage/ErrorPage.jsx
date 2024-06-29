import { useLocation, useNavigate, useRouteError } from "react-router-dom"
import s from './ErrorPage.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchColors } from "../../features/colorSlice";
import { fetchNavigation } from "../../features/navigationSlice";

export const ErrorPage = () => {
	const error = useRouteError();
	const { status } = useSelector(state => state.statusServer);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const timerIdRef = useRef(null);

	useEffect(() => {
		if(status && location.pathname === '/404') {
			navigate('/');
		}
	},[navigate, status, location]);

	useEffect(() => {
		if(!status && location.pathname === '/404'){
			clearInterval(timerIdRef.current);

			timerIdRef.current = setInterval(() => {
				dispatch(fetchNavigation())
				dispatch(fetchColors())
			}, 3000)
		}

		return () => {
			clearInterval(timerIdRef.current);
		} 
	}, [dispatch, status, location])

	return (
		<div className={s.error}>
			<h2 className={s.title}>Произошла ошибка, попробуйте зайти позже</h2>
			<p className={s.message}>{error?.message ?? 'Неизвестная ошибка'}</p>
		</div>
	);
};