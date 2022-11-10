import cn from "classnames";
import Image from "next/image";


import Button from "../../../../UI/Button";

import classes from './productsItem.module.scss';
import Link from "next/link";

const  ProductsItem = ({id, title, price, text, src, color}) => {

    return (
        <div className={cn(classes["products-item"])}>
            <div className={classes["products-item__info"]}>
                <h3 className={classes["info__title"]}>{title}</h3>
                <div className={classes["info__text"]}>
                    {text}
                </div>
                <div className={classes["info__bottom"]}>
                    <div className={classes["info__bottom-price"]}>{price}&nbsp;р</div>
                  <Link href={`shop/${id}`}>
                    <a>
                      <Button className={classes["info__bottom-btn"]} variant="contained" color="black">Подробнее</Button>
                    </a>
                  </Link>
                </div>
            </div>
            <div className={classes["products-item__img"]}>
                <div className={classes["products-item__img-image"]}>
                    <Image priority layout="fill" src={src} alt="product-img"/>
                </div>
                <span className={classes["products-item__img-border"]}></span>
            </div>
        </div>
    );
};

export default ProductsItem;