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
      state.tools = state.tools.map((item, id) =>
        id === action.payload.id ? { ...item, type: action.payload.tool } : item,
      );
    },
    changeImageTool: (state, action) => {
      state.tools = state.tools.map((item, id) =>
        id === action.payload.id ? { ...item, url: action.payload.url } : item,
      );
    },
    deleteTool: (state, action) => {
      state.tools = state.tools.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const {
  setToolType,
  setMenuVisibillity,
  setTools,
  changeTool,
  changeImageTool,
  deleteTool,
} = addReviewSlice.actions;
export default addReviewSlice.reducer;
