import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';
import Image from 'next/image';

import {countTotalCartSum, removeFromCart} from '../../redux/slices/cartSlice';

import Stepper from '../../UI/Stepper';
import Button from '../../UI/Button';

import {formatPrice} from "../../utils";
import classes from './ordersHistoryDetails.module.scss';
import axios from "axios";

const OrderDetails = ({order, cart = true, className}) => {
	const [amount, setAmount] = useState(order.amount);
	const dispatch = useDispatch();
	const userId = useSelector(state => state.auth.auth.userID);

	const deleteProductOnServer = async (order) => {
		const url = 'https://api.batova-brand.ru/v1/cart/item/remove';
		try {
			const response = await axios.post(url,
				order
			);
			// console.log(order)
			return await response.data

		} catch (err) {
			console.log(err)
		}
	};

	const handleDeleteFromCart = (order) => {
		dispatch(removeFromCart(order._uid));
		dispatch(countTotalCartSum());
		if (userId) {
			const {_uid} = order;
			deleteProductOnServer({_uid, userId})
		}
	};
	return (
		<div className={classes["wrapper"]}>
			<div className={classes["order__image"]}>
				<Image width={110} height={138} layout='responsive' priority src={order.src.src} alt="product image"/>
			</div>
			<div className={cn(classes["order__info"], !cart && classes["grow"])}>
				<div className={classes["order__title"]}>{order.title}</div>
				<div className={classes["order__params"]}>
					<span className={classes["order__color"]} style={{backgroundColor: order.colors}}/>
					<span className={classes["order__size"]}>{`Размер: ${order.size}`}</span>
				</div>
			</div>
			{cart && <Stepper className={classes["order__stepper"]} stepper={amount} setStepper={setAmount} item={order}/>}
			<div className={cn(classes["order__control"], !cart && classes["align-right"])}>
				<div className={classes["order__price"]}>
					<div className={classes["order__total"]}>{`${formatPrice(+amount * +order.price)} p`}</div>
					<div className={classes["order__amount"]}>{`${amount} шт х ${formatPrice(order.price)} р`}</div>
				</div>
				{cart && <Button variant="icon" className={classes["delete-btn"]} onClick={() => handleDeleteFromCart(order)}>
		 				<span>
		 					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		 					<rect x="1.41406" width="26" height="2" transform="rotate(45 1.41406 0)" fill="black"/>
		 					<rect y="18.3867" width="26" height="2" transform="rotate(-45 0 18.3867)" fill="black"/>
		 					</svg>
		 				</span>
				</Button>
				}
			</div>
		</div>
	)
};

export default OrderDetails;