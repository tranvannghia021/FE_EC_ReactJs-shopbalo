import { createSlice } from '@reduxjs/toolkit';

export const sliderReducer = createSlice({
  name: 'slider',
  initialState: {
    isAdd: false,
    isEdit: false,
    isReset: 'reset-page',
    status: 'All',
    sort: 'desc',
    slider: {},
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
    setSlider: (state, action) => {
      state.slider = { ...action.payload };
    },
  },
});

export const { setIsAdd, setIsEdit, setIsReset, setStatus, setSort, setSlider } = sliderReducer.actions;

export default sliderReducer.reducer;
