import {useState} from "react";
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/slices/authSlice";
import {logoutUser} from "../../redux/slices/personalDataSlice";
import {removeAllFromFavorites, removeOrdersHistory} from "../../redux/slices/personalCabinetSlice";
import {clearCart} from "../../redux/slices/cartSlice";

import cn from "classnames";
import FPItem from "./FPItem";

import classes from "./filterProducts.module.scss";
import {removeLikes} from "../../redux/slices/productsSlice";



const FilterProducts = ({onClick, data}) => {
    const [active, setActive] = useState("История заказов");
    const [cookies, setCookie, removeCookie] = useCookies(['PAC_token']);
    const router = useRouter();
    const dispatch = useDispatch();

    const handelExit = () => {
        removeCookie("PAC_token");
        router.push('/');
        dispatch(logout());
        dispatch(logoutUser());
        dispatch(removeAllFromFavorites());
        dispatch(removeLikes());
        dispatch(clearCart());
        dispatch(removeOrdersHistory());
    };

    return (
        <div className={classes["filter-products"]}>
            <div className={classes["filter-products-titles"]}>
                {data.map(title => <FPItem key={title} className={active === title && classes["active"]} setActive={setActive} onClick={onClick} title={title} />)}
            </div>
            <button className={cn(classes["personal-page__exit"], router.pathname !== '/personal' && classes["display-none"], "btn-reset")} onClick={handelExit}>Выход</button>
        </div>
    );
};

export default FilterProducts;