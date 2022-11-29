import { createSlice } from '@reduxjs/toolkit';


export const roleReducer = createSlice({
  name: 'role',
  initialState: {
    key: 0,
    isAdd: false,
    isEdit: false,
    isReset:'reset-page',
    role: {},
    rolePermission:{}
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
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setRolePermission: (state, action) => {
      state.rolePermission = action.payload;
    },
    setIsReset: (state, action) => {
      state.isReset = action.payload;
    },
  },
});

export const { setIsAdd,setIsEdit, setRole,setIsReset,setRolePermission } = roleReducer.actions;

export default roleReducer.reducer;
