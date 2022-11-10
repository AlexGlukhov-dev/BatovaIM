import {useState} from 'react';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';

import {countTotalCartSum} from '../../redux/slices/cartSlice';
import {formatPrice, wordDecl} from "../../utils";

import OrderDetails from '../OrderDetails/index';
import Button from '../../UI/Button';
import Modal from "../../UI/Modal";
import Registration from '../Regitration';
import {AuthModal} from '../../UI/AuthModal';

import classes from './cartItems.module.scss';
import axios from "axios";

const CartItems = ({cart, setCartNav}) => {
	const [auth, setAuth] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();
	const totalCartSum = useSelector(state => state.cart.totalCartSum);
	const totalAmount = useSelector(state => state.cart.totalAmount);
	const token = useSelector(state => state.auth.auth.accessToken);
	const userId = useSelector(state => state.auth.auth.userID);

	const cartCheckout = async (userId) => {
		await axios.post(`https://api.batova-brand.ru/v1/cart/checkout/${userId}`)
	};

	const proceedOrder = () => {
		// if (!token) {
		// 	setShowModal(true);
		// 	return
		// }
		dispatch(countTotalCartSum());
		// cartCheckout(userId);
		setCartNav('delivery')
	};

	return (
		<div className={classes["cart-container"]}>
			{cart.length ?
				cart.map(item => <OrderDetails key={item._uid} order={item} cart/>) :
				<div>В корзине пока ничего нет!</div>
			}
			{cart.length ? <div className={classes["cart-footer"]}>
				<div className={classes["cart-total"]}>
					<span>Итого:</span>
					<span>{`${totalAmount} ${wordDecl(totalAmount)}`}</span>
					<span className={classes["cart-sum"]}>{`${formatPrice(totalCartSum)} p`}</span>
				</div>
				<div className={classes["cart-actions"]}>
					<Link href='/shop'><a className={classes["cart-backLink"]}>Вернуться в магазин</a></Link>
					<Button
						variant="contained"
						color="black"
						className={classes["cart-submitBtn"]}
						onClick={proceedOrder}>Оформить
					</Button>
				</div>
			</div> : null}
			{/*<AuthModal setAuth={setAuth} setShowModal={setShowModal} showModal={showModal} />*/}
			{/*<Modal active={auth} setActive={setAuth} className={classes["registration-modal"]}>*/}
			{/*	<Registration closeModal={setAuth} />*/}
			{/*</Modal>*/}
		</div>
	)
};

export default CartItems;