import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom"
import s from './Pagination.module.scss';
import cn from "classnames";
import { useEffect, useState } from "react";


export const Pagination = () => {
	const [ pagePagination, setPagePagination ] = useState('');
	const pathname = useLocation().pathname;
	const { page, pages } = useSelector(state => state.goods);

	useEffect(() => {
		setPagePagination(page)
	}, [page, setPagePagination]);

	const handlePageChange = (newPage => {
		setPagePagination(newPage);
	});

	const handlePrevPage = () => {
		if(pagePagination > 1) {
			handlePageChange(pagePagination - 1);
		}
	};

	const handleNextPage = () => {
		if(pagePagination < pages) {
			handlePageChange(pagePagination + 1);
		}
	};

	const renderPaginationItems = () => {
		const paginationItems = [];

		let startPage = (pagePagination === pages) && (pages >= 3)
		? pagePagination - 1 : Math.max(1, pagePagination - 2);

		let endPage = Math.min(startPage + 2, pages);

		for (let i = startPage ; i <= endPage; i++){
			paginationItems.push(
				<li key={i}>
					<NavLink
					to={`${pathname}?page=${i}`}
					className={cn(s.link, i ===  pagePagination ?? s.linkActive)}
					onClick={() => handlePageChange(i)}
					>{i}</NavLink>
				</li>
			)
		}
		return paginationItems;
	}

	return (
		pages > 1 &&
		<div className={s.pagination}>
			<button
				className={s.arrow}
				onClick={handlePrevPage}
				disabled={pagePagination <= 2}
			>
				<svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M5 7.06L1.90958 4L5 0.94L4.04858 0L-1.19209e-07 4L4.04858 8L5 7.06Z" fill="black"/>
				</svg>
			</button>
			<ul className={s.list}>
				{renderPaginationItems()}
			</ul>
			<button
				className={s.arrow}
				onClick={handleNextPage}
				disabled={pagePagination >= pages - 1 || pages <= 3}
			>
				<svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M0 7.06L3.09042 4L0 0.94L0.951417 0L5 4L0.951417 8L0 7.06Z" fill="black"/>
				</svg>
			</button>
		</div>
	)
}