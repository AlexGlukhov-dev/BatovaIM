import cn from "classnames";
import classes from './filterProducts.module.scss';

const FPItem = ({setActive, className, title, onClick}) => {

    const activeHandler = () => {
        onClick(title);
        setActive(title);
    };

    return (
        <button
            id={title}
            onClick={activeHandler} className={cn(classes["filter-products__item"], "btn-reset", className)}
        >
            {title}
        </button>
    );
};

export default FPItem;