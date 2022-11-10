import cn from "classnames";
import {useRouter} from 'next/router'

import SectionTitle from "../SectionTitle";
import Button from "../../UI/Button";
import ProductsList from "./ProductsList";
import MainDecor from "../MainDecor";

import classes from './productSection.module.scss';
import Link from "next/link";
import BlockTitle from "../BlockTitle";


const ProductSection = ({productsData}) => {
  const router = useRouter();

    return (
        <section className={cn(classes["products"], "site-container")}>
            <SectionTitle className={classes["products__title"]} variant="h2">
                Наша продукция
            </SectionTitle>
            <ProductsList className={classes["products__list"]} productsData={productsData}/>
          <Link href={'./shop'}>
            <a>
            <Button className={classes["products__btn"]} direction="horizontal-right" color="black">
                <span>Все товары</span>
                <svg width="25" height="30" viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.142577 13.2911L0.142577 14.557C0.272277 14.557 8.57303 14.4304 11.8155 6.96202L11.8155 30L13.1125 30L13.1125 6.96202C16.355 14.4304 24.6557 14.557 24.7854 14.557L24.7854 13.2911C24.2666 13.2911 13.1125 13.1646 13.1125 0.126582L11.8155 0.126582C11.8155 13.038 0.661374 13.2911 0.142577 13.2911Z"/>
                </svg>
            </Button>
            </a>
          </Link>
            <MainDecor className={classes["products__decor"]}/>
        </section>
    );
};

export default ProductSection;