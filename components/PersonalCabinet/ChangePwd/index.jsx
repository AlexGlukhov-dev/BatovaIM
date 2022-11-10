import {useState} from 'react';
import formik, {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import cn from 'classnames';

import TextField from '../../../UI/TextField';
import Button from '../../../UI/Button';
import Modal from	'../../../UI/Modal';

import classes from './changePwd.module.scss';

const ChangePwd = () => {
	const [cookies, setCookie] = useCookies(["PAC_token"]);
	const [wrongPwd, setWrongPwd] = useState(false);
	const [passwordChanged, setPasswordChanged] = useState(false);

	const initialValues = {
		currentPassword: '',
		confirmPassword: '',
		newPassword: ''
	};

	const validationSchema = Yup.object({
		currentPassword: Yup.string().required('Обязательное поле!').min(8, "Пароль должен быть не менее 8-ми симолов!"),
		newPassword: Yup.string().required('Обязательное поле!').min(8, "Пароль должен быть не менее 8-ми симолов!"),
		confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], "Пароли не совпадают").required('Обязательное поле!'),
	});

	const onSubmit = async (values, {resetForm}) => {
		const {currentPassword, newPassword} = values;
		const payload = {
			currentPassword,
			newPassword
		};

		const token = cookies["PAC_token"];
		console.log('change pwd', payload);
		try {
			const res = await axios.post(
				'https://api.batova-brand.ru/v1/auth/change-password',
				payload,
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": token
					},

					// withCredentials: true,
				}
			);
			setWrongPwd(false);
			setPasswordChanged(true);
		} catch (err) {
			console.error(err);
			if (err.response?.status === 401) {
				setWrongPwd(true)
			}
		}
		resetForm();
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{formik => {

				return (
					<>
					<Form className={classes["form"]}>
						<div className={classes["password__block"]}>
							<h3 className={classes["title"]}>Изменение пароля</h3>

							<div className={cn(classes["form-control"], classes["current-pwd"])}>
								<Field name="currentPassword">
									{(props) => {
										const {field, form, meta} = props;
										return (
											<>
												<TextField
													classname={classes["input"]}
													type="password"
													id="currentPassword"
													placeholder="Текущий пароль"
													onInput={() => setWrongPwd(false)}
													{...field}
												/>
												{meta.touched && meta.error ? (
													<div className={cn(classes["helper-text"], classes["error"])}>{meta.error}</div>
												) : (
													wrongPwd ?
														<div className={cn(classes["helper-text"], classes["error"])}>Введен неверный
															пароль!</div> :
														<div className={classes["helper-text"]}>Введите текущий пароль</div>
												)}
											</>
										);
									}}
								</Field>
							</div>
							<div className={cn(classes["form-control"], classes["new-pwd"])}>
								<Field name="newPassword">
									{(props) => {
										const {field, form, meta} = props;
										return (
											<>
												<TextField
													classname={classes["input"]}
													type="password"
													name="newPassword"
													placeholder="Новый пароль"
													{...field}
												/>
												{meta.touched && meta.error ? (
													<div className={cn(classes["helper-text"], classes["error"])}>{meta.error}</div>
												) : (
													<div className={classes["helper-text"]}>Новый пароль</div>
												)}
											</>
										);
									}}
								</Field>
							</div>
							<div className={cn(classes["form-control"], classes["confirm-pwd"])}>
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
													<div className={classes["helper-text"]}>Повторите пароль</div>
												)}
											</>
										);
									}}
								</Field>
							</div>
							<Button
								type="submit"
								className={classes["save-button"]}
								variant="contained"
								color="black"
								disabled={!formik.isValid}
							>
								Изменить
							</Button>
						</div>
					</Form>
						<Modal className={classes["modal"]} active={passwordChanged} setActive={setPasswordChanged}>Пароль изменен!</Modal>
					</>
				)
			}}
		</Formik>
	)
};

export default ChangePwd;