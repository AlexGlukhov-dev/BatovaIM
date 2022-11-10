import classes from './button.module.scss';
import cn from "classnames";

/**
 * The Button component accepts the following props:
 *          variant: ["contained", "outlined", "icon"],
 *          direction: ["horizontal-left", "horizontal-right"],
 *          color: ["black", "light"]
 * */
const Button = ({children, onClick, variant, className, disableBtn, ...props}) => {
    const Tag =  props.href ? "a" : "button";
    return (
        <Tag
            className={cn( classes["btn"], className, classes[variant], props.direction && classes[props.direction], props.color && classes[props.color])}
            disabled={disableBtn}
            onClick={onClick}
            {...props}
        > {children} </Tag>
    );
};


export default Button;