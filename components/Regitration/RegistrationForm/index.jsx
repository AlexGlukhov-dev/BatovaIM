import {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import cn from "classnames";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import {setAuth} from "../../../redux/slices/authSlice";

import TextField from "../../../UI/TextField";
import Button from "../../../UI/Button";

import classes from ".././AuthForm/authForm.module.scss";
import {useCookies} from "react-cookie";
import {setExpiresCookies} from "../../../utils";
import {updateUserData} from "../../../redux/slices/personalCabinetSlice";



const RegistrationForm = ({redirect, closeModal}) => {
	const dispatch = useDispatch();
	const cart = useSelector(state => state.cart.cart);
	const [cookies, setCookie] = useCookies(["PAC_token"]) ;
	const [error, setError] = useState('');

	const initialValues = {
		password: '',
		confirmPassword: '',
		email: ''
	};

	const validationSchema = Yup.object({
		password: Yup.string().required("Обязательное поле!").min(8, "Пароль должен быть не менее 8 символов!"),
		confirmPassword: Yup.string().required("Обязательное поле!").oneOf([Yup.ref('password'), null], "Пароли не совпадают!"),
		email: Yup.string().email("Неверный формат email!").required("Обязательное поле!")
	});

	const onSubmit = async (values, {resetForm}) => {
		const {email, password} = values;
		// const url = 'http://92.255.107.119:8080/auth/signup';//mock url
		const data = cart.length ? {...values, cartItems: cart} : values;
		const url =`${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/register`;

		try {
			const res = await axios.post(
				url,
				data,
				{
					headers: {"Content-Type": "application/json"},
					// withCredentials: true,
				}
			);
			const accessToken = (res?.data?.token);
			const userID = (res?.data?.id);
			dispatch(setAuth({email, userID, accessToken}));
			resetForm();
			setCookie("PAC_token", accessToken,{
				path: '/',
				expires: setExpiresCookies(1),
			});
			closeModal(false);
			redirect();

		} catch (err) {
			if (!err?.response) {
				setError("Сервер не отвечает!");
				throw new Error("Сервер не отвечает!");
			} else if (err.response?.status === 409) {
				setError("Пользователь с таким E-mail уже зарегистрирован!");
				throw new Error("Пользователь с таким E-mail уже зарегистрирован!");
			} else {
				setError("Регистрация невозможна!");
				throw new Error("Регистрация невозможна!");
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
	const showConfirmPasswordError = formik.touched.confirmPassword && formik.errors.confirmPassword;
	const showEmailError = formik.touched.email && formik.errors.email;
	const disableSubmitBtn = formik.errors.password || formik.errors.email || formik.errors.confirmPassword ||
		!formik.values.password || !formik.values.email || !formik.values.confirmPassword;

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
				<TextField
					classname={cn(classes["form__input"], showConfirmPasswordError && classes["error-outline"])}
					type="password"
					name="confirmPassword"
					placeholder="Повторите пароль"
					autoComplete="off"
					{...formik.getFieldProps('confirmPassword')}
				/>
				{showConfirmPasswordError ? (
					<span
						className={cn(classes["helper-text"], showConfirmPasswordError && classes["error"])}>{formik.errors.confirmPassword}</span>
				) : (
					<span className={classes["helper-text"]}>Введите пароль</span>
				)}
			</div>
			{error ? <span className={classes["error"]} style={{fontSize: "14px", marginBottom: "5px"}}>{error}</span> : ''}
			<Button
				type="submit"
				variant="contained"
				color="black"
				disabled={disableSubmitBtn}
				className={classes["submit-btn"]}
			>
				Зарегистрироваться
			</Button>
		</form>
	)
};

export default RegistrationForm;