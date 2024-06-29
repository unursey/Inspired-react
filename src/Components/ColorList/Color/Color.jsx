import s from '../Color/Color.module.scss';
import cn from 'classnames';
import { useEffect, useRef } from 'react';

export const Color = ({ color, check }) => {
		const colorRef = useRef(null);

		useEffect(() => {
			colorRef.current.style.setProperty('--data-color', color)
		}, [color])

	return (
		<li ref={colorRef} className={cn(s.color, check && s.colorCheck)} />
	);
};