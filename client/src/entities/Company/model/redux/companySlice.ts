import type { CompanyState } from "../types/companyTypes";
import { createSlice } from '@reduxjs/toolkit';
import { getCompany } from "./companyThanks";

const initialState: CompanyState = {
    companys: [],
    loading: false,
    error: null,
};

const companySlise = createSlice ({
    name: 'company',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCompany.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.companys = action.payload;
        })
        .addCase(getCompany.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
})

export default companySlise.reducer;