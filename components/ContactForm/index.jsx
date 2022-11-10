import {useState} from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";

import TextField from "../../UI/TextField";
import TextArea from "../../UI/TextArea";
import Button from "../../UI/Button";

import classes from "./contactForm.module.scss";
import cn from "classnames";
import axios from "axios";
import Modal from "../../UI/Modal";
import Registration from "../Regitration";

const ContactsForm = () => {
		const initialValues = {
			name: '',
			email: '',
			message: ''
		};

	const validationSchema = Yup.object({
		name: Yup.string().required("Обязательное поле!"),
		email: Yup.string().email("Неверный формат email!").required("Обязательное поле!"),
		message: Yup.string().required("Обязательное поле!")
	});

	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState(false);

	const handleForm = async (data) => {
		const url = 'https://api.batova-brand.ru/v1/reviews';

		try {
			const response = await axios.post(url,
				data,
				{
					headers: {
						"Content-Type": "application/json"
					}
				});
				setError(false);
				setShowModal(true);
			return await response.data;
		} catch (err) {
			setError(true);
			setShowModal(true);
			console.log(err)
		}
	};

	const onSubmit = (values, {resetForm}) => {
		console.log(values);
		handleForm(values);
		resetForm();
	};

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema
	});
	const showNameError = formik.touched.name && formik.errors.name;
	const showEmailError = formik.touched.email && formik.errors.email;
	const showMessageError = formik.touched.message && formik.errors.message;
	const disableSubmitBtn = formik.errors.name || formik.errors.email || formik.errors.message || !formik.values.name || !formik.values.email || !formik.values.message;

return (
    <div>
			<form className={classes["contactForm"]} onSubmit={formik.handleSubmit}>
				<TextField
					classname={cn(classes["contactFormInput"], showNameError && classes["error-outline"])}
					type="text"
					name="name"
					placeholder="Имя"
					{... formik.getFieldProps('name')}
				/>
				{ showNameError ? (
					<span className={cn(classes["helperText"], showNameError && classes["error"])}>{formik.errors.name}</span>
				) : (
					<span className={classes["helperText"]}>Введите имя</span>
				)}
				<TextField
					classname={cn(classes["contactFormInput"], showEmailError && classes["error-outline"])}
					type="text"
					name="email"
					placeholder="E-mail"
					{... formik.getFieldProps('email')}
				/>
				{showEmailError ? (
					<span className={cn(classes["helperText"], showEmailError && classes["error"])}>{formik.errors.email}</span>
				) : (
					<span className={classes["helperText"]}>Введите email</span>
				)}
				<TextArea
					classname={classes["contactFormTextArea"]}
					name="message"
					placeholder="Сообщение"
					{... formik.getFieldProps('message')}
				/>
				{showMessageError ? (
				<span className={cn(classes["helperText"], showMessageError && classes["error"])}>{formik.errors.message}</span>
				) : (
				<span className={classes["helperText"]}>Введите текст сообщения</span>
				)}
				<div className={classes["submitBlock"]}>
					<Button
						type="submit"
						variant="contained"
						color="black"
						disabled={disableSubmitBtn}
					>
						Отправить
					</Button>
					<span className={classes["submitBlock__text"]}>
					Нажимая &laquo;Отправить&raquo; Вы&nbsp;соглашаетесь на&nbsp;обработку
						персональных данных и&nbsp;с&nbsp;<Link href="/policy"><a className={classes["submitBlock__link"]}>политикой конфиденциальности</a></Link>
				</span>
				</div>
			</form>
			<Modal active={showModal} setActive={setShowModal} className={classes["modal"]}>
				{!error ? <p>Cообщение отправлено!</p> : <p className={classes["error"]}>Ошибка отправки!<br/><br/>Попробуйте позже!</p>}

			</Modal>
    </div>
    )
};

export default ContactsForm;