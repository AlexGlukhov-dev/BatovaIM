// import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import cn from "classnames";
import axios from 'axios';
import { setAuth } from "../../../redux/slices/authSlice";

import TextField from "../../../UI/TextField";
import Button from "../../../UI/Button";

import classes from "./authForm.module.scss";
import { useCookies } from "react-cookie";
import { setExpiresCookies } from "../../../utils";
import { updateUserData } from "../../../redux/slices/personalCabinetSlice";
import { useState } from "react";

const AuthForm = ({closeModal, redirect}) => {
	const [cookies, setCookie] = useCookies(["PAC_token"]);
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const cart = useSelector(state => state.cart.cart);
	const userId = useSelector(state => state.auth.auth.userID);
	const initialValues = {
		email: '',
		password: '',
	};

	const validationSchema = Yup.object({
		password: Yup.string().required("Обязательное поле!").min(8, "Пароль должен быть не менее 8 символов!"),
		email: Yup.string().email("Неверный формат email!").required("Обязательное поле!")
	});

	const onSubmit = async (values, {resetForm}) => {
		// const url = 'http://92.255.107.119:8080/auth/signin';//mock data
		// const url = 'http://192.168.1.54:8080/auth/signin';//mock data Sasha
		//const url = 'http://192.168.1.95:3000/v1/auth/login';
		const url = process.env.NEXT_PUBLIC_BASE_URL + '/v1/auth/login';
		// const url = 'http://192.168.1.156:4001/v1/auth/login';

		const {email} = values;
		const data = cart.length ? {...values, cartItems: cart} : values;

		try {
			const res = await axios.post(url,
				data,
				// {email, cart},
				{
					headers: {'Content-Type': 'application/json'},
					// withCredentials: true
				}
			);

			const accessToken = (res?.data?.token);
			const userID = (res?.data?.id);
			dispatch(setAuth({email, userID, accessToken}));
			if (cart.length) {
				//TODO add sendCart function
				// console.log(cart.map(item => ({...item, userId: userID})))
			}
			setCookie("PAC_token", accessToken, {
				path: '/',
				expires: setExpiresCookies(1),
			});

			redirect();
			closeModal(false);

			resetForm();
		} catch (err) {
			if (!err?.response) {
				setError("Сервер не отвечает!");
				throw new Error("Сервер не отвечает!");
			} else if (err.response?.status === 400) {
				setError("Отсутствует Email или пароль!");
				throw new Error("Отсутствует Email или пароль!");
			} else if (err.response?.status === 401) {
				setError("Неверный email или пароль!");
				throw new Error("Неверный email или пароль!");
			} else if (err.response?.status === 404) {
				setError("Пользователь не найден!");
				throw new Error("Пользователь не найден!");
			} else {
				setError("Авторизация невозможна!");
				throw new Error("Авторизация невозможна!");
			}
		}
		resetForm();
	};

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema
	});
	const showPasswordError = formik.touched.password && formik.errors.password;
	const showEmailError = formik.touched.email && formik.errors.email;
	const disableSubmitBtn = formik.errors.password || formik.errors.email || !formik.values.password || !formik.values.email;

	return (
		<form className={classes["form"]} onSubmit={formik.handleSubmit}>
			<div className={classes["form-group"]}>
				<TextField
					classname={cn(classes["form__input"], showEmailError && classes["error-outline"])}
					type="text"
					name="email"
					placeholder="E-mail"
					autoComplete="off"
					{...formik.getFieldProps('email')}
				/>
				{showEmailError ? (
					<span className={cn(classes["helper-text"], showEmailError && classes["error"])}>{formik.errors.email}</span>
				) : (
					<span className={classes["helper-text"]}>Введите email</span>
				)}
				<TextField
					classname={cn(classes["form__input"], showPasswordError && classes["error-outline"])}
					type="password"
					name="password"
					placeholder="Пароль"
					autoComplete="off"
					{...formik.getFieldProps('password')}
				/>
				{showPasswordError ? (
					<span
						className={cn(classes["helper-text"], showPasswordError && classes["error"])}>{formik.errors.password}</span>
				) : (
					<span className={classes["helper-text"]}>Введите пароль</span>
				)}
			</div>
			{error ? <span className={classes["error"]}>{error}</span> : ''}
			<Button
				type="submit"
				variant="contained"
				color="black"
				disabled={disableSubmitBtn}
				className={classes["submit-btn"]}
			>
				Войти
			</Button>
		</form>
	)
};

export default AuthForm;