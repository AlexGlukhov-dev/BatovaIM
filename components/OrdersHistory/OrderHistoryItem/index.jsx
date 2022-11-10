import {useState} from 'react';
import cn from 'classnames';

import OrderDetails from '../../OrderDetails';
import OrderHistorySum from '../OrderHistorySum';

import classes from './orderHistoryItem.module.scss';
import Collapsible from "../../../UI/animation/Collapsible";
import {formatPrice} from "../../../utils";

const OrderHistoryItem = ({order}) => {
	const [open, setOpen] = useState(false);

	const handlerOpen = () => {
		setOpen(!open)
	};

	return (
		<div className={classes["order"]}>
		<div className={classes["wrapper"]}>
			<div className={classes["order-info"]}>
				<div className={classes["order-info__item"]}>
					<span className={classes["order-info__title"]}>Номер заказа:</span>
					<span className={classes["order-info__value"]}>{order._id}</span>
				</div>
				<div className={classes["order-info__item"]}>
					<span className={classes["order-info__title"]}>Дата:</span>
					<span className={classes["order-info__value"]}>{order.date}</span>
				</div>
				<div className={classes["order-info__item"]}>
					<span className={classes["order-info__title"]}>Статус:</span>
					<span className={classes["order-info__value"]}>{order.status}</span>
				</div>
				<div className={classes["order-info__item"]}>
					<span className={classes["order-info__title"]}>Сумма:</span>
					<span className={classes["order-info__value"]}>{formatPrice(order.totalSum)} p</span>
				</div>
			</div>
			<button
				className={cn("btn-reset", classes["detail-btn"])}
				onClick={handlerOpen}>
				<span>Развернуть</span>
				{!open && <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="14.5449" y="0.726562" width="10.2851" height="1.02851" transform="rotate(135 14.5449 0.726562)"
								fill="black"/>
					<rect x="0.726562" width="10.2851" height="1.02851" transform="rotate(45 0.726562 0)" fill="black"/>
				</svg>
				}
				{open && <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect y="7.27344" width="10.2851" height="1.02851" transform="rotate(-45 0 7.27344)" fill="black"/>
					<rect x="13.8184" y="8" width="10.2851" height="1.02851" transform="rotate(-135 13.8184 8)" fill="black"/>
				</svg>
				}
			</button>
		</div>
			<Collapsible isVisible={open}>
			{order.order.map(item => <OrderDetails key={item._id} order={item} cart={false}/>)}
			<OrderHistorySum amount={order.order.length} sum={formatPrice(order.totalSum)} />
			</Collapsible>
		</div>
	)
};

export default OrderHistoryItem;