import classes from './adviceSection.module.scss';
import AdviceSlider from "./AdviceSlider";

const AdviceSection = ({width}) => {
    return (
        <section className={classes["advice"]}>
            <div className={classes["advice-wrapper"]}>
                <div className={classes["advice__separator"]}></div>
                <h3 className={classes["advice__title"]}>Вам может понравиться</h3>
            </div>
            <div className={classes["advice__slider"]}>
                <AdviceSlider width={width}/>
            </div>
        </section>
    );
};

export default AdviceSection;