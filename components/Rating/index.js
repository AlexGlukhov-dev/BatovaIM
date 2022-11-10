import RatingStar from "./RatingStar";

import classes from './rating.module.scss'

const Rating = ({rating}) => {

    //const stars = new Array(rating).fill("")
    const starsData = [1, 2, 3, 4, 5]

    return (
        <div className={classes["rating-container"]}>
            {starsData.map((star, i) => (
                <RatingStar
                    key={i}
                    filled={i + 1 <= rating}
                />
            ))}
        </div>
    );
};

export default Rating;