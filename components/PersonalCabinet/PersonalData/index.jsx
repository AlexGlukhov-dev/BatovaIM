import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';

import TextField from '../../../UI/TextField';
import Button from '../../../UI/Button';
import ChangePwd from '../ChangePwd';

import classes from './personalData.module.scss';
import axios from "axios";
import {useCookies} from "react-cookie";
import {useSelector} from "react-redux";
// import {GET_USER_DATA} from "../../../pages/api/axios";

const PersonalData = () => {
	const userData = useSelector(state => state.personal.personalData);
	const {userID} = useSelector(state => state.auth.auth);
	const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\(\d{2,3}\\)[ \\-]*)|(\d{2,4})[ \\-]*)*?\d{3,4}?[ \\-]*\d{3,4}?$/;
	const [cookies, setCookie] = useCookies();

	const initialValues = {
		firstName: userData?.firstName ? userData.firstName : '',
		lastName: userData?.lastName ? userData.lastName : '',
		email: userData?.email ? userData.email : '',
		phone: userData?.phone ? userData.phone : '',
	/*	region: '',
		zipcode: '',
		city: '',
		street: '',*/
	};



	const validationSchema = Yup.object({
		firstName: Yup.string().required('Обязательное поле!'),
		lastName: Yup.string().required('Обязательное поле!'),
		email: Yup.string().email("Неверный формат email!").required('Обязательное поле!'),
		phone: Yup.string().required('Обязательное поле!').matches(phoneRegExp, 'Неверный номер телефона'),
		/*region: Yup.string().required('Обязательное поле!'),
		zipcode: Yup.number().required('Обязательное поле!'),
		city: Yup.string().required('Обязательное поле!'),
		street: Yup.string().required('Обязательное поле!'),*/
	});

	const onSubmit = async (values) => {
		const {firstName, lastName, phone, email} = values;
		const payload = {
			firstName,
			lastName,
			phone,
			email
		};

		const token = cookies["PAC_token"];

		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/${userID}/update`,
				payload,
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": token
					}
				}
			);
		} catch (err) {
			console.error(err);
		}
	};

		return (
		<div className={classes["container"]}>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				{formik => {
					return (
						<Form className={classes["form"]}>
							<div className={classes["personal-data__block"]}>
								<h3 className={classes["title"]}>Личные данные</h3>
								<div className={classes["form-control"]}>
									<Field name="firstName">
										{(props) => {
											const {field, form, meta} = props;

											return (
												<>
													<TextField
														classname={classes["input"]}
														type="text"
														id="firstName"
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
								<Button
									className={classes["save-button"]}
									type="submit"
									variant="contained"
									color="black"
									disabled={!formik.isValid}>Сохранить</Button>
							</div>
							{/*<div className={classes["delivery-data__block"]}>
								<h3 className={classes["title"]}>Данные доставки</h3>
								<div className={classes["form-control"]}>
									<Field name="region">
										{(props) => {
											const {field, form, meta} = props;

											return (
												<>
													<TextField
														classname={classes["input"]}
														type="text"
														id="region"
														placeholder="Область"
														{...field}
													/>
													{meta.touched && meta.error ? (
														<div className={cn(classes["helper-text"], classes["error"])}>{meta.error}</div>
													) : (
														<div className={classes["helper-text"]}>Введите область</div>
													)}
												</>
											);
										}}
									</Field>
								</div>
								<div className={classes["form-control"]}>
									<Field name="zipcode">
										{(props) => {
											const {field, form, meta} = props;

											return (
												<>
													<TextField
														classname={classes["input"]}
														type="text"
														name="zipcode"
														placeholder="Индекс"
														{...field}
													/>
													{meta.touched && meta.error ? (
														<div className={cn(classes["helper-text"], classes["error"])}>{meta.error}</div>
													) : (
														<div className={classes["helper-text"]}>Введите индекс</div>
													)}
												</>
											);
										}}
									</Field>
								</div>
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
														placeholder="Город"
														{...field}
													/>
													{meta.touched && meta.error ? (
														<div className={cn(classes["helper-text"], classes["error"])}>{meta.error}</div>
													) : (
														<div className={classes["helper-text"]}>Введите город</div>
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
														placeholder="Улица, дом, корпус, квартира (офис)"
														{...field}
													/>
													{meta.touched && meta.error ? (
														<div className={cn(classes["helper-text"], classes["error"])}>{meta.error}</div>
													) : (
														<div className={classes["helper-text"]}>Введите название улицы, дома, квартиры (офиса)</div>
													)}
												</>
											);
										}}
									</Field>
								</div>
							</div>*/}
						</Form>
					)
				}}
			</Formik>
			<ChangePwd/>
		</div>
	)
};

export default PersonalData;