import {useSelector} from "react-redux";
import cn from "classnames";

import ProductPrev from "../ProductPrev";

import classes from './favoritesSection.module.scss';


const FavoritesSection = ({width}) => {
    const favoritesData = useSelector(state => state.personalData.personalCabinetData[1].favoritesData);


    return (
        <div className={cn(classes["favorites"], "site-container")}>
            {favoritesData.map(prod => <ProductPrev key={prod.id} width={width} prod={prod}/>)}
        </div>
    );
};

export default FavoritesSection;