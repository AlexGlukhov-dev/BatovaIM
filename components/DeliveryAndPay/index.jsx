import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';

import { clearCart } from '../../redux/slices/cartSlice';
import { formatPrice2, setExpiresCookies } from "../../utils";

import TextField from '../../UI/TextField';
import Button from '../../UI/Button';
import TextArea from '../../UI/TextArea';
import Radio from '../../UI/RadioButtons';
import CdekWidget from '../cdekWidget';

import classes from './deliveryAndPay.module.scss';
import { setAuth } from '../../redux/slices/authSlice';
import { useCookies } from 'react-cookie';

const DeliveryAndPay = () => {
	let [deliveryData, setDeliveryData] = useState(null);
	const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
	const userData = useSelector(state => state.personal.personalData);
	const freeDelivery = 7000;
	const totalCartSum = useSelector(state => state.cart.totalCartSum);
	let deliverySum = deliveryData ? (Math.round(+deliveryData.deliveryPrice * 1.1 * 100) / 100).toFixed(2) : 0;
	const totalPrice = deliverySum < 7000 ? +totalCartSum + +deliverySum : +totalCartSum;
	const {email} = userData;
	const cart = useSelector(state => state.cart.cart);
	const cartId = useSelector(state => state.cart.cartId);
	const dispatch = useDispatch();
	const router = useRouter();
	const deliveryOptions = [
		{key: 'Самовывоз из офиса', value: 'office'},
		{key: 'Доставка CDEK', value: 'cdek'}
	];
	const [disableBtn, setDisableBtn] = useState(false);
	const {accessToken: token} = useSelector(state => state.auth.auth);
	const [cookies, setCookie] = useCookies(["PAC_token"]) ;
	const [error, setError] = useState('');

	const sendOrderData = async (data) => {
		const url = 'https://api.batova-brand.ru/v1/order';
		try {
			const response = await axios.post(url,
				data, {
					headers: {
						"Content-Type": "application/json"
					}
				}
			);

		} catch (err) {
			console.log(err)
		}
	};

	const paymentResult = (status, email, uid, id, price, tariff, cartId) => {
		const url = 'https://api.batova-brand.ru/v1/payment/status';
		// const url = 'http://192.168.1.156:4001/v1/payment/status';
		const data = {status, email, orderUuid: uid, id, price: +price, tariff, cartId};
		try {
			axios.post(url,
				data,
				{
					headers: {
						"Content-Type": "application/json"
					}
				})
		} catch (err) {
			console.log(err)
		}
	};

	const getReceiptData = (cart, userData, totalCartSum) => {
		const deliveryItem = {
			"label": "Доставка",
			"price": deliverySum,
			"quantity": 1,
			"amount": deliverySum,
			"vat": 0,//ставка НДС
			"method": 1,// тег-1214 признак способа расчета - признак способа расчета
			"object": 4,// тег-1212 признак предмета расчета - признак предмета товара, работы, услуги, платежа, выплаты, иного предмета расчета
			"measurementUnit": "шт"
		};

		const cartItems = cart.map(item => ({
			"label": item.title,
			"price": item.price,
			"quantity": item.amount,
			"amount": item.totalSum,
			"vat": 0,//ставка НДС
			"method": 1,// тег-1214 признак способа расчета - признак способа расчета
			"object": 1,// тег-1212 признак предмета расчета - признак предмета товара, работы, услуги, платежа, выплаты, иного предмета расчета
			"measurementUnit": "шт"
		}));
		const items = [...cartItems, deliveryItem];

		return {
			cloudPayments: {
				CustomerReceipt: {
					items,
					"calculationPlace": "https://batova-brand.ru", //место осуществления расчёта, по умолчанию берется значение из кассы//TODO check it
					// "taxationSystem": 2, //система налогообложения; необязательный, если у вас одна система налогообложения//TODO check it
					"email": userData.email, //e-mail покупателя, если нужно отправить письмо с чеком
					"phone": `${userData.phone ? userData.phone : ''}`, //телефон покупателя в любом формате, если нужно отправить сообщение со ссылкой на чек
					"customerInfo": `${userData.lastName ? userData.lastName : ''} ${userData.firstName ? userData.firstName : ''}`, // тег-1227 Покупатель - наименование организации или фамилия, имя, отчество (при наличии), серия и номер паспорта покупателя (клиента)
					// "customerInn": "", // тег-1228 ИНН покупателя
					"isBso": false, //чек является бланком строгой отчётности//TODO check it
					"AgentSign": null, //признак агента, тег ОФД 1057//TODO check it
					"amounts":
						{
							"electronic": totalPrice, // Сумма оплаты электронными деньгами
							"advancePayment": 0.00, // Сумма из предоплаты (зачетом аванса) (2 знака после запятой)
							"credit": 0.00, // Сумма постоплатой(в кредит) (2 знака после запятой)
							"provision": 0.00 // Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после запятой)
						}
				}
			}
		};
	};

	const pay = (data) => {
		const receipt = getReceiptData(cart, userData, totalCartSum);
		const uuid = uuidv4();

		sendOrderData({...data, uuid})
		.then(() => {
			const widget = new cp.CloudPayments();
			widget.pay('charge',
				{ //options
					publicId: 'pk_74551916e93ffcb029e78c7c290fe',
					description: 'Оплата заказа', //назначение
					amount: +totalPrice, //сумма
					currency: 'RUB', //валюта
					accountId: email, //идентификатор плательщика (необязательно)
					invoiceId: uuid, //номер заказа  (необязательно)
					email: email, //email плательщика (необязательно)
					skin: "modern", //дизайн виджета (необязательно)
					data: receipt
				},
				{
					onSuccess: function (options) {
						paymentResult('succeed', email, uuid, deliveryData.id, deliveryData.price, deliveryData.tariff, cartId);
						dispatch(clearCart());
						setDisableBtn(false);
						router.push('/shop')
					},
					onFail: function (reason, options) {
						paymentResult('failed', email, uuid, deliveryData.id, deliveryData.price, deliveryData.tariff, cartId);
						setDisableBtn(false);
					},
					onComplete: function (paymentResult, options) {
						//Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
					}
				}
			)
		})
		.catch(() => console.log("order error"));

	};

	const initialValues = {
		firstName: userData?.firstName ? userData.firstName : '',
		lastName: userData?.lastName ? userData.lastName : '',
		email: userData?.email ? userData.email : '',
		phone: userData?.phone ? userData.phone : '',
		city: deliveryData?.cityName ? deliveryData.cityName : '',
		street: deliveryData?.address ? deliveryData.address : '',
		comments: '',
		chooseDelivery: 'office',
		password: !!token ? '********' : '',
		confirmPassword: !!token ? '********' : ''
	};

	const validationSchema = Yup.object({
		firstName: Yup.string().required('Обязательное поле!'),
		lastName: Yup.string().required('Обязательное поле!'),
		email: Yup.string().email("Неверный формат email!").required('Обязательное поле!'),
		phone: Yup.string().required('Обязательное поле!').matches(phoneRegExp, 'Неверный номер телефона'),
		password: Yup.string().required('Обязательное поле!').min(8, "Пароль должен быть не менее 8 символов!"),
		confirmPassword: Yup.string().required("Обязательное поле!").oneOf([Yup.ref('password'), null], "Пароли не совпадают!"),
	});

	const onSubmit = async (values, {resetForm}) => {
		setDisableBtn(true);

		// if (!token) {
		// 	const {email, password} = values;
		// 	const data = cart.length ? {...values, cartItems: cart} : values;
		// 	const url =`${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/register`;
		//
		// 	try {
		// 		const res = await axios.post(
		// 			url,
		// 			data,
		// 			{
		// 				headers: {"Content-Type": "application/json"},
		// 			}
		// 		);
		// 		const accessToken = (res?.data?.token);
		// 		const userID = (res?.data?.id);
		// 		dispatch(setAuth({email, userID, accessToken}));
		// 		resetForm();
		// 		setCookie("PAC_token", accessToken,{
		// 			path: '/',
		// 			expires: setExpiresCookies(1),
		// 		});
		//
		// 	} catch (err) {
		// 		if (!err?.response) {
		// 			setError("Сервер не отвечает!");
		// 			throw new Error("Сервер не отвечает!");
		// 		} else if (err.response?.status === 409) {
		// 			setError("Пользователь с таким E-mail уже зарегистрирован!");
		// 			throw new Error("Пользователь с таким E-mail уже зарегистрирован!");
		// 		} else {
		// 			setError("Регистрация невозможна!");
		// 			throw new Error("Регистрация невозможна!");
		// 		}
		// 	}
		// }

		const orderData = {
			"email": values.email,
			"password": values.password,
			"confirmPassword": values.confirmPassword,
			"comment": values.comments,
			"firstName": values.firstName,
			"lastName": values.lastName,
			"phone": values.phone,
			cartId,
			"cartItems": cart,
			"cdekInfo": {
				"city": values.city,
				"address": values.street,
				// "city": deliveryData?.cityName,
				// "address": deliveryData?.address,
				"deliverySum": deliverySum,
			}
		};
		pay(orderData);
		resetForm();
	};

	return (<>
			<div className={classes["container"]}>
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
					// validateOnMount
				>
					{
						formik => {

							if (formik.values.chooseDelivery === 'office') {
								formik.values.city = 'Москва';
								formik.values.street = 'ул. Ферсмана 1к1';
								deliverySum = 0;

							} else {
								formik.values.city = deliveryData ? deliveryData.cityName : '';
								formik.values.street = deliveryData ? deliveryData.address : '';
							}
							// formik.values.city = deliveryData ? deliveryData.cityName : 'Москва';
							// formik.values.street = deliveryData ? deliveryData.address : 'Краснопресненская';

							return <Form className={classes["form"]}>
								<div className={classes["personal-data__block"]}>
									<div className={classes["form-control"]}>
										<Field name="firstName">
											{(props) => {
												const {field, form, meta} = props;
												return (
													<>
														<TextField
															classname={classes["input"]}
															type="text"
															id="name"
															placeholder="Имя"
															{...field}
														/>
														{meta.touched && meta.error ? (
															<div className={cn(classes["helper-text"], classes["error"])}>{meta.error}</div>
														) : (
															<div className={classes["helper-text"]}>Введите имя</div>
														)}
													</>
												);
											}}
										</Field>
									</div>
									<div className={classes["form-control"]}>
										<Field name="email">
											{(props) => {
												const {field, form, meta} = props;

												return (
													<>
														<TextField
															classname={classes["input"]}
															type="text"
															id="email"
															placeholder="Email"
															{...field}
														/>
														{meta.touched && meta.error ? (
															<div className={cn(classes["helper-text"], classes["error"])}>{meta.error}</div>
														) : (
															<div className={classes["helper-text"]}>Введите email</div>
														)}
													</>
												);
											}}
										</Field>
									</div>
									<div className={cn(classes["form-control"], classes["form-control__name"])}>
										<Field name="lastName">
											{(props) => {
												const {field, form, meta} = props;

												return (
													<>
														<TextField
															classname={classes["input"]}
															type="text"
															id="lastName"
															placeholder="Фамилия"
															{...field}
														/>
														{meta.touched && meta.error ? (
															<div className={cn(classes["helper-text"], classes["error"])}>{meta.error}</div>
														) : (
															<div className={classes["helper-text"]}>Введите фамилию</div>
														)}
													</>
												);
											}}
										</Field>
									</div>
									<div className={classes["form-control"]}>
										<Field name="phone">
											{(props) => {
												const {field, form, meta} = props;

												return (
													<>
														<TextField
															classname={classes["input"]}
															type="text"
															id="phone"
															placeholder="Телефон"
															{...field}
														/>
														{meta.touched && meta.error ? (
															<div className={cn(classes["helper-text"], classes["error"])}>{meta.error}</div>
														) : (
															<div className={classes["helper-text"]}>Введите телефон</div>
														)}
													</>
												);
											}}
										</Field>
									</div>
									{!token && <div className={classes["form-control"]}>
										<Field name="password">
											{(props) => {
												const {field, form, meta} = props;

												return (
													<>
														<TextField
															classname={classes["input"]}
															type="password"
															id="password"
															placeholder="Пароль"
															{...field}
														/>
														{meta.touched && meta.error ? (
															<div className={cn(classes["helper-text"], classes["error"])}>{meta.error}</div>
														) : (
															<div className={classes["helper-text"]}>Введите пароль</div>
														)}
													</>
												);
											}}
										</Field>
									</div>}
									{!token && <div className={classes["form-control"]}>
										<Field name="confirmPassword">
											{(props) => {
												const {field, form, meta} = props;

												return (
													<>
														<TextField
															classname={classes["input"]}
															type="password"
															id="confirmPassword"
															placeholder="Повторите пароль"
															{...field}
														/>
														{meta.touched && meta.error ? (
															<div className={cn(classes["helper-text"], classes["error"])}>{meta.error}</div>
														) : (
															<div className={classes["helper-text"]}>Введите пароль</div>
														)}
													</>
												);
											}}
										</Field>
									</div>}
								</div>
								<div className={classes["choose-delivery"]}>
									<h3 className={classes["choose-delivery__title"]}>Выбирите вариант доставки:</h3>
									<Radio className={classes["deliveryRadioBtns"]} options={deliveryOptions} name="chooseDelivery"/>
								</div>
								<div className={classes["delivery-data__block"]}>

									{
										formik.values.chooseDelivery === 'cdek' && <>
											{/*<h3 className={classes["title"]}>Доставка CDEK <sup>*</sup></h3>*/}
											<CdekWidget setDeliveryData={setDeliveryData}/>
											{/*<div className={classes["cdek-map"]} id="forpvz" style={{height: "600px", margin: "20px 0"}}></div>*/}
										</>
									}
									<div className={classes["form-control"]}>
										<Field name="city">
											{(props) => {
												const {field, form, meta} = props;

												return (
													<>
														<TextField
															classname={classes["input"]}
															type="text"
															id="city"
															// placeholder="Город"
															disabled
															{...field}
														/>
														{meta.touched && meta.error ? (
															<div className={cn(classes["helper-text"], classes["error"])}>{meta.error}</div>
														) : (
															<div className={classes["helper-text"]}>Город</div>
														)}
													</>
												);
											}}
										</Field>

									</div>
									<div className={classes["form-control"]}>
										<Field name="street">
											{(props) => {
												const {field, form, meta} = props;

												return (
													<>
														<TextField
															classname={classes["input"]}
															type="text"
															id="street"
															// placeholder="Улица, дом, корпус, квартира (офис)"
															disabled
															{...field}
														/>
														{meta.touched && meta.error ? (
															<div className={cn(classes["helper-text"], classes["error"])}>{meta.error}</div>
														) : (
															<div className={classes["helper-text"]}>Адрес</div>
														)}
													</>
												);
											}}
										</Field>
									</div>

									<div className={classes["delivery-info"]}>
										<p><sup>*</sup>{`Бесплатная доставка по Росcии при заказе от ${freeDelivery}p до ПВЗ СДЭК`}</p>
									</div>

								</div>
								<div className={classes["comments-block"]}>
									<h3 className={classes["title"]}>Комментарий к оформлению заказа</h3>
									<Field name="comments">
										{(props) => {
											const {field} = props;

											return (
												<TextArea
													classname={classes["message-field"]}
													id="comments"
													placeholder="Оставьте комментарий"
													{...field}
												/>
											);
										}}
									</Field>
								</div>
								<div className={classes["summary__block"]}>
									<div className={classes["summary__title"]}>
										Ваш заказ:
									</div>
									<div className={classes["summary__info"]}>
										<div className={classes["summary__sum"]}>{`Cумма: ${formatPrice2(totalCartSum)} р`}</div>
										<div className={classes["summary__delivery"]}>{`Доставка: ${formatPrice2(deliverySum)} р`}</div>
										<div
											className={classes["summary__total"]}>{`Итого: ${formatPrice2(totalCartSum + +deliverySum)} р`}</div>
									</div>
								</div>
								<div className={classes["submit__block"]}>
									<span className={classes["submit__text"]}>
								Нажимая на&nbsp;кнопку &laquo;Оплатить&raquo;, вы&nbsp;принимаете <Link href="/oferta"><a
										className={classes["submit__link"]}>договор&nbsp;оферты</a></Link>, соглашаетесь с&nbsp;<Link
										href="/policy"><a
										className={classes["submit__link"]}>политикой&nbsp;конфиденциальности</a></Link> и&nbsp;даете согласие на&nbsp;обработку персональных данных.
								</span>
									<Button
										className={classes["submit__btn"]}
										onClick={() => {
											if (formik.values.chooseDelivery === 'office') {
												setDeliveryData({
													cityName: formik.values.cityName || '',
													address: formik.values.address || '',
													deliveryPrice: deliverySum,
													id: '',
													price: 0,
													tariff: 'office'
												})
											}
										}}
										type="submit"
										variant="contained"
										color="black"
										disabled={!formik.isValid || !totalCartSum || !formik.values.city || !formik.values.street || disableBtn}
									>Оплатить</Button>
								</div>
							</Form>
						}
					}
				</Formik>
			</div>
		</>
	)
};

export default DeliveryAndPay;