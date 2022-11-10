// import heroBanner from '../../public/img/hero-banner-4.jpg';
import heroBanner from '../../public/img/hero-banner-6.jpg';

import classes from './heroSection.module.scss';
import TopDecor from "../TopDecor";

const HeroSection = () => {
    return (
        <section className={classes["hero"]}>
            <div className={classes["hero-banner"]} style={{backgroundImage: `url(${heroBanner.src})`}}>
                <h1 className={classes["hero-banner__text"]}>
                    С&nbsp;любовью и&nbsp;заботой
                    <span className={classes["hero-banner__text-accent"]}> о&nbsp;детях</span>
                </h1>
            </div>
            <div className={classes["hero-bottom"]}>
            </div>
            <TopDecor />
        </section>
    );
};

export default HeroSection;