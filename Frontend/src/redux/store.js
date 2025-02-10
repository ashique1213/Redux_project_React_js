import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'; 
import storage from 'redux-persist/lib/storage'; 
import authReducer from './authSlice'; 

const persistConfig = {
  key: 'auth', 
  storage, 
};

// Wrap the auth reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  }, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ // Directly from configureStore
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore persist actions
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);

export default store;
