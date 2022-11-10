import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import CartNav from '../../components/CartNav';
import SectionTitle from '../../components/SectionTitle';
import CartItems from '../../components/CartItems';
import DeliveryAndPay from '../../components/DeliveryAndPay';

import classes from './cart.module.scss';
import {fetchCartData} from "../../redux/slices/cartSlice";

const Cart = () => {

	const dispatch = useDispatch();
	const {userID, accessToken: token} = useSelector(state => state.auth.auth);

	useEffect(() => {
		if (userID) {
			dispatch(fetchCartData([userID, token]));
		}
	}, []);


	const [cartNav, setCartNav] = useState('cart');
	const cart = useSelector(state => state.cart.cart);
	// const token = useSelector(state => state.auth.auth.accessToken);

	return (<>
		<div className={classes["cart-container"]}>
			<SectionTitle className={classes["title"]}>Корзина</SectionTitle>
			<CartNav nav={cartNav} setNav={setCartNav}/>
			<AnimatePresence exitBeforeEnter>
			{cartNav === 'cart' &&  <motion.span
				key="auth"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}>
				<CartItems cart={cart} setCartNav={setCartNav}/>
			</motion.span>}
			{cartNav === 'delivery' && <motion.span
				key="reg"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}>
				<DeliveryAndPay isAuth={token}/>
			</motion.span>}
			</AnimatePresence>
		</div>
		</>
	);
};

export default Cart;