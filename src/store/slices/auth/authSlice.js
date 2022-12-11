import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: true,
  isRegister: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload.isLogin;
    },
    setRegister(state, action) {
      state.isRegister = action.payload.isRegister;
    },
  },
});

export const { setLogin, setRegister } = authSlice.actions;
export default authSlice.reducer;
