import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import {createState} from '../../redux/slices/productsSlice';

import useSize from '../../hooks/useSize';
import { useLoader } from '../../hooks/useLoader';

import ProductPrev from '../../components/ProductPrev';
import SectionTitle from '../../components/SectionTitle';
import TopDecor from '../../components/TopDecor';
import {MetaHead} from '../../components/MetaHead';

import classes from './sale.module.scss'

const Sale = ({productData}) => {
    const [target, currentSize] = useSize();
    const dispatch = useDispatch();
    const {saleGoodsData} = useSelector(state => state.data);
    const { width } = currentSize;

    useLoader();

    useEffect(() => {
        if(!productData.length < 1)
        dispatch(createState(productData));
    }, [productData, dispatch]);

    return (<>
          <MetaHead
            title='Распродажа детской одежды бренда "Batova"'
            description='акции, распродажа моделей детской одежды в интернет-магазине бренда "Батова"'
              />
        <main className={classes["sale"]} ref={target}>
            <div className={classes["sale-wrapper"]}>
                <div className={classes["sale-wrapper__top"]}>
                    <TopDecor className={classes["sale-decor"]}/>
                    <SectionTitle>Sale</SectionTitle>
                </div>
                <div className={classes["sale-list"]}>
                    {
                        saleGoodsData.map(prod => prod.sale && <ProductPrev key={prod.id} prod={prod} width={width}/>)
                    }
                </div>
            </div>
        </main>
        </>
    );
};

export async function getServerSideProps() {
    const responseProducts = await axios(`https://api.batova-brand.ru/v1/products`);
    const productsData = await responseProducts.data;

    return { props: { productData: productsData } }
}
export default Sale;