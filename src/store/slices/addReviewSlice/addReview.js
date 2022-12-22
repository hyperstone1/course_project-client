import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toolType: 'text',
  menuVisibillity: 'false',
  tools: [],
};

const addReviewSlice = createSlice({
  initialState,
  name: 'addReview',
  reducers: {
    setToolType: (state, action) => {
      state.toolType = action.payload.toolType;
    },
    setMenuVisibillity: (state, action) => {
      state.menuVisibillity = action.payload.menuVisibillity;
    },
    setTools: (state, action) => {
      state.tools.push(action.payload);
    },
    changeTool: (state, action) => {
      state.tools[action.payload.id] = action.payload.tool;
    },
    deleteTool: (state, action) => {
      state.tools = state.tools.filter((_, id) => id !== action.payload.id);
    },
  },
});

export const { setToolType, setMenuVisibillity, setTools, changeTool, deleteTool } =
  addReviewSlice.actions;
export default addReviewSlice.reducer;
