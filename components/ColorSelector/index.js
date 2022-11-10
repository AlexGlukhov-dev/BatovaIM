import ColorInput from "./ColorInput";

import classes from './colorSelector.module.scss';

const ColorSelector = ({className, colors, setColor, color }) => {

    const isRadioSelected = value => value === color;
    // const productColor = "teal";
    return (
        <div className={className}>
            <span className={classes["colors-title"]}>Цвет:</span>
            <div className={classes["color-group"]}>
                {colors.map(input => <ColorInput key={input.color} color={input.color} value={input.value} setSelectedValue={setColor} isRadioSelected={isRadioSelected}/>)}
              {/*<span className={classes["color-input"]} style={{backgroundColor:colors[0]}}></span>*/}
            </div>
        </div>
    );
};

export default ColorSelector;