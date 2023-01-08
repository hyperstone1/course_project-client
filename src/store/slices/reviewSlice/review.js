import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviewLikes: [],
  userLikes: [],
  typeRating: 'review',
  rating: 0,
  existRating: 0,
  hoverRating: 0,
};

const reviewSlice = createSlice({
  initialState,
  name: 'review',
  reducers: {
    setReviewLikes: (state, action) => {
      state.reviewLikes.push({
        id: action.payload.id,
        likes: action.payload.likes,
      });
    },
    changeReviewLikes: (state, action) => {
      state.reviewLikes = state.reviewLikes.map((item) =>
        item.id === action.payload.id ? { ...item, likes: action.payload.likes } : item,
      );
    },
    setUserLikes: (state, action) => {
      state.userLikes.push({
        idReview: action.payload.id,
      });
    },
    changeUserLikes: (state, action) => {
      const isExist = state.userLikes.filter((item) => item.idReview === action.payload.id);
      console.log('isExist');
      if (isExist.length > 0) {
        state.userLikes = state.userLikes.filter((item) => item.idReview !== action.payload.id);
      } else {
        state.userLikes.push({ idReview: action.payload.id });
      }
    },
    clearLikes: (state) => {
      state.userLikes = [];
      state.reviewLikes = [];
    },
    setRating: (state, action) => {
      state.rating = action.payload.rating;
    },
    setExistRating: (state, action) => {
      state.existRating = action.payload.rating;
    },
    clearExistRating: (state) => {
      state.existRating = 0;
    },
    setHover: (state, action) => {
      state.hoverRating = action.payload;
    },
    clearRating: (state) => {
      state.rating = 0;
    },
    setTypeRating: (state, action) => {
      state.typeRating = action.payload;
    },
  },
});

export const {
  setReviewLikes,
  changeReviewLikes,
  setUserLikes,
  changeUserLikes,
  clearLikes,
  setRating,
  setHover,
  clearRating,
  setExistRating,
  clearExistRating,
  setTypeRating,
} = reviewSlice.actions;
export default reviewSlice.reducer;
