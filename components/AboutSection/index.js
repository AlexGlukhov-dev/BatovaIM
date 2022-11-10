import Link from 'next/link';
import cn from 'classnames';

import BlockTitle from '../BlockTitle';
import Button from '../../UI/Button';
import RoundImage from '../../UI/RoundImage';
import FlowerDecor from '../FlowerDecor';
import {aboutBrand} from '../../content';

import classes from './aboutSection.module.scss';

const AboutSection = () => {
    return (
        <section className={classes["about-wrapper"]}>
            <div className={cn(classes["about"])}>
                <div className="site-container">
                <div className={classes["about__info" ]}>
                    <BlockTitle className={classes["about__info-title"]}>О бренде</BlockTitle>
                    <div className={classes["about__info-text"]}>
                        <p>{aboutBrand}</p>
                    </div>
                    <Button className={classes["about__info-btn"]} direction="horizontal-right" color="light">
                        <Link href='/about' >Подробнее</Link>
                        <svg width="25" height="30" viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.142577 13.2911L0.142577 14.557C0.272277 14.557 8.57303 14.4304 11.8155 6.96202L11.8155 30L13.1125 30L13.1125 6.96202C16.355 14.4304 24.6557 14.557 24.7854 14.557L24.7854 13.2911C24.2666 13.2911 13.1125 13.1646 13.1125 0.126582L11.8155 0.126582C11.8155 13.038 0.661374 13.2911 0.142577 13.2911Z"/>
                        </svg>
                    </Button>
                    <RoundImage className={classes["about__info-img"]} alt="about-img" />
                </div>
                </div>
            </div>
            <FlowerDecor className={classes["about-decor"]} />
        </section>
    );
};

export default AboutSection;