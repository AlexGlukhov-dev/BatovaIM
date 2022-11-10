import {createSlice} from '@reduxjs/toolkit';

const registrationSlice = createSlice({
	name: 'registration',
	initialState: {
		registration: {}
	},
		reducers: {
			setRegistration(state, action) {
				state.registration = {...action.payload}
			},
		}
});

export const {setRegistration} = registrationSlice.actions;

export default registrationSlice.reducer;