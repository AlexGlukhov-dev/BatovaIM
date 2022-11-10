import {useState} from "react";
import cn from "classnames";

import Burger from "../../UI/Burger";
import Navigation from "../Navigation/Navigation";

import classes from "./burgerNav.module.scss";
import { showLoader } from '../../redux/slices/loaderSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const BurgerNav = ({links}) => {
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const closeNav = e => {
        e.stopPropagation();
        setActive(false);
        if (router.pathname === '/shop' || router.pathname === '/sale') return;
        dispatch(showLoader());
        document.body.style.overflow = 'hidden';
    };

    return (
        <div className={classes["burger-nav"]}>
            <Burger setActive={setActive} active={active}/>
                <div className={classes["burger-nav__wrapper"]}>
                    <div className={cn(classes["wrapper-overlay"], classes[active && "wrapper-overlay-anim"])} onClick={closeNav}/>
                    <div className={cn(classes["wrapper-nav"], classes[active && "wrapper-nav-anim"])}>
                        <Navigation direction={"column"} links={links} closeNav={closeNav}/>
                    </div>
                </div>
        </div>
    );
};

export default BurgerNav;