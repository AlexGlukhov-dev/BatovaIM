import {useSelector} from "react-redux";

import {wordDecl} from "../../../utils";

import classes from './orderHistorySum.module.scss';

const OrderHistorySum = ({amount, sum}) => {
	const totalAmount = useSelector(state => state.cart.totalAmount);

return (
    <div className={classes["wrapper"]}>
			<div className={classes["info"]}>
				<span className={classes["info__title"]}>Итого:</span>
				<span className={classes["info__amount"]}>{`${amount || totalAmount} ${wordDecl(totalAmount)}`}</span>
				<span className={classes["info__sum"]}>{`${sum} р`}</span>
			</div>

    </div>
    )
};

export default OrderHistorySum;