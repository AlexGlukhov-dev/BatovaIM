import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {addToCart, countTotalCartSum} from '../../../redux/slices/cartSlice';

// import Stepper from '../../../UI/Stepper';
import Button from '../../../UI/Button';
import ColorSelector from '../../ColorSelector';
import SizeSelector from '../../SizeSelector';

import {formatPrice, setExpiresCookies} from "../../../utils";

import classes from './pcInfo.module.scss';

import axios from "axios";
// import {useCookies} from "react-cookie";
export const postCart = async (endPoint, good) => {
	try {
		const response = await axios.post(endPoint,
			good
		);

		return await response.data;

	} catch (err) {
		console.log(err)
	}
};

const PCInfo = ({card, setShowModal}) => {
	const {product, sizes, images} = card;
	const dispatch = useDispatch();
	const [color, setColor] = useState('pink');
	const [size, setSize] = useState(sizes[0].value);
	const [sizeID, setSizeID] = useState(sizes[0].id);
	const [amount, setAmount] = useState(1);
	const [disableBtn, setDisableBtn] = useState(false);
	const [cartSizes, setCartSizes] = useState([]);
	//const _uid = product.title.split(' ').join('') + color + size;
	const _uid = product.title.split(' ').join('') + size;
	const userId = useSelector(state => state.auth.auth.userID);
	const totalSum = +product.price * +amount;
	const good = {
		userId,
		title: product.title,
		price: product.price,
		id: product.id,
		_uid,
		colors: product.colors[0].color,
		size,
		sizeId: sizeID,
		amount,
		src: images[0],
		totalSum
	};
	const cart = useSelector(state => state.cart.cart);

	// const [cookies, setCookie] = useCookies(['cart-products']);
	// const cookieValue = useSelector(state => state.cart.cookieValue);
	useEffect(() => {
		setCartSizes(cart.map(item => item.sizeID));
		cart.forEach(item => {
			if (item.sizeId === sizeID) setDisableBtn(true)
		})
	}, [cart, sizeID]);


	const handleSize = (val) => {
		/*	cartSizes.push(val);*/
		setSizeID(val);
		setDisableBtn(cartSizes.some(item => item === val))
	};

	const handleAddToCart = () => {
		// console.log('good', good);
		dispatch(addToCart(good));
		dispatch(countTotalCartSum());
		setDisableBtn(!disableBtn);
		const url = 'https://api.batova-brand.ru';
		// const url = 'http://192.168.1.156:4001';
		if (userId) postCart(url + '/v1/cart/piece/add', good);

		// setCookie('cart-products',cookieValue,
		// 	{
		// 		path: "/",
		// 		expires: setExpiresCookies(7)
		// 	})
	};

	let availableColor = '';
	switch (product.available) {
		case "Достаточно":
			availableColor = "#72ca88";
			break;
		case "Нет в наличии":
			availableColor = "#f61e06";
			break;
		default:
			availableColor = "#eccb40";
			break;
	}

	return (
		<div className={classes["product__info"]}>
			<h3 className={classes["product__info-title"]}>{product.title}</h3>
			<div className={classes["product__info-content"]}>
				<span className={classes["product__info-price"]}>{formatPrice(product.price)} р</span>
				<div className={classes["product__info-available"]}>
					<span style={{backgroundColor: availableColor}} className={classes["available__marker"]}/>
					<span className={classes["available__text"]}>{product.available}</span>
				</div>
			</div>
			<ColorSelector colors={product.colors} setColor={setColor} color={color}
										 className={classes["product__info-colors"]}/>
			<SizeSelector sizes={sizes} setSize={setSize} size={size} sizeID={sizeID}
										className={classes["product__info-sizes"]}
										setShowModal={setShowModal} handleSize={handleSize}/>
			<div className={classes["product__info-amount"]}>
				{/*<Stepper className={classes["mob-stepper"]} stepper={amount} setStepper={setAmount} item={product}/>*/}
				<Button className={classes["amount__btn"]} variant="contained" color="black" disableBtn={disableBtn}
								onClick={handleAddToCart}>{disableBtn ? 'Товар в корзине' : 'В корзину'}
				</Button>
			</div>
		</div>
	);
};

export default PCInfo;