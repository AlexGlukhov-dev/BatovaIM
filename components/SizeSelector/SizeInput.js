import React, {useRef} from 'react';
import cn from "classnames";
import classes from "./sizeSelector.module.scss";

const SizeInput = ({value, id, name, isRadioSelected, setSelectedValue, sizeID, handleSize}) => {
    const ref = useRef(null);
    const clickHandler = () => {
      handleSize(sizeID);
      setSelectedValue(ref.current.value)
    };
    return (
        <div className={cn(classes["size-input"], isRadioSelected(value) && classes["active"])} >
            <input className={classes["size-input__item"]} id={id} type="radio" name={name} ref={ref} value={value}/>
            <label className={classes["size-input__label"]} htmlFor={id} onClick={clickHandler}>{value}</label>
        </div>
    );
};

export default SizeInput;