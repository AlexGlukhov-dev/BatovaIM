import classes from './colorTab.module.scss';
import cn from "classnames";

const ColorTab = ({color}) => {
    return (
        <div className={classes["tab"]}>
            <div className={cn(classes["tab__content"], color && classes["tab__color"])}/>
        </div>
    );
};

export default ColorTab;