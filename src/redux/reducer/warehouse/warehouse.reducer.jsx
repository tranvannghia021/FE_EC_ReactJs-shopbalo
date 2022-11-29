import { createSlice } from '@reduxjs/toolkit';

export const warehouseReducer = createSlice({
  name: 'warehouse',
  initialState: {
    key: 0,
    isAdd: false,
    isExport: false,
    warehouse: {},
  },
  reducers: {
    setKey: (state, action) => {
      state.key = action.payload;
    },
    setIsImportStorage: (state, action) => {
      state.isAdd = action.payload;
    },
    setIsExportStorage: (state, action) => {
      state.isExport = action.payload;
    },
    setWareHouse: (state, action) => {
      state.warehouse = action.payload;
    },
  },
});

export const { setIsImportStorage, setWareHouse, setIsExportStorage } = warehouseReducer.actions;

export default warehouseReducer.reducer;
