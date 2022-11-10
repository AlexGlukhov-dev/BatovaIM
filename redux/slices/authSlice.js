import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		auth: {},
	},
		reducers: {
			setAuth(state, action) {
				state.auth = {...action.payload}
			},
			logout(state) {
				state.auth = {}
			}
		}
});

export const {setAuth, logout} = authSlice.actions;

export default authSlice.reducer;