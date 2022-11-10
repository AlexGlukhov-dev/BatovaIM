import {createSlice} from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: 'data',
    initialState: {
        categoriesData: [],
        saleGoodsData: [],
        filteredData: [],
    },

    reducers: {
        createState(state, action) {
          state.saleGoodsData = action.payload;
        },
        setCategories(state, action) {
            state.categoriesData = action.payload;
        },
        filterProducts(state, action) {
            state.filteredData = state.saleGoodsData.filter(data => data.category === action.payload)
        },
        sortedPriceAsc(state) {
           state.saleGoodsData = state.saleGoodsData.sort((a, b) => a.price - b.price);
        },
        sortedPriceDesc(state) {
           state.saleGoodsData = state.saleGoodsData.sort((a, b) => b.price - a.price);
        },
        filteredDataLiked(state, action) {
            state.saleGoodsData.forEach(product => {
                if(product.id === action.payload){
                    product.liked ? product.liked = false  : product.liked = true
                }
            })
        },
        removeLikes(state) {
            state.saleGoodsData.forEach(product => {
                product.liked = false;
            })
        }
    }
});

export const { filterProducts, sortedPriceAsc, sortedPriceDesc, filteredDataLiked, removeLikes, createState, setCategories } = productsSlice.actions;

export default productsSlice.reducer;