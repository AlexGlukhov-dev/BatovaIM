import cn from "classnames";

import mainDecor from '../../public/img/main-decor.svg';
import classes from './mainDecor.module.scss';
import Image from "next/image";

const  MainDecor = ({className}) => {
    return (
        <div className={cn(className, classes["main-decor-wrapper"])}>
            <div className={classes["main-decor_item"]}>
                <Image src={mainDecor} priority alt="main-decor"/>
            </div>
        </div>
    );
};

export default MainDecor;