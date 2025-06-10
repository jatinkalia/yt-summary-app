// client/src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import summaryReducer from '../features/summary/summarySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    summary: summaryReducer
  }
});


export default store;