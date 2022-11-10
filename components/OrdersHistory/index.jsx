import OrderHistoryItem from './OrderHistoryItem';
import  {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import classes from './ordersHistory.module.scss';
import { fetchOrdersHistory } from '../../redux/slices/personalCabinetSlice';

const OrdersHistory = () => {
    const dispatch = useDispatch();
    const {userID} = useSelector(state => state.auth.auth);
    const orders = useSelector(state => state.personalData.personalCabinetData[0].ordersHistory) || [];

    useEffect(() => {
        if (userID) {
            dispatch(fetchOrdersHistory(userID));
        }
    }, [dispatch, userID]);

return (
    <div className={classes["wrapper"]}>
			{orders.map(order => <OrderHistoryItem key={order._id} order={order}/>)}
    </div>
    )
};

export default OrdersHistory;