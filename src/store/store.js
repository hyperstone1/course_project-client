import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user/userSlice';
import auth from './slices/auth/authSlice';

export const store = configureStore({
  reducer: {
    user,
    auth,
  },
});
