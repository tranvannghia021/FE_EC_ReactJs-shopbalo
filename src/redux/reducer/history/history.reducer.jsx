import { createSlice } from '@reduxjs/toolkit';

export const historyReducer = createSlice({
  name: 'history',
  initialState: {
    key: 0,
    isDetailHistory: false,
    orderDetailById: {},
  },
  reducers: {
    setIsDetailHistory: (state, action) => {
      state.isDetailHistory = action.payload;
    },
    setOrderDetailHistory: (state, action) => {
      state.orderDetailById = action.payload;
    },
  },
});
export const { setIsDetailHistory, setOrderDetailHistory } = historyReducer.actions;
export default historyReducer.reducer;
