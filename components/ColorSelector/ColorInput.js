import React, {useRef} from 'react';
import cn from "classnames";
import classes from "./colorSelector.module.scss";

const ColorInput = ({color, name, value, id, isRadioSelected, setSelectedValue}) => {
    const ref = useRef(null);

    return (
        <div className={cn(classes["color-input"], isRadioSelected(value) && classes["active"])} >
            <input className={classes["color-input__item"]} id={id} type="radio" name={name} ref={ref} value={value}/>
            <label className={cn(classes["color-input__label"], value === "white" && classes["color-white"])} style={{backgroundColor: color}} htmlFor={id}  onClick={() => setSelectedValue(ref.current.value)}/>
        </div>
    );
};

export default ColorInput;