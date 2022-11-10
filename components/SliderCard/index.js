import {Pagination, Navigation } from "swiper";
import {SwiperSlide, Swiper} from "swiper/react";

// import productCard from '../../public/img/productCard.jpg';
// import slideOne from '../../public/img/slide-1.jpg';
// import slideTwo from '../../public/img/slide-2.jpg';
// import slideThree from '../../public/img/slide-3.jpg';
// import slideFour from '../../public/img/slide-4.jpg';
import prevArrow from  '../../public/img/prev-arrow.svg';
import nextArrow from  '../../public/img/next-arrow.svg';

import {useState} from "react";

import 'swiper/css';
import "swiper/css/pagination";
import classes from "./sliderCard.module.scss";
import Image from "next/image";


const SliderCard = ({sliderCardData}) => {
    const [swiper, setSwiper] = useState({});
    const pagination = {
        clickable: true,
        type: "bullets",
        bulletActiveClass: 'bullet-item-active',
        bulletClass: "bullet-item"
    };

    if(swiper.pagination) {
       swiper.pagination.el.classList.add(classes['product-pagination']);
    }

    if(swiper.navigation) {
        swiper.navigation.nextEl.classList.add('arrow-button-next', classes['arrow-button-next']);
        swiper.navigation.prevEl.classList.add('arrow-button-prev', classes['arrow-button-prev']);
        swiper.navigation.nextEl.style.backgroundImage = `url(${nextArrow.src})`;
        swiper.navigation.prevEl.style.backgroundImage = `url(${prevArrow.src})`;
    }

    // const sliderCardData = [
    //     {id: 1, src: productCard},
    //     {id: 2, src: slideOne},
    //     {id: 3, src: slideTwo},
    //     {id: 4, src: slideThree},
    //     {id: 5, src: slideFour},
    // ];



    return (
        <Swiper
            onSwiper={setSwiper}
            modules={[Pagination, Navigation]}
            navigation={true}
            spaceBetween={30}
            grabCursor={true}
            pagination={pagination}
            className={classes["product-slider"]}
        >
            { sliderCardData.map(data => <SwiperSlide className={classes["product-slide"]} key={data.id}>
                    <Image src={data.src} layout="fill" alt="product card" />
            </SwiperSlide>) }
        </Swiper>
    );
};

export default SliderCard;