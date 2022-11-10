import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {getUniqueArrItems} from "../../utils";

export const fetchFavoritesFromServer = createAsyncThunk(
	'personalData/fetchFavoritesFromServer',
	async (userID, {rejectWithValue}) => {
		const url = `https://api.batova-brand.ru/v1/user/like/${userID}`;

		try {
			const response = await axios.get(
				url,
				{
					headers: {
						"Content-Type": "application/json",
					}
				}
			);

			return await response.data;
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
);

export const fetchOrdersHistory = createAsyncThunk(
	'personalData/fetchOrdersHistory',
	async (userID, {rejectWithValue}) => {
		try {
			const response = await axios(`https://api.batova-brand.ru/v1/cart/history/${userID}`);

			return await response.data;

		} catch(err) {
			console.error(err)
		}
	}
);

const personalCabinetSlice = createSlice({
	name: 'personalData',
	initialState: {
		personalCabinetData: [
			{
				title: "История заказов",
				ordersHistory: []
			},
			{
				title: "Избранное",
				favoritesData: []
			},
			{
				title: "Личные данные",
				personalData: {
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					region: '',
					zipcode: '',
					city: '',
					street: '',
					currentPwd: '',
					confirmPwd: '',
					newPwd: ''
				}
			}
		],
	},

	reducers: {
		addToFavorites(state, action) {
			// console.log('Fav', action.payload);
			const flag = state.personalCabinetData[1].favoritesData.some(item => item.id === action.payload.id);
			!flag && state.personalCabinetData[1].favoritesData.push(action.payload);
		},
		removeToFavorites(state, action) {
			state.personalCabinetData[1].favoritesData = state.personalCabinetData[1].favoritesData.filter(prod => prod.id !== action.payload);
		},
		updateUserData(state, action) {
			state.personalCabinetData[2].personalData.email = action.payload;
		},
		removeAllFromFavorites(state) {
			state.personalCabinetData[1].favoritesData = [];
		},
		removeOrdersHistory(state) {
			state.personalCabinetData[0].ordersHistory = [];
		}
	},
	extraReducers: {
		[fetchFavoritesFromServer.pending]: (state) => {
			state.status = 'loading';
			state.error = null;
		},
		[fetchFavoritesFromServer.fulfilled]: (state, action) => {
			state.status = 'resolved';
			// console.log(action.payload)
			// state.personalCabinetData[1].favoritesData.concat(action.payload);
			// console.log( state.personalCabinetData[1].favoritesData.concat(action.payload))
			// console.log(state.personalCabinetData[1].favoritesData.push(...action.payload))
			// state.personalCabinetData[1].favoritesData.push(...action.payload);
			// state.personalCabinetData[1].favoritesData = action.payload;

			state.personalCabinetData[1].favoritesData = getUniqueArrItems(state.personalCabinetData[1].favoritesData.concat(action.payload), 'id');
		},
		[fetchFavoritesFromServer.rejected]: (state, action) => {
			state.status = 'rejected';
			state.error = action.payload;
		},
		[fetchOrdersHistory.fulfilled]: (state, action) => {
			state.personalCabinetData[0].ordersHistory = action.payload;
		}
	}
});

export const {addToFavorites, removeToFavorites, removeAllFromFavorites, removeOrdersHistory, updateUserData} = personalCabinetSlice.actions;

export default personalCabinetSlice.reducer;