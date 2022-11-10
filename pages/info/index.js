import cn from "classnames";
import SectionTitle from "../../components/SectionTitle";
import InfoItem from "../../components/InfoItem";
import srcImage1 from "../../public/img/slide-1.jpg"
import srcImage2 from "../../public/img/slide-2.jpg"

import classes from './info.module.scss';
import {MetaHead} from "../../components/MetaHead";
import { useLoader } from '../../hooks/useLoader';

const Info = () => {
	useLoader();

	return (<>
	<MetaHead
		title='Информация интернет-магазина бренда "Батова"'
		description='условия оплаты, условия доставки, обмен и возврат товаров интернет-магазина "Batova-brand.ru"'
	/>
		<main className={cn(classes["info"], "site-container")}>
			<div className={classes["info__top"]}>
				<SectionTitle className={classes["info__top-title"]}>Оплата</SectionTitle>
				<p className={classes["info__top-text"]}>Для выбора оплаты товара с помощью банковской карты на соответствующей странице необходимо нажать кнопку Онлайн оплата картой.
					Оплата происходит через АО «ТИНЬКОФФ БАНК» с использованием банковских карт следующих платёжных систем:	</p>
					<ul style={{listStyle: "inside", listStyleType: "disc", marginBottom: "26px"}}>
						<li>- МИР</li>
						<li>- VISA</li>
						<li>- Mastercard</li>
					</ul>

				<ul className={classes["info__top-payment"]}>
					<li className={classes["payment-item"]}>Visa</li>
					<li className={classes["payment-item"]}>Mastercard</li>
					<li className={classes["payment-item"]}>Мир</li>
				</ul>
			</div>

			<InfoItem
				srcImage={srcImage2}
				title="Возврат/Обмен"
				text={<>
					<p>Возврат изделий возможен при наличии брака. Срок возврата товара ненадлежащего качества составляет 30 дней с момента получения товара.
						Возврат переведённых средств производится на ваш банковский счёт в течение 5-30 рабочих дней (срок зависит от банка, который выдал вашу банковскую карту).
						Обмен изделия на изделие другого размера возможен при сохранении его товарного вида и бирок. Для оформления заявки на обмен необходимо связаться с нами в течении 2-х суток с момента получения заказа.</p>
				</>
				} reverse/>
			<InfoItem
				srcImage={srcImage1}
				title="Доставка"
				text={<>
					<p>Для доставки ваших заказов по территории России и стран СНГ (Беларусь, Армения, Киргизия, Казахстан) мы пользуемся услугами экспресс-доставки CDEK. Сроки и стоимость доставки заказов автоматически рассчитывается при оформлении заказа, в зависимости от пункта назначения, количества товаров в заказе и вариантов его получения.</p>
					<p>Бесплатная доставка до пункта выдачи СДЭК для заказов от 7.000 руб. по всей России.</p>
					<p>Бесплатная доставка курьером СДЭК для заказов от 10.000 руб. по всей России.</p>
				</>}/>
		</main>
		</>
	);
};

export default Info;