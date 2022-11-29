import { createSlice } from '@reduxjs/toolkit';

export const reviewReducer = createSlice({
  name: 'review',
  initialState: {
    isAdd: false,
    isEdit: false,
    isReset: 'reset-page',
    status: 'all',
    sort: 'asc',
    review: {},
  },
  reducers: {
    setIsAdd: (state, action) => {
      state.isAdd = action.payload;
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setIsReset: (state, action) => {
      state.isReset = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setReview: (state, action) => {
      state.review = { ...action.payload };
    },
  },
});

export const { setIsAdd, setIsEdit, setIsReset,setSort,setStatus, setReview } = reviewReducer.actions;
export default reviewReducer.reducer;
