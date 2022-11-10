import { useLayoutEffect } from 'react';

import classes from '../DeliveryAndPay/deliveryAndPay.module.scss';

const CdekWidget = ({setDeliveryData}) => {
	useLayoutEffect(() => {
		new ISDEKWidjet({
			defaultCity: 'auto',
			cityFrom: 'Москва',
			lang: "rus",
			country: 'Россия',
			link: 'forpvz',
			//path: 'https://widget.cdek.ru/widget/scripts/',
			path: 'https://tech.batova-brand.ru/widget/scripts/',
			servicepath: 'https://tech.batova-brand.ru/service_2.php',
			templatepath: 'https://tech.batova-brand.ru/widget/scripts/template.php',
			detailAddress: true,
			goods: [{
				length: 25,
				width: 17,
				height: 7,
				weight: 0.5
			}],
			apikey: '53514c06-4594-4980-a77e-08813082c87a',
			onReady: function () {
				document?.querySelector('.CDEK-widget__delivery-type__button')?.setAttribute('type', 'button');
				document?.querySelector('.CDEK-widget__courier-address__button')?.setAttribute('type', 'button');
				// console.log(Array.from(document?.querySelectorAll(".CDEK-widget__delivery-type__item-details > p"))[1].style.display='none')
			},
			onChoose: function (info) {
				// console.log('pvz', info);
				setDeliveryData({
					cityName: info.cityName,
					address: info.PVZ.Address,
					deliveryPrice: info.price,
					id: info.id,
					price: info.price,
					tariff: info.tarif
				});
			},
			onChooseAddress: function (data) {
				// console.log('data', data);
				setDeliveryData({
					cityName: data.cityName,
					address: data.address,
					deliveryPrice: data.price,
					id: data.id,
					price: data.price,
					tariff: data.tarif
				})
			},
			onCalculate: function (data) {
				// console.log('Calc', data)
			},
			onChooseProfile: function (data) {
				//console.log('Courier', data);

			}
		})
	}, []);

	return (
		<div className={classes["cdek-map"]} id="forpvz" style={{height: "600px", margin: "20px 0"}}></div>
	)
};

export default CdekWidget;