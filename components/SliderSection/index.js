import {useState} from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import { Pagination, Autoplay } from "swiper";

import {addZero} from "../../utils";
import useSize from "../../hooks/useSize";

import itemOne from '../../public/img/slide-1_1.jpg';
import itemTwo from '../../public/img/slide-1.jpg';
import itemThree from '../../public/img/slide-2.jpg';
import itemFour from '../../public/img/slide-3.jpg';
import itemFive from '../../public/img/slide-4.jpg';

import 'swiper/css';
import "swiper/css/pagination";
import classes from './sliderSection.module.scss';


const SliderSection = () => {
    const images = [itemOne, itemTwo, itemThree, itemFour, itemFive];
    const [swiper, setSwiper] = useState({});
    const [target, currentSize] = useSize();
    const {width} = currentSize;
    const pagination = {
        clickable: true,
        type: "bullets",
        bulletActiveClass: 'bullet-item-active',
        bulletClass: "bullet-item",
    };
    const progressbar = {
        clickable: true,
        type: "progressbar",
    };

    return (
        <section ref={target} className='main-slider'>
            {
             width &&
             <Swiper
                onSwiper={setSwiper}
                onAfterInit={swiper => {
                    swiper.pagination.el.setAttribute('data-current', "01" )
                    swiper.pagination.el.setAttribute('data-amount', `${addZero(images.length)}` )
                } }
                onSlideChange={() => swiper.pagination.el.setAttribute('data-current', `${addZero(swiper.activeIndex + 1)}` )}
                modules={[Pagination, Autoplay]}
                spaceBetween={10}
                grabCursor={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={width < 767.9 ? pagination : progressbar}
             >
                {images.map((slide, i) => <SwiperSlide  className={classes["swiper-slide"]} style={{backgroundImage: `url(${slide.src})`}} key={Math.random() + i}/> )}
            </Swiper>
            }
        </section>
    );
};

export default SliderSection;
