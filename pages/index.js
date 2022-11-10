import axios from 'axios';

import HeroSection from '../components/HeroSection';
import ProductSection from '../components/ProductsSection';
import SliderSection from '../components/SliderSection';
import AdvantagesSection from '../components/AdvantagesSection';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import { useLoader } from '../hooks/useLoader';

const Index = ({data=[]}) => {

useLoader();

  return (
        <>
            <HeroSection />
            <ProductSection productsData={data}/>
            <SliderSection />
            <AdvantagesSection />
            <AboutSection />
            <TestimonialsSection />
        </>
    );
};

export async function getServerSideProps() {
  const responseProducts = await axios(`https://api.batova-brand.ru/v1/start`);
  const productsData = await responseProducts.data;

  return { props: { data: productsData } }
}
export default Index;