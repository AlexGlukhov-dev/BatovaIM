import cn from "classnames";

import flower from "../../public/img/flower.svg"
import classes from './flowerDecor.module.scss';
import Image from "next/image";

const FlowerDecor = ({className}) => {
    return (
        <div className={cn(className, classes["flower-decor"])}>
            <div className={classes["flower-decor__item"]}>
                <Image src={flower} alt="flower" />
            </div>

        </div>
    );
};

export default FlowerDecor;