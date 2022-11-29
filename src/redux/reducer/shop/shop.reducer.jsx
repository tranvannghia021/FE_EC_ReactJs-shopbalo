import { createSlice } from '@reduxjs/toolkit';

export const shopClientReducer = createSlice({
  name: 'shopClient',
  initialState: {
    categoryId: undefined,
    fillterPriceStart: undefined,
    fillterPriceEnd: undefined,
    search: undefined,
    sortPrice: 'desc',
  },
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setFillterPriceStart: (state, action) => {
      state.fillterPriceStart = action.payload;
    },
    setFillterPriceEnd: (state, action) => {
      state.fillterPriceEnd = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSort: (state, action) => {
      state.sortPrice = action.payload;
    }
  },
});

export const { setCategoryId, setFillterPriceStart, setFillterPriceEnd, setSearch, setSort } = shopClientReducer.actions;

export default shopClientReducer.reducer;
