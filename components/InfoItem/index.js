import Image from "next/image";
import cn from "classnames";
import BlockTitle from "../BlockTitle";

import classes from './infoItem.module.scss';

const InfoItem = ({title, text, reverse, className, srcImage}) => {
    return (
        <div className={cn(classes["item"], reverse && classes["item-reverse"], className)}>
            <div className={classes["item__image"]}>
                <div className={classes["round"]}></div>
                  <div className={classes["round-image"]}>
                    <Image layout="fill" src={srcImage} priority alt="image" />
                  </div>

            </div>
            <div className={classes["item__info"]}>
                <BlockTitle className={classes["item__info-title"]}>{title}</BlockTitle>
                <div className={classes["item__info-text"]}>{text}</div>
            </div>
        </div>
    );
};

export default InfoItem;