import { createSlice } from '@reduxjs/toolkit';

export const orderReducer = createSlice({
  name: 'order',
  initialState: {
    key: 0,
    isAdd: false,
    isEdit: false,
    isDetail: false,
    orderById: {},
    orderDetailById: {},
  },
  reducers: {
    setKey: (state, action) => {
      state.key = action.payload;
    },
    setIsAdd: (state, action) => {
      state.isAdd = action.payload;
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setIsDetail: (state, action) => {
      state.isDetail = action.payload;
    },
    setOrder: (state, action) => {
      state.orderById = action.payload;
    },
    setOrderDetail: (state, action) => {
      state.orderDetailById = action.payload;
    },
  },
});
export const { setIsEdit, setOrder, setIsDetail, setOrderDetail, setIsAdd } = orderReducer.actions;
export default orderReducer.reducer;
