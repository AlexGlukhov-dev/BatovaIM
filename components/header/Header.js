import {useState, useEffect} from 'react';
import cn from 'classnames';
import {useCookies} from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import {useRouter} from 'next/router';

import useSize from '../../hooks/useSize';
import {setExpiresCookies} from "../../utils";
import {checkScroll} from '../../utils';
import {headerLinksLeft, headerLinksRight} from '../../content';
import { showLoader } from '../../redux/slices/loaderSlice';

import Navigation from '../Navigation/Navigation';
import BurgerNav from '../BurgerNav';
import MainLogo from '../MainLogo';
import PersonalNav from './PersonalNav/PersonalNav';
import Modal from '../../UI/Modal';
import { Loader } from '../../UI/Loader/Loader';
import Registration from '../Regitration';
import FirstOrderOffer from '../FirstOrderOffer';

import classes from './header.module.scss';

const Header = () => {
	const [counter, setCounter] = useState(0);
	const [auth, setAuth] = useState(false);
	const [headerBg, setHeaderBg] = useState(false);
	const [cookies, setCookie] = useCookies();
	const [isOpenModal, setIsOpenModal] = useState(false);
	const loader = useSelector(state => state.loader.loader);
	const dispatch = useDispatch();
 const router = useRouter();

	const handleLoader = () => {

		if (router.pathname === '/shop' || router.pathname === '/sale') return;

			dispatch(showLoader());
			document.body.style.overflow = 'hidden';
			document.body.style.paddingRight = '17px';
			document.getElementById('header').style.paddingRight = '17px';
	};

	const handleModal = () => {
		setIsOpenModal(false);
		setCookie("PAC_orderOffer", 1,{
			path: '/',
			expires: setExpiresCookies(7),
		})
	};

	const [target, currentSize] = useSize();
	const {width} = currentSize;

	useEffect(() => {
		if (window) {
			window.addEventListener('scroll', () => checkScroll(50, setHeaderBg));
		}

		return () => {
			window.removeEventListener('scroll', () => checkScroll(50, setHeaderBg))
		}
	}, []);

	const headerLinks = headerLinksLeft.concat(headerLinksRight);
	const {PAC_token, PAC_orderOffer} = cookies;

	useEffect(() => {
		PAC_token ? setCookie("PAC_authorized", 'user authorize') : setCookie("PAC_authorized", false)
	}, [PAC_token, setCookie]);

	useEffect(() => {
		PAC_orderOffer ? setIsOpenModal(false) : setIsOpenModal(true);
	}, [PAC_orderOffer]);

	return (<>
			{loader && <div className="loader-wrapper"><Loader/></div>}
		<header ref={target} className={classes["header-wrapper"]}>
			<div className={classes["header-fixed"]}  id="header" style={headerBg ? {backgroundColor: "#fff"} : {backgroundColor: "transparent"}}>
				<div className={cn(classes["header"], classes["header-container"])}>
					{width > 1024 ? <Navigation direction="row" links={headerLinksLeft} loader={handleLoader}/> :
						<BurgerNav links={headerLinks}/>}
					<MainLogo />
					<div className={classes["right-nav"]}>
						{width > 1024 && <Navigation direction="row" links={headerLinksRight} loader={handleLoader}/>}
						<PersonalNav auth={auth} setAuth={setAuth} counter={counter}/>
					</div>
				</div>
				<Modal active={auth} setActive={setAuth} className={classes["registration-modal"]}>
					<Registration closeModal={setAuth} />
				</Modal>
				 <Modal onClick={handleModal} active={isOpenModal} setActive={setIsOpenModal} className={classes["offer-modal"]}>
					<FirstOrderOffer setIsOpenModal={setIsOpenModal}/>
				</Modal>
			</div>
		</header>
		</>
	);
};

export default Header;