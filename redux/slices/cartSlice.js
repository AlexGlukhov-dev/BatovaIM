import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCartData = createAsyncThunk(
	'cart/fetchCartData',
	async (data, {rejectWithValue}) => {
		const [userID, token] = data;
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/v1/cart/${userID}`,
				{
					headers: {
						"Content-Type": "application/json",
						"x-access-token": token
					}
				}
			);
			const data = await response.data;

			return data;
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
);

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cart: [],
		cartId: '',
		cookieValue: [],
		totalCartSum: 0,
		totalAmount: 0
	},
	reducers: {
		clearCart(state) {
			state.cart = [];
			state.cartId = '';
			state.totalAmount = 0;
			state.totalCartSum = 0;
		},
		addToCart(state, action) {
			state.cart.length > 0 ? (
				state.cart.forEach(item => {
					let checkUid = state.cart.every(item => item._uid !== action.payload._uid);

					if (item._uid !== action.payload._uid && checkUid) {
						state.cart.push(action.payload)
					}
				})
			) : state.cart.push(action.payload);

			// state.cookieValue = keyValuesSum([...state.cookieValue, {id: action.payload.id, amount: action.payload.amount}]);

		},
		removeFromCart(state, action) {
			state.cart = state.cart.filter(cartItem => cartItem._uid !== action.payload)
		},
		addAmount(state, action) {
			state.cart.forEach(item => {
				if (item._uid === action.payload._uid) {
					item.amount += 1;
					item.totalSum = item.amount * item.price;
				}
			});
			state.totalAmount = state.cart.reduce((acc, item) => {
				return acc += item.amount
			}, 0)
		},
		subAmount(state, action) {
			state.cart.forEach(item => {
				if (item._uid === action.payload._uid) {
					item.amount -= 1;
					item.totalSum = item.amount * item.price
				}
			});

			state.totalAmount = state.cart.reduce((acc, item) => {
				return acc += item.amount
			}, 0)
		},
		onChangeAmount(state, action) {
			state.cart.forEach(item => {
				if (item._uid === action.payload.item._uid) {
					item.amount = action.payload.val;
					item.totalSum = item.amount * item.price
				}
			});
		},
		countTotalCartSum(state) {
			state.totalCartSum = state.cart.reduce((acc, item) => {
				return acc += +item.totalSum
			}, 0);

			state.totalAmount = state.cart.reduce((acc, item) => {
				return acc += item.amount
			}, 0)
		}
	},
	extraReducers: {
		[fetchCartData.pending]: (state) => {
			state.status = 'loading';
			state.error = null;
		},
		[fetchCartData.fulfilled]: (state, action) => {
			state.status = 'resolved';
			state.cart = action.payload.items;
			state.cartId = action.payload._id;
			state.totalCartSum = action.payload.totalPrice;
			state.totalAmount = action.payload.totalAmount;
		},
		[fetchCartData.rejected]: (state, action) => {
			state.status = 'rejected';
			state.error = action.payload;
		}
	}
});

export const {addToCart, clearCart, removeFromCart, addAmount, subAmount, onChangeAmount, countTotalCartSum} = cartSlice.actions;

export default cartSlice.reducer;