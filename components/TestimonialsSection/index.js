import {useState} from 'react';
import {Pagination, Navigation} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import cn from 'classnames';

import useSize from '../../hooks/useSize';
import TestimonialsItem from './TestimonialsItem';
import SectionTitle from '../SectionTitle';
import Button from '../../UI/Button';
import {testimonialsData} from '../../content';


import nextArrow from '../../public/img/next-arrow.svg';
import prevArrow from '../../public/img/prev-arrow.svg';
import classes from './testimonialsSection.module.scss';
import 'swiper/css';

const TestimonialsSection = () => {
    const [swiper, setSwiper] = useState({});
    const [target, currentSize] = useSize();
    const {width} = currentSize;
    const pagination = {
        clickable: true,
        type: "bullets",
        bulletActiveClass: 'bullet-item-active',
        bulletClass: "bullet-item",
    };

    const text = width > 768 ?  "Все отзывы" : "Еще";

    if(swiper.navigation) {
        swiper.navigation.nextEl.classList.add('arrow-button-next', classes['arrow-button-next']);
        swiper.navigation.prevEl.classList.add('arrow-button-prev', classes['arrow-button-prev']);
        swiper.navigation.nextEl.style.backgroundImage = `url(${nextArrow.src})`;
        swiper.navigation.prevEl.style.backgroundImage = `url(${prevArrow.src})`;
    }

    return (
        <section ref={target} className={classes["testimonials"]}>
            <div className={cn(classes["testimonials__top"], "site-container")}>
                <SectionTitle variant="h2">Отзывы</SectionTitle>
                <Button className={classes["btn"]} variant="outlined" direction="horizontal-right" color="black">
                    <span>{text}</span>
                    <svg width="25" height="30" viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.142577 13.2911L0.142577 14.557C0.272277 14.557 8.57303 14.4304 11.8155 6.96202L11.8155 30L13.1125 30L13.1125 6.96202C16.355 14.4304 24.6557 14.557 24.7854 14.557L24.7854 13.2911C24.2666 13.2911 13.1125 13.1646 13.1125 0.126582L11.8155 0.126582C11.8155 13.038 0.661374 13.2911 0.142577 13.2911Z"/>
                    </svg>
                </Button>
            </div>

            <Swiper
                onSwiper={setSwiper}
                modules={[Pagination, Navigation]}
                spaceBetween={20}
                slidesPerView={"auto"}
                centeredSlides={true}
                navigation={true}
                pagination={pagination}
                className={classes["swiper"]}
                loop={true}
            >
                {testimonialsData.map( item => (
                    <SwiperSlide  className={classes["swiper-slide"]} key={item.id}>
                        <TestimonialsItem key={item.id} item={item} />
                    </SwiperSlide>
                ) )}
            </Swiper>
        </section>
    );
};

export default TestimonialsSection;