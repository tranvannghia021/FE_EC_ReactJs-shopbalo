import { createSlice } from '@reduxjs/toolkit';


export const homeClientReducer = createSlice({
  name: 'homeClient',
  initialState: {
    key: 0,
    isOpenCartCompact: false,
  },
  reducers: {
    setIsOpenCartCompact: (state, action) => {
      state.isOpenCartCompact = action.payload;
    },
  },
});

export const { setIsOpenCartCompact} = homeClientReducer.actions;

export default homeClientReducer.reducer;
