import {useState} from 'react';
import {useSelector} from 'react-redux';
import cn from 'classnames';

import {AuthModal} from '../../UI/AuthModal';
import Registration from '../Regitration';
import Modal from '../../UI/Modal';

import classes from './cartNav.module.scss';
import {useRouter} from "next/router";

const CartNav = ({nav, setNav}) => {
	const [auth, setAuth] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const token = useSelector(state => state.auth.auth.accessToken);
	const router = useRouter();
	// const login = () => {
	// 	if (!token) {
	// 		setShowModal(true);
	// 	}
	// };

	const handler = () => {
		setNav('cart');
		router.reload();
	};

	return (<>
			<nav className={classes["nav"]}>
				<ul className={classes["nav__list"]}>
					<li className={classes["nav__item"]} onClick={handler}>
						<button
							className={cn("btn-reset", classes["nav__btn"], classes[`${nav === 'cart' && "active"}`])}
							disabled={nav === 'cart'}
						>
							Ваш&nbsp;заказ
						</button>
					</li>
					<li className={classes["nav__item"]}>
						<svg width="8" height="16" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="0.726562" y="0.796875" width="10.2851" height="1.02851" transform="rotate(45 0.726562 0.796875)" fill="#B3B3B3"/>
							<rect y="14.6172" width="10.2851" height="1.02851" transform="rotate(-45 0 14.6172)" fill="#B3B3B3"/>
						</svg>
					</li>
					<li className={classes["nav__item"]} onClick={() => setNav('delivery')}>
						<button
							className={cn("btn-reset", classes["nav__btn"], classes[`${nav === 'delivery' ? "active" : ''}`])}
							disabled={nav === 'delivery'}
							// onClick={login}
						>
								Доставка&nbsp;и&nbsp;оплата
								</button>
						<a></a>
					</li>
				</ul>
			</nav>
			<AuthModal setAuth={setAuth} setShowModal={setShowModal} showModal={showModal} />
			<Modal active={auth} setActive={setAuth} className={classes["registration-modal"]}>
				<Registration closeModal={setAuth} />
			</Modal>
		</>
	);
};

export default CartNav;