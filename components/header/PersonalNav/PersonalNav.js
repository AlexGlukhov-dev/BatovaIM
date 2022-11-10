import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import {useCookies} from 'react-cookie';
import cn from 'classnames';

import headerLK from '../../../public/img/header-lk.svg';
import headerBasket from '../../../public/img/header-basket.svg';

import classes from './personalNav.module.scss';

const PersonalNav = ({setAuth, counter}) => {
	const router = useRouter();
	const [cookies] = useCookies(["PAC_token"]);
	const productsInCart = useSelector(state => state.cart.totalAmount);

	const handleModal = () => {
		if (cookies["PAC_token"]) {
			setAuth(false);
			router.push("/personal")
		} else {
			setAuth(true);
		}
	};

	return (
		<ul className={classes["personal-nav"]}>
			<li className={classes["personal-nav__item"]}>
				<a className="btn-reset" onClick={handleModal}>
					<Image src={headerLK} alt="lk-img"/>
				</a>
			</li>
			<li data-counter={counter}
					className={cn(classes["personal-nav__item"], classes["personal-nav__basket"], counter >= 1 && classes["personal-nav__basket-active"])}>
				<Link href="/cart">
					<a className={classes["basket__link"]}>
						<Image src={headerBasket} alt="basket-img"/>
						{productsInCart ? <span className={classes["basket__badge"]}>{productsInCart}</span> : null}
					</a>
				</Link>
			</li>
		</ul>
	);
};

export default PersonalNav;