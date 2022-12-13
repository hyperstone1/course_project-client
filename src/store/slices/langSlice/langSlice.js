import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'eng',
};

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.language = action.payload.language;
    },
  },
});

export const { setLang } = langSlice.actions;
export default langSlice.reducer;
