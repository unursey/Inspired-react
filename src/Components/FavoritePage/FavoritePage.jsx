import { useDispatch, useSelector } from "react-redux"
import { Goods } from "../Goods/Goods"
import { useEffect } from "react";
import { fetchCategory } from "../../features/goodsSlice";
import { useSearchParams } from "react-router-dom";
import s from './FavoritePage.module.scss'

export const FavoritePage = () => {
	const dispatch = useDispatch();
	const favorites = useSelector(state => state.favorites);
	const page = useSearchParams(dispatch);

	useEffect(() => {
		if(favorites){
			const param = { list: favorites }
			if(page){
				param.page = page;
			}
			dispatch(fetchCategory({ list: favorites }))
		}
	}, [favorites, page, dispatch])

	return (
		favorites.length ?
		<Goods title="Избранное" />
		:
		<h3 className={s.empty}>Вы ничего не добавили в избранное</h3>
	)
}