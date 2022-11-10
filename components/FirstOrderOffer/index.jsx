import Image from 'next/image';
import {useFormik} from "formik";
import * as Yup from "yup";

import Button from '../../UI/Button';

import classes from './firstOrderOffer.module.scss';
import offerImage from '../../public/img/slide-1.jpg';
import TextField from "../../UI/TextField";
import cn from "classnames";
import FlowerDecor from "../FlowerDecor";
import {useCookies} from "react-cookie";

const FirstOrderOffer = ({setIsOpenModal}) => {
	const [cookies, setCookie] = useCookies();

	const initialValues = {
		email: ''
	};

	const validationSchema = Yup.object({
		email: Yup.string().email("Неверный формат email!").required("Обязательное поле!")
	});

	const onSubmit = (values, {resetForm}) => {
		setIsOpenModal(false);
		setCookie("PAC_orderOffer", 1);
		resetForm();
	};

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema
	});
	const showEmailError = formik.touched.email && formik.errors.email;

	return (
		<div className={classes["offer-wrapper"]}>
			<div className={classes["offer-image"]}>
				<Image className={classes["image"]} layout="fill" src={offerImage} alt="offer"/>
				<div className={classes["offer-image__border"]} />
					<FlowerDecor className={classes["offer-decor"]}/>
			</div>
			<div className={classes["offer-content"]}>
				<span className={classes["offer-subtitle"]}>Добро пожаловать на&nbsp;наш сайт</span>
				<h2 className={classes["offer-title"]}>Получите скидку&nbsp;10% на&nbsp;первый заказ</h2>
				<form className={classes["offer-form"]} onSubmit={formik.handleSubmit}>
					<TextField
						classname={classes["offer-email"]}
						type="text"
						name="email"
						placeholder="Ваш email"
						autoComplete="off"
						{... formik.getFieldProps('email')}
					/>
					{showEmailError ? (
						<span className={cn(classes["helper-text"], showEmailError && classes["error"])}>{formik.errors.email}</span>
					) : (
						<span className={classes["helper-text"]}>Введите email</span>
					)}
					<Button className={classes["offer-btn"]} type="submit" variant="contained" color="black">Отправить</Button>
				</form>
			</div>
		</div>
	)
};

export default FirstOrderOffer;