import { createSlice } from '@reduxjs/toolkit';

export const promotionReducer = createSlice({
  name: 'promotion',
  initialState: {
    isAdd: false,
    isEdit: false,
    isReset: 'reset-page',
    status: 'All',
    sort: undefined,
    promotion: {},
    promotionCheckOut: {
      value: 0,
      name: '',
      id: 0,
    },
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
    setPromotion: (state, action) => {
      state.promotion = { ...action.payload };
    },
    setPromotionCheckOut: (state, action) => {
      state.promotionCheckOut = action.payload;
    },
  },
});

export const { setIsAdd, setIsEdit, setPromotion, setIsReset, setStatus, setSort, setPromotionCheckOut } =
  promotionReducer.actions;

export default promotionReducer.reducer;
