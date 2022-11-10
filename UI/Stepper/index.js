import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';

import {addAmount, countTotalCartSum, onChangeAmount, subAmount} from '../../redux/slices/cartSlice';

import classes from './stepper.module.scss';
import {postCart} from "../../components/ProductCard/PCInfo";


const Stepper = ({className, stepper, setStepper, item}) => {
	const dispatch = useDispatch();
	const userId = useSelector(state => state.auth.auth.userID) || '';

	const incrHandle = () => {
		setStepper(stepper + 1);
		dispatch(addAmount(item));
		dispatch(countTotalCartSum());
		const url = 'https://api.batova-brand.ru/v1/cart/piece/add';
		postCart(url, {...item, amount: item.amount + 1, userId })
		// console.log({...item, amount: item.amount + 1, userId })
	};

	const decrHandle = () => {
		setStepper(stepper - 1);
		dispatch(subAmount(item));
		dispatch(countTotalCartSum());
		const url = 'https://api.batova-brand.ru/v1/cart/piece/remove';
		postCart(url, {...item, amount: item.amount - 1, userId})
		// console.log({...item, amount: item.amount - 1, userId })
	};

	const StepperHandler = e => {
		if (isNaN(+e.target.value) || +e.target.value < 1) {
			setStepper(1);
			dispatch(onChangeAmount({item, val: 1}));
			dispatch(countTotalCartSum());
		} else {
			setStepper(+e.target.value);
			dispatch(onChangeAmount({item, val: +e.target.value}));
			dispatch(countTotalCartSum());
			const url = 'https://api.batova-brand.ru/v1/cart/piece/add';
			// postCart(url, {...item, amount: item.amount + +e.target.value, userId })
			// console.log({...item, amount: item.amount + +e.target.value, userId })
		}
	};

	return (
		<div className={cn(classes["stepper"], className)}>
			<button className={cn(classes["stepper__btn"], stepper <= 1 && classes["disabled"], "btn-reset")}
							disabled={stepper <= 1} onClick={decrHandle}>
				<svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="16" height="2" fill="black"/>
				</svg>
			</button>
			<div className={classes["stepper__amount"]}>
				<input type="text" className={classes["stepper-input"]} value={stepper} onChange={StepperHandler} disabled />
			</div>
			<button className={cn(classes["stepper__btn"], "btn-reset")} onClick={incrHandle}>
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="10" y="1" width="16" height="2" transform="rotate(90 10 1)" fill="black"/>
					<rect x="1" y="8" width="16" height="2" fill="black"/>
				</svg>
			</button>
		</div>
	);
};

export default Stepper;