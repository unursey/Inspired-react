import { useEffect, useState } from 'react';
import { Container } from '../Layout/Container/Container';
import s from './ProductPage.module.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../features/productSlice';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../const';
import { ColorList } from '../ColorList/ColorList';
import { Count } from '../Count/Count';
import { ProductSize } from './ProductSize/ProductSize';
import { Goods } from '../Goods/Goods';
import { fetchCategory } from '../../features/goodsSlice';
import { BtnLike } from '../BtnLike/BtnLike';
import { addToCart } from '../../features/cartSlice';

export const ProductPage = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { product } = useSelector(state => state.product);
	const { colorList } = useSelector((state) => state.color);

	const { gender, category, colors } = product;
	const [ count, setCount ] = useState(1);
	const [ selectedColor, setSelectedColor ] = useState('');
	const [ selectedSize, setSelectedSize ] = useState('');

	const handleIncrement = () => {
		setCount((prevCount) => prevCount + 1 )
	}

	const handleDecrement = () => {
		if(count > 1) {
			setCount((prevCount) => prevCount - 1 )
		}
	}

	const handleColorChange = ( e ) => {
		setSelectedColor(e.target.value);
	};

	const handleSizeChange = ( e ) => {
		setSelectedSize(e.target.value);
	};

	useEffect(() => {
		dispatch(fetchProduct(id))
	}, [id, dispatch]);

	useEffect(() => {
		dispatch(fetchCategory({gender, category, count: 4, top: true, exclude: id}))
	},[gender, category, id, dispatch])

	useEffect(() => {
		if(colorList?.length && colors?.length){
			setSelectedColor(colorList.find(color => color.id === colors[0]).title)
		}
	},[colorList, colors])

	return (
		<>
		<section className={s.card}>
			<Container className={s.container}>
				<img className={s.image} src={`${API_URL}${product.pic}`} alt={`${product.title} ${product.description}`} />
				<form className={s.content} onSubmit={e => {
					e.preventDefault();
					dispatch(addToCart({
						id,
						color: selectedColor,
						size: selectedSize,
						count,
					}))
				}}>
					<h2 className={s.title}>{product.title}</h2>
					<p className={s.price}>{product.price} руб</p>

					<div className={s.vendorCode}>
						<span className={s.subtitle}>Артикул</span>
						<span className={s.id}>{product.id}</span>
					</div>

					<div className={s.color}>
						<p className={cn(s.subtitle, s.colorTitle)}>Цвет</p>
						<ColorList
						colors={colors}
						selectedColor={selectedColor}
						handleColorChange={handleColorChange}
						setSelectedColor={setSelectedColor}
						/>
					</div>

					<ProductSize size={product.size} selectedSize={selectedSize} handleSizeChange={handleSizeChange} />
					<div className={s.description}>
						<p className={cn(s.subtitle, s.descriptionTitle)}>Описание</p>
						<p className={s.descriptionText}>{product.description}</p>
					</div>

					<div className={s.control}>
						<Count
							className={s.count}
							count={count}
							handleIncrement={handleIncrement}
							handleDecrement={handleDecrement}
						/>

						<button className={s.addCart} type='submit'>В корзину</button>

							<BtnLike id={id} />

					</div>
				</form>
			</Container>
		</section>
		<Goods title='Вам также может понравиться' />
		</>
	)
};