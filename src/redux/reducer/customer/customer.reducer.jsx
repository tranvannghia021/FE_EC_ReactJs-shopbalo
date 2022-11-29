import { createSlice } from '@reduxjs/toolkit';


export const customerReducer = createSlice({
  name: 'customer',
  initialState: {
    key: 0,
    isAdd: false,
    isEdit: false,
    isReset: 'reset-page',
    customer: {},
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
    setIsReset: (state, action) => {
      state.isReset = action.payload;
    },
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
  },
});

export const { setIsAdd,setIsEdit, setCustomer,setIsReset } = customerReducer.actions;

export default customerReducer.reducer;
