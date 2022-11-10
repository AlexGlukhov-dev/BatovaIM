import { useState } from 'react';
import cn from 'classnames';

import { stopScroll } from '../../utils';
import { useLoader } from '../../hooks/useLoader';

import SliderCard from '../../components/SliderCard';
import Tabs from '../../UI/Tabs/Tabs';
import Modal from '../../UI/Modal';
import PCInfo from './PCInfo';
import SizesTable from '../SizesTable';

import classes from './productCard.module.scss';

const ProductCard = ({card}) => {
	const infoData = card["product"]["tabsData"];
	const [showModal, setShowModal] = useState(false);
	const openModal = () => {
		setShowModal(true);
		stopScroll();
	};

	const closeModal = () => {
		setShowModal(false);
		document.body.removeAttribute('style')
	};

	useLoader();

	return (
		<div className={cn(classes["product"], classes["product-container"])}>
			<SliderCard sliderCardData={card.images}/>
			<PCInfo
				card={card}
				setShowModal={openModal}
			/>
			<Tabs tabsInfo={infoData}/>
			<Modal setActive={closeModal} active={showModal} className={classes["sizes-modal"]}>
				<SizesTable/>
			</Modal>
		</div>
	);
};

export default ProductCard;