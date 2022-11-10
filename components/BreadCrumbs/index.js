import classes from "./breadCrumbs.module.scss";
import Crumb from "./Crumb";
import cn from "classnames";
import {useRouter} from "next/router";
import useSize from "../../hooks/useSize";
import Button from "../../UI/Button";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const BreadCrumbs = () => {
    const breadCrumbsData = [
        {id: 1, src: "/", page: "главная"},
        {id: 2, src: "/shop", page: "Магазин"},
        {id: 3, src: "/sale", page: "Sale"},
        {id: 4, src: "/lookBook", page: "Лукбук"},
        {id: 5, src: "/about", page: "О бренде"},
        {id: 6, src: "/info", page: "Информация"},
        {id: 7, src: "/contacts", page: "Контакты"},
        {id: 8, src: "/personal", page: "Личный кабинет"},
        {id: 9, src: "/cart", page: "Корзина"}
    ];
    const router = useRouter();
    const goBack = router.back;
    const[target, windowSize] = useSize();
    const {width} = windowSize;
    const productPages = useSelector(state => state.data.saleGoodsData);

    let currentPage = router.asPath;
    let currentCrumbs = breadCrumbsData.filter(page => currentPage === page.src);
    let productCrumbs = productPages.filter(prod => currentPage.replace(/[^\d.-]/g, '') - 1 === prod.id);
    currentCrumbs = [breadCrumbsData[0], ...currentCrumbs];

    return (
        <div className={cn(classes["crumbs-wrapper"], currentPage === "/" && classes["crumbs-off"], currentPage === "/personalCabinet" && classes["personal-cabinet-color"], currentPage === "/about" && classes["about-color"])} ref={target}>
            <div className={classes["crumbs-container"]}>
            {
                width > 768
                ?
                <div className={classes["crumbs"]}>
                    {currentCrumbs.map(crumb => <Crumb key={crumb.id + crumb.page} src={crumb.src} page={crumb.page} currentPage={currentPage}/>)}
                </div>
                :
                <Button className={cn(classes["back-btn"], currentPage === "/about" && classes["back-btn-color"])} variant="outlined" color="black" direction="horizontal-left" onClick={goBack}>
                    <span>Назад</span>
                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="7.07031" y="14.1406" width="10" height="1" transform="rotate(-135 7.07031 14.1406)"/>
                        <rect x="7.77734" y="0.707031" width="10" height="1" transform="rotate(135 7.77734 0.707031)"/>
                    </svg>
                </Button>
            }
            </div>
        </div>

    );
};

export default BreadCrumbs;