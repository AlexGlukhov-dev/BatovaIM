import cn from "classnames";
import {filterProducts, sortedPriceAsc, sortedPriceDesc} from "../../redux/slices/productsSlice";
import {useDispatch} from "react-redux";

import classes from './sortPrice.module.scss';


const SortPrice = ({sort, setSort, width, category}) => {
    const dispatch = useDispatch();

    const ascHandler = () => {
        setSort(prev => !prev);
        dispatch(sortedPriceAsc());
        dispatch(filterProducts(category));
    };

    const descHandler = () => {
        setSort(prev => !prev);
        dispatch(sortedPriceDesc());
        dispatch(filterProducts(category));
    };

    const handler = sort ? descHandler : ascHandler;


    return (
        <button onClick={handler} className={cn(classes["sort-price"], "btn-reset")}>
            {
                width > 768 ?
                    <>
                        <span className={classes["sort-price__title"]}>Цена</span>
                        <span className={cn(classes["sort-price__icon"], sort && classes["sort-price__icon-reverse"])}>
                            <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="14.1426" y="1.56836" width="10" height="1" transform="rotate(135 14.1426 1.56836)"
                                      fill="black"/>
                                <rect x="0.707031" y="0.861328" width="10" height="1" transform="rotate(45 0.707031 0.861328)"
                                      fill="black"/>
                            </svg>
                        </span>
                    </>
                :
                    <div className={cn(classes["sort-price__mob-icon"], sort && classes["sort-price__mob-icon-asc"])}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.34998 2.25H14.6613L8.99434 9.3375L3.34998 2.25ZM0.239353 1.81125C2.52425 4.725 6.74338 10.125 6.74338 10.125V16.875C6.74338 17.4937 7.25239 18 7.87452 18H10.1368C10.7589 18 11.2679 17.4937 11.2679 16.875V10.125C11.2679 10.125 15.4758 4.725 17.7606 1.81125C18.3375 1.06875 17.8059 0 16.8671 0H1.13295C0.194107 0 -0.337527 1.06875 0.239353 1.81125Z"/>
                        </svg>
                    </div>
            }
        </button>
    );
};

export default SortPrice;