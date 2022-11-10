import {productData} from "./data";

const card = (req, res) => {
    const { query: { id } } = req;
    res.json(productData[id-1])
};

export default card;