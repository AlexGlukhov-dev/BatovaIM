import cn from "classnames";

import classes from "./ratingStar.module.scss"

const RatingStar = ({filled}) => {

    return (
        <div className={cn(classes["star-item"], filled && classes["star-blank"])}>
            <svg width="26" height="24" viewBox="0 0 26 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 0L15.9187 8.98278H25.3637L17.7225 14.5344L20.6412 23.5172L13 17.9656L5.35879 23.5172L8.27747 14.5344L0.636266 8.98278H10.0813L13 0Z"/>
            </svg>
        </div>
    );
};

export default RatingStar;

