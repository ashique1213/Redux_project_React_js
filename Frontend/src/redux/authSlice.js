// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/signup/';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    userName: null,
    userEmail: null,
    is_admin:false,
    error: null,
  },
  reducers: {
      signupSuccess: (state, action) => {
      state.userId = action.payload.id;
      state.userName = action.payload.username;
      state.userEmail = action.payload.email;
      state.is_admin = action.payload.is_admin;  
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.error = action.payload.error;
    },
    signOut: (state, action) => {
        state.userId = null;
        state.userName = null;
        state.userEmail = null;
        state.is_admin = false;
        state.error = null;
    },
  },
});

export const { signupSuccess, signupFailure ,signOut,adding } = authSlice.actions;

export const signupUser = (username, email, password, password2) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, { username, email, password, password2 });
    dispatch(signupSuccess(response.data));
  } catch (error) {
    dispatch(signupFailure({ error: error.response?.data?.detail || 'An error occurred' }));
  }
};

export default authSlice.reducer;
