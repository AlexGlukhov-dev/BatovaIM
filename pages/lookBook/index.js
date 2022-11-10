import classes from "./lookbook.module.scss";
import cn from "classnames";
import SectionTitle from "../../components/SectionTitle";
import TopDecor from "../../components/TopDecor";
import Image from "next/image";
import lookbook1 from "../../public/img/lookbook/lookbook-1_1.jpg";
import lookbook2 from "../../public/img/lookbook/lookbook-2_1.jpg";
import lookbook3 from "../../public/img/lookbook/lookbook-3.jpg";
import lookbook4 from "../../public/img/lookbook/lookbook-4.jpg";
import lookbook5 from "../../public/img/lookbook/lookbook-5.jpg";
import lookbook6 from "../../public/img/lookbook/lookbook-6_1.jpg";
import lookbook7 from "../../public/img/lookbook/lookbook-7_1.jpg";
import lookbook8 from "../../public/img/lookbook/lookbook-8.jpg";
import lookbook9 from "../../public/img/lookbook/lookbook-9.jpg";
import lookbook10 from "../../public/img/lookbook/lookbook-11_1.jpg";
import lookbook11 from "../../public/img/lookbook/lookbook-11.jpg";
import lookbook12 from "../../public/img/lookbook/lookbook-12_1.jpg";
import lookbook13 from "../../public/img/lookbook/lookbook-13.jpg";
import lookbook14 from "../../public/img/lookbook/lookbook-14.jpg";
import lookbook15 from "../../public/img/lookbook/lookbook-15.jpg";
import lookbook16 from "../../public/img/lookbook/lookbook-16.jpg";
import lookbook18 from "../../public/img/lookbook/lookbook-18_1.jpg";
import lookbook20 from "../../public/img/lookbook/lookbook-20_1.jpg";
import lookbook21 from "../../public/img/lookbook/lookbook-21-2.jpg";
import lookbook22 from "../../public/img/lookbook/lookbook-22_1.jpg";
import { MetaHead } from "../../components/MetaHead";
import { useLoader } from '../../hooks/useLoader';

const LookBook = () => {
  useLoader();

    return (<>
        <MetaHead
          title="LookBook бренда Batova"
          description='фото популярных моделей детской одежды бренда "Батова"'
        />
        <main className={cn(classes["lookbook"], "site-container")}>
            <div className={classes["lookbook__top"]}>
                <TopDecor className={classes["lookbook__top-decor"]}/>
                <SectionTitle className={classes["lookbook__top-title"]}>Лукбук</SectionTitle>
            </div>
          <div className = {classes["lookbook-grid"]}>
            <div className = {cn(classes["lookbook-grid__item"], classes["lookbook-grid__item--horbig"])}><Image src={lookbook3} layout="fill" alt="lookbook image"/></div>
            <div className ={cn(classes["lookbook-grid__item"])}><Image src={lookbook2} layout="fill" alt="lookbook image"/></div>
            <div className={cn(classes["lookbook-grid__item"])}><Image src={lookbook8} layout="fill" alt="lookbook image"/></div>
            <div className={cn(classes["lookbook-grid__item"], classes["lookbook-grid__item--horbig"])}><Image src={lookbook1} layout="fill" alt="lookbook image"/></div>
            <div className={cn(classes["lookbook-grid__item"], classes["lookbook-grid__item--vertbig"])}><Image src={lookbook6} layout="fill" alt="lookbook image"/></div>
            <div className={cn(classes["lookbook-grid__item"])}><Image src={lookbook5} layout="fill" alt="lookbook image"/></div>
            <div className={cn(classes["lookbook-grid__item"])}><Image src={lookbook4} layout="fill" alt="lookbook image"/></div>
            <div className={cn(classes["lookbook-grid__item"], classes["lookbook-grid__item--horbig"])}><Image src={lookbook7} layout="fill" alt="lookbook image"/></div>
            <div className = {cn(classes["lookbook-grid__item"], classes["lookbook-grid__item--horbig"])}><Image src={lookbook9} layout="fill" alt="lookbook image"/></div>
            <div className ={cn(classes["lookbook-grid__item"])}><Image src={lookbook10} layout="fill" alt="lookbook image"/></div>
            <div className={cn(classes["lookbook-grid__item"])}><Image src={lookbook12} layout="fill" alt="lookbook image"/></div>
            <div className={cn(classes["lookbook-grid__item"], classes["lookbook-grid__item--horbig"])}><Image src={lookbook11} layout="fill" alt="lookbook image"/></div>
            <div className={cn(classes["lookbook-grid__item"], classes["lookbook-grid__item--vertbig"])}><Image src={lookbook18} layout="fill" alt="lookbook image"/></div>
            <div className={cn(classes["lookbook-grid__item"])}><Image src={lookbook14} layout="fill" alt="lookbook image"/></div>
            <div className={cn(classes["lookbook-grid__item"])}><Image src={lookbook15} layout="fill" alt="lookbook image"/></div>
            <div className={cn(classes["lookbook-grid__item"], classes["lookbook-grid__item--horbig"])}><Image src={lookbook16} layout="fill" alt="lookbook image"/></div>
            <div className = {cn(classes["lookbook-grid__item"], classes["lookbook-grid__item--horbig"])}><Image src={lookbook20} layout="fill" alt="lookbook image"/></div>
            <div className ={cn(classes["lookbook-grid__item"])}><Image src={lookbook21} layout="fill" alt="lookbook image"/></div>
            <div className={cn(classes["lookbook-grid__item"])}><Image src={lookbook22} layout="fill" alt="lookbook image"/></div>
            <div className={cn(classes["lookbook-grid__item"], classes["lookbook-grid__item--horbig"])}><Image src={lookbook13} layout="fill" alt="lookbook image"/></div>
          </div>
        </main>
      </>
    );
};

export default LookBook;