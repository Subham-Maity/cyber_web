import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICompany } from '@/types/company'

export interface jobPstState {
    company: ICompany | null;
    error: string | null,
    loading: boolean,
    companies: ICompany[]
    page: number,
    totalNumOfPage: number,
    totalCompanies: number,
    companyBeingEdited:string,
   
}
const initialState: jobPstState = {
    company: null,
    loading: false,
    error: null,
    companies: [],
    page: 1,
    totalCompanies: 0,
    totalNumOfPage: 1,
    companyBeingEdited:"",
    
}

type IForGetAllJobPost = {
    companies: ICompany[],
    totalNumOfPage: number,
    totalCompanies: number,
}

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        requestStart: (state) => {
            state.loading = true;
        },
        getCompanySuccess: (state, action: PayloadAction<ICompany>) => {
            state.loading = false;
            state.company = action.payload;
        },

        requestFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        getCompaniesSuccess: (state, action: PayloadAction<IForGetAllJobPost>) => {
            state.loading = false
            state.companies = action.payload.companies;
            state.totalNumOfPage = action.payload.totalNumOfPage;
            state.totalCompanies = action.payload.totalCompanies;
            if (state.page > state.totalNumOfPage) {
                state.page = state.totalNumOfPage > 0 ? state.totalNumOfPage : 1;
            }
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        toggleIsSaved: (state, action: PayloadAction<string>) => {
            state.companies = state.companies.map((company) => {
                if (company._id === action.payload) {
                    return { ...company, isSaved: !company.isSaved }
                } else return company;
            })

        },
        setCompanyBeingEdited:(state,action:PayloadAction<string>) => {
            state.companyBeingEdited=action.payload;
        }

    },
})

export const { requestFail, toggleIsSaved, setPage, requestStart, getCompaniesSuccess, getCompanySuccess, setCompanyBeingEdited } = companySlice.actions

export default companySlice.reducer
