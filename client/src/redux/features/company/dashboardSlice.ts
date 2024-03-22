import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICompany } from '@/types/company'

export interface jobPstState {
    submittedCompany: ICompany | null;
    error: string | null,
    loading: boolean,
    companies: ICompany[]
}
const initialState: jobPstState = {
    submittedCompany: null,
    loading: false,
    error: null,
    companies: [],
}

export const companyDashboardSlice = createSlice({
    name: 'companyDashboard',
    initialState,
    reducers: {
        submitRequestStart: (state) => {
            state.loading = true;
        },
        submitCompanySuccess: (state, action: PayloadAction<ICompany>) => {
            state.loading = false;
            state.submittedCompany = action.payload;
        },
        submitRequestFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateLogo: (state, action: PayloadAction<string>) => {
            if (state.submittedCompany) state.submittedCompany.logo = action.payload;
        },
    },
})

export const { submitRequestStart, submitRequestFail, submitCompanySuccess, updateLogo } = companyDashboardSlice.actions;
export default companyDashboardSlice.reducer
