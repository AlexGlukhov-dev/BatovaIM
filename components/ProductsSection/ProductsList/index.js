import classes from './productsList.module.scss';
import ProductsItem from "./ProductsItem";
import cn from "classnames";

const Index = ({productsData, className}) => {

    return (
        <div className={cn(classes["products-list"], className)}>
            {productsData.map(item => {

                return  <ProductsItem
                  key={item.id}
                  id={item.id}
                  src={item.src}
                  title={item.title}
                  text={item.text}
                  price={item.price}
                  color={item.colors[0].color}
                />
            }

            )}
        </div>
    );
};

export default Index;