import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchPersonalData = createAsyncThunk(
  'personal/fetchPersonalData',
  async (data,{rejectWithValue}) => {
    const [userID, token] = data;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/${userID}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token
          }
        }
      );
      return  await response.data
    } catch (error) {
      return rejectWithValue( error.message )
    }
  }
);

const personalDataSlice = createSlice({
  name: 'personal',
  initialState: {
    personalData: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    status: null,
    error: null
  },
  reducers: {
    logoutUser(state) {
      state.personalData = {}
    }
  },
  extraReducers: {
    [fetchPersonalData.pending]: (state) => {
      state.status = 'loading';
      state.error = null
    },
    [fetchPersonalData.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.personalData = action.payload
    },
    [fetchPersonalData.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload
    }
  }
});

export const { logoutUser } = personalDataSlice.actions;

export default personalDataSlice.reducer;