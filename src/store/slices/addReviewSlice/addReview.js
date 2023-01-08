import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toolType: 'text',
  menuVisibillity: 'false',
  tools: [],
  headers: [],
  texts: [],
  counterId: 0,
  rating: 0,
};

const addReviewSlice = createSlice({
  initialState,
  name: 'addReview',
  reducers: {
    setCounterId: (state, action) => {
      if (action.payload) {
        state.counterId = state.tools.length;
      } else {
        state.counterId = state.counterId + 1;
      }
    },
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
      state.tools = state.tools.map((item) =>
        item.id === action.payload.id ? { ...item, type: action.payload.tool } : item,
      );
      console.log(action.payload.tool);
    },
    changeImageTool: (state, action) => {
      state.tools = state.tools.map((item) =>
        item.id === action.payload.id ? { ...item, url: action.payload.url } : item,
      );
    },
    deleteTool: (state, action) => {
      state.tools = state.tools.filter((item) => item.id !== action.payload.id);
      state.tools = state.tools.filter((item) =>
        item.id > action.payload.id ? { ...item, id: item.id-- } : item,
      );
    },
    addHeaders: (state, action) => {
      state.headers.push({
        id: action.payload.id,
        header: action.payload.header,
      });
    },
    editHeader: (state, action) => {
      state.headers = state.headers.map((item) =>
        item.id === action.payload.id ? { ...item, header: action.payload.header } : item,
      );
    },
    deleteHeader: (state, action) => {
      state.headers = state.headers.filter((item) => item.id !== action.payload.id);
    },
    addText: (state, action) => {
      state.texts.push({
        id: action.payload.id,
        text: action.payload.text,
      });
    },
    editText: (state, action) => {
      state.texts = state.texts.map((item) =>
        item.id === action.payload.id ? { ...item, text: action.payload.text } : item,
      );
    },
    deleteUrlImage: (state, action) => {
      state.tools.map((item) =>
        item.id === action.payload.id ? Reflect.deleteProperty(item, 'url') : item,
      );
    },
    deleteText: (state, action) => {
      state.texts = state.texts.filter((item) => item.id !== action.payload.id);
    },
    setRating: (state, action) => {
      state.rating = action.payload.rating;
    },
    clearReviewState: (state) => {
      state.tools = [];
      state.headers = [];
      state.texts = [];
      state.counterId = 0;
      state.rating = 0;
    },
  },
});

export const {
  setCounterId,
  setToolType,
  setMenuVisibillity,
  setTools,
  changeTool,
  changeImageTool,
  deleteTool,
  addHeaders,
  editHeader,
  deleteHeader,
  addText,
  editText,
  deleteUrlImage,
  deleteText,
  setRating,
  clearReviewState,
} = addReviewSlice.actions;
export default addReviewSlice.reducer;
