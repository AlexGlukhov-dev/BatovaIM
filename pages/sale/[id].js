import ProductCard from "../../components/ProductCard";
import axios from "axios";

const dynamicProductCard = ({card}) => {
    return (
        <ProductCard card={card}/>
    )
};

export async function getServerSideProps({query}) {
    const response = await axios(`https://api.batova-brand.ru/v1/products/${query.id}`);

    const card = await response.data;

    return { props: { card } }
}
export default dynamicProductCard;