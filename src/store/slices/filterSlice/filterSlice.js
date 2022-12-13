import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterValue: 'movies',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filterValue = action.payload.filterValue;
    },
  },
});

export const {setFilter} = filterSlice.actions
export default filterSlice.reducer;
