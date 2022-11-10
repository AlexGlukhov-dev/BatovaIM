import axios from "axios";
import ProductCardWrapper from "../../components/ProductCardWrapper";

const dynamicProductCard = ({data}) => {
    return (
        <ProductCardWrapper card={data}/>
    )
};

export async function getServerSideProps({query}) {
    const response = await axios(`https://api.batova-brand.ru/v1/products/${query.id}`);
    const data = await response.data;

    return { props: { data } }
}

export default dynamicProductCard;