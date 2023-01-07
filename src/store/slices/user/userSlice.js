import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  token: '',
  id: '',
  url: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
    setUrl: (state, action) => {
      state.url = action.payload.url;
    },
  },
});

export const { setUser, removeUser, setUrl } = userSlice.actions;
export default userSlice.reducer;
