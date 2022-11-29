import { createSlice } from '@reduxjs/toolkit';

export const profileReducer = createSlice({
  name: 'profile',
  initialState: {
    key: 0,
    isEdit: false,
    profile: {},
  },
  reducers: {
    setKey: (state, action) => {
      state.key = action.payload;
    },
    setIsEditProfile: (state, action) => {
      state.isEdit = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setIsEditProfile, setProfile } = profileReducer.actions;

export default profileReducer.reducer;
