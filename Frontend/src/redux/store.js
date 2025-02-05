// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'; 
import storage from 'redux-persist/lib/storage'; 
import authReducer from './authSlice'; 

const persistConfig = {
  key: 'root', // Key for persistence
  storage, // Use localStorage for persistence
};

// Wrap the auth reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: {
    auth: persistedReducer, // Persist the auth slice
  },
});

// Create the persistor
export const persistor = persistStore(store);

export default store;
