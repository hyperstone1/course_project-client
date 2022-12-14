import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user/userSlice';
import auth from './slices/auth/authSlice';
import filter from './slices/filterSlice/filterSlice';
import header from './slices/headerSlice/headerSlice';
import profile from './slices/profileSlice/profileSlice';

export const store = configureStore({
  reducer: {
    user,
    auth,
    filter,
    header,
    profile,
  },
});
