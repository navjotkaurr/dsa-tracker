// ✅ FIXED store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './src/slice/apiSlice';
import authReducer from './src/slice/authSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer, // ✅ should be inside the reducer object
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
