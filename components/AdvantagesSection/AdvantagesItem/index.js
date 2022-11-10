import Image from "next/image";
import classes from './advantagesItem.module.scss';

const AdvantagesItem = ({src, text}) => {
    return (
        <div className={classes["advantages__item"]}>
            <Image src={src} alt="advantages-item"/>
            <div className={classes["advantages__item-text"]}>{text}</div>
        </div>
    );
};

export default AdvantagesItem;