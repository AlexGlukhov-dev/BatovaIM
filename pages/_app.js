import Head from 'next/head';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import '../node_modules/normalize.css/normalize.css'


import store, { persistor } from '../redux/store';
import Header from '../components/header/Header';
import FooterSection from '../components/FooterSection';
import BreadCrumbs from '../components/BreadCrumbs';
import ScrollToTopBtn from '../UI/ScrollToTopBtn';

import favicon from '/favicon.ico';
import '../styles/globals.scss'


const MyApp = ({Component, pageProps}) => {
	const router = useRouter();

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<div className={"wrapper"}>
					<Script src="https://widget.cloudpayments.ru/bundles/cloudpayments.js"></Script>
					<Script id="ISDEKscript" src="https://tech.batova-brand.ru/widget/widjet.min.js"></Script>
					<ScrollToTopBtn/>
					<Head>
						<link rel="shortcut icon" href={favicon.src} type="image/x-icon"/>
						<title>Сайт Batova-brand.ru</title>
					</Head>
					<Header/>
					{router.pathname !== '/' && <BreadCrumbs/>}
					<Component {...pageProps} />
					{/*<PersistGate loading={null} persistor={persistor}>*/}
					{/*    <Component {...pageProps} />*/}
					{/*</PersistGate>*/}
					<FooterSection/>
				</div>
			</PersistGate>
		</Provider>
	)
};

export default MyApp;
