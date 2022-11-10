import SizeInput from "./SizeInput";
import cn from "classnames";

import classes from './sizeSelector.module.scss';

const SizeSelector = ({className, sizes, size, setSize, setShowModal, handleSize}) => {
    const isRadioSelected = value => value === size;

    return (
        <div className={className}>
            <span className={classes["sizes-title"]}>Размер:</span>
            <div className={classes["sizes-group"]}>
                {sizes.map(input => <SizeInput handleSize={handleSize} key={input.id} name="size-input" id={input.id} value={input.value} sizeID={input.id} setSelectedValue={setSize} isRadioSelected={isRadioSelected}/>)}
                <button className={cn(classes["sizes-group__btn"], "btn-reset")} onClick={() => setShowModal()}>таблица размеров</button>
            </div>
        </div>
    );
};

export default SizeSelector;