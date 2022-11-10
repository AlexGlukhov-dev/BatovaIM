import moment from "moment";
import Rating from "../../Rating";
import classes from './testimonialsItem.module.scss';

const TestimonialsItem = ({item}) => {

    return (
        <div className={classes["testimonials__item"]}>
            <div className={classes["testimonials__item-top"]}>
                <Rating rating={item.rating} />
            </div>
            <div className={classes["testimonials__item-text"]}>
                {item.text}
            </div>
            <div className={classes["testimonials__item-bot"]}>
                {item.author}
                <span>, {/*{moment(item.data).format("MM.DD.YYYY")}*/} {item.date}</span>
            </div>
        </div>
    );
};

export default TestimonialsItem;