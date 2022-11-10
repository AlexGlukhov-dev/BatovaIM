import {useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";

import dataPrev from '../../../public/DB/PRODUCT_PREV_DATA.json';

import nextArrow from "../../../public/img/next-arrow.svg";
import prevArrow from "../../../public/img/prev-arrow.svg";
import ProductPrev from "../../ProductPrev";

import 'swiper/css';
import "swiper/css/pagination";
import classes from './adviceSlider.module.scss';
import {useSelector} from "react-redux";


const AdviceSlider = ({width}) => {
    const [swiper, setSwiper] = useState('');
    const {saleGoodsData} = useSelector(state => state.data);
    const pagination = {
        clickable: true,
        type: "bullets",
        bulletActiveClass: 'bullet-item-active',
        bulletClass: "bullet-item"
    };

    if(swiper.pagination) {
        swiper.pagination.el.classList.add(classes['advice-pagination']);
    }

    if(swiper.navigation) {
        swiper.navigation.nextEl.classList.add('arrow-button-next', classes['arrow-button-next']);
        swiper.navigation.prevEl.classList.add('arrow-button-prev', classes['arrow-button-prev']);
        swiper.navigation.nextEl.style.backgroundImage = `url(${nextArrow.src})`;
        swiper.navigation.prevEl.style.backgroundImage = `url(${prevArrow.src})`;
    }

    return (
        <Swiper
            onSwiper={setSwiper}
            modules={[Pagination, Navigation]}
            slidesPerView={3}
            navigation={true}
            pagination={pagination}
            spaceBetween={145}
            grabCursor={true}
            className={classes["advice-slider"]}
            breakpoints={{
                320: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
                768: {
                    slidesPerView: 2 ,
                    spaceBetween: 54,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 160,
                },
                1366: {
                    slidesPerView: 3 ,
                    spaceBetween: 70
                },
            }}
        >
            { saleGoodsData.map(data => <SwiperSlide className={classes["advice-slide"]} key={data.id}>
                <ProductPrev prod={data} width={width}/>
            </SwiperSlide>) }
        </Swiper>
    );
};

export default AdviceSlider;