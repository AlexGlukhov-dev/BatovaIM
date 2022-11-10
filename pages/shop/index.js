import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createState, filterProducts, setCategories} from '../../redux/slices/productsSlice';
import axios from 'axios';
import useSize from '../../hooks/useSize';
import { useLoader } from '../../hooks/useLoader';

import ProductPrev from '../../components/ProductPrev';
import FilterProducts from '../../components/FilterProducts';
import SectionTitle from '../../components/SectionTitle';
import SortPrice from '../../UI/SortPrice';
import TopDecor from '../../components/TopDecor';
import {MetaHead} from '../../components/MetaHead';

import classes from './shop.module.scss'

const Shop = ({data, categories}) => {
	const [target, currentSize] = useSize();
	const [category, setCategory] = useState();
	const [sort, setSort] = useState(false);
	const dispatch = useDispatch();
	const {categoriesData, saleGoodsData, filteredData} = useSelector(state => state.data);

	const filterProductsHandler = title => {
		dispatch(filterProducts(title));
		setCategory(title)
	};

	const {width} = currentSize;

	useLoader();

	useEffect(() => {

		if (data.length) {
			dispatch(createState(data))
		}
			dispatch(setCategories(categories))
	}, [dispatch, data.length, saleGoodsData.length, categories]);

	return (<>
			<MetaHead
				title="Интернет-магазин Batova-brand.ru"
				description="Каталог товаров интернет-магазина дестской одежды Batova-brand.ru"/>
			<main className={classes["shop"]} ref={target}>
				<div className={classes["shop-wrapper"]}>
					<TopDecor className={classes["shop-decor"]}/>
					<SectionTitle>Магазин</SectionTitle>
					<FilterProducts data={categoriesData} onClick={filterProductsHandler}/>
					<SortPrice category={category} width={width} sort={sort} setSort={setSort}/>
					<div className={classes["shop-list"]}>
						{filteredData.length < 1 ?
							saleGoodsData.map(prod => <ProductPrev key={prod.id} prod={prod} width={width}/>)
							:
							filteredData.map(prod => <ProductPrev key={prod.id} prod={prod} width={width}/>)
						}
					</div>
				</div>
			</main>
		</>
	);
};

export async function getServerSideProps(ctx) {
	const data = ctx.req.cookies["PAC_token"] || '';

	const responseProducts = await axios(`https://api.batova-brand.ru/v1/products/?data=${data}`);
	const productsData = await responseProducts.data;
	const responseCategories = await axios(`https://api.batova-brand.ru/v1/categories`);
	const categoriesData = await responseCategories.data;

	return {props: {data: productsData, categories: categoriesData}}
}

export default Shop;