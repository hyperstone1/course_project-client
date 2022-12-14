import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'eng',
  theme: 'light',
};

const headerSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.language = action.payload.language;
    },
    setTheme: (state, action) => {
      state.theme = action.payload.theme;
    },
  },
});

export const { setLang,setTheme } = headerSlice.actions;
export default headerSlice.reducer;
