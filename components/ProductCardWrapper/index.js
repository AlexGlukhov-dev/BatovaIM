import ProductCard from '../../components/ProductCard';
import AdviceSection from '../../components/AdviceSection';

import classes from './productCardWrapper.module.scss';

const ProductCardWrapper = ({card, width}) => {

    return (
        <div className={classes["wrapper"]}>
            <ProductCard card={card}/>)
            <AdviceSection width={width}/>
        </div>
    );
};

export default ProductCardWrapper;