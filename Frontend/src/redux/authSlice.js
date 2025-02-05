// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/signup/';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    signupSuccess: (state, action) => {
      state.user = action.payload.user;
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

export const { signupSuccess, signupFailure } = authSlice.actions;

export const signupUser = (username, email, password, password2) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, { username, email, password, password2 });
    dispatch(signupSuccess({ user: response.data }));
  } catch (error) {
    dispatch(signupFailure({ error: error.response?.data?.detail || 'An error occurred' }));
  }
};

export default authSlice.reducer;
