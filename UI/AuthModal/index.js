import classes from "../../components/CartItems/cartItems.module.scss";
import Button from "../Button";
import Modal from "../Modal";
import {useEffect} from "react";

export const AuthModal = ({showModal, setShowModal, setAuth}) => {

	useEffect(()=> {
		const body = document.body;
		const header = document.getElementById('header');
		// const paddingOffset = (window.innerWidth - body.offsetWidth) + 'px';

		body.style.overflow = `${showModal ? 'hidden' : 'auto' }`;
		body.style.paddingRight = `${showModal ? '17px' : 0 }`;
		header.style.paddingRight = `${showModal ? '17px' : 0 }`;
	}, [showModal]);


	return (
		<Modal className={classes["cart-submit__modal"]} active={showModal} setActive={setShowModal} >
		<p>Для оформления заказа нужно войти в личный кабинет!</p>
		<div className={classes["cart-submit__btn-group"]} >
			<Button
				className={classes["cart-submit__btn"]}
				variant="contained"
				onClick={() => {
					setShowModal(false);
					setAuth(true)}
				}
				color="light">Войти</Button>
		</div>
	</Modal>
	)
};

