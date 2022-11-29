import { createSlice } from '@reduxjs/toolkit';
import React from 'react';

export const categoryReducer = createSlice({
    name: 'category',
    initialState: {
        isAdd: false,
        isEdit: false,
        isReset: 'reset-page',
        status: 'All',
        sort: 'DESC',
        category: {},
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
        setCategory: (state, action) => {

            state.category = { ...action.payload };

        },
    },
});

export const { setIsAdd, setIsEdit, setCategory, setIsReset, setStatus, setSort } = categoryReducer.actions;

export default categoryReducer.reducer;
