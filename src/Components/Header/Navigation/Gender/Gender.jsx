import s from './Gender.module.scss';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { NavLink} from 'react-router-dom';

export const Gender = () => {
	const {activeGender, genderList, categories} = useSelector(state => state.navigation)

	return (
		<ul className={s.gender}>
			{genderList.map(gender => (
				<li key={gender} className={s.item}>
					<NavLink className={({isActive}) => 
					cn(s.link, (isActive || gender === activeGender) && s.linkActive)
					}
					to={`/catalog/${gender}`}>{categories[gender].title}</NavLink>
				</li>
			))}
		</ul>
	);
};