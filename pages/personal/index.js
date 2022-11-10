import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useCookies} from 'react-cookie';
import axios from "axios";

import {filterProducts} from '../../redux/slices/productsSlice';
import {fetchCartData} from '../../redux/slices/cartSlice';
import {fetchPersonalData} from '../../redux/slices/personalDataSlice';
import {fetchFavoritesFromServer} from '../../redux/slices/personalCabinetSlice';

import useSize from '../../hooks/useSize';

import PersonalData from '../../components/PersonalCabinet/PersonalData';
import FilterProducts from '../../components/FilterProducts';
import SectionTitle from '../../components/SectionTitle';
import FavoritesSection from '../../components/FavoritesSection';
import OrdersHistory from '../../components/OrdersHistory';
import {MetaHead} from '../../components/MetaHead';

import classes from './personalCabinet.module.scss';

const Index = () => {
	const dispatch = useDispatch();
	const [cookies] = useCookies();
	const {userID} = useSelector(state => state.auth.auth);
	const {personalCabinetData} = useSelector(state => state.personalData);
	const favorites = useSelector(state => state.personalData.personalCabinetData[1].favoritesData);
	const [nav, setNav] = useState("История заказов");
	const [target, currentSize] = useSize();
	const {width} = currentSize;
	const firstEl = personalCabinetData[0].title;
	const titles = personalCabinetData.map(data => data.title);
	const token = cookies["PAC_token"];

	const sendFavoritesToServer = favs => {
		const favIds = favs.map(fav => fav.id);

		const data = {userId: userID, liked: favIds};

		const url = 'https://api.batova-brand.ru/v1/user/login/favs';
		try {
		    axios.post(url, data);

		} catch(err) {
		    console.error(err)
		}
	};

	useEffect(() => {
		if (userID) {
			dispatch(fetchPersonalData([userID, token]));
			dispatch(fetchCartData([userID, token]));

			if (favorites.length) {
				sendFavoritesToServer(favorites);
			}
		}
	}, []);

	const filterDataHandler = title => {
		setNav(title);
		dispatch(filterProducts(title));

		if (title === 'Избранное' && userID) {
			dispatch(fetchFavoritesFromServer(userID));
		}
	};

	return (<>
			<MetaHead
				title='Личный кабинет интернет-магазина "Batova-brand.ru"'
				description='личный кабинет, история заказов, информация об избранных товарах в ИМ бренда "Батова"'
			/>
			<div className={classes["personal-cabinet"]} ref={target}>
				<div className={classes["personal-cabinet__head"]}>
					<div className={classes["personal-cabinet__head-wrapper"]}>
						<SectionTitle>Личный кабинет</SectionTitle>
						<FilterProducts data={titles} nav={nav} setNav={setNav} firstEl={firstEl} onClick={filterDataHandler}/>
					</div>
				</div>
				<div className={"site-container"}>
					{nav === "История заказов" && <OrdersHistory />}
					{nav === "Избранное" && <FavoritesSection width={width}/>}
					{nav === "Личные данные" && <PersonalData/>}
				</div>
			</div>
		</>
	);
};

export default Index;