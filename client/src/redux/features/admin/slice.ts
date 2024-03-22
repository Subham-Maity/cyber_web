import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  ICandidateForAdmin,
  ICompanyForAdmin,
  IEmployerForAdmin,
} from "@/types/for-admin-type";
import type { IAdmin } from "@/types/user-type";

export interface InitialState {
  currAdmin: IAdmin | null;
  candidatesFA: ICandidateForAdmin[];
  pageFC: number;
  totalNumOfPageFC: number;
  totalCandidate: number;
  error: string | null;
  loading: boolean;
  employerFA: IEmployerForAdmin[];
  pageFE: number;
  totalNumOfPageFE: number;
  totalEmployer: number;
  companyFA: ICompanyForAdmin[];
  pageFCom: number;
  totalNumOfPageFCom: number;
  totalCompany: number;
}
type IForGetAllCandidate = {
  candidatesFA: ICandidateForAdmin[];
  totalNumOfPageFC: number;
  totalCandidate: number;
};
type IForGetAllEmployer = {
  employerFA: IEmployerForAdmin[];
  totalNumOfPageFE: number;
  totalEmployer: number;
};
type IForGetAllCompany = {
  companyFA: ICompanyForAdmin[];
  totalNumOfPageFCom: number;
  totalCompany: number;
};

const initialState: InitialState = {
  currAdmin: null,
  candidatesFA: [],
  error: null,
  loading: false,
  pageFC: 1,
  totalNumOfPageFC: 1,
  totalCandidate: 0,
  employerFA: [],
  pageFE: 1,
  totalNumOfPageFE: 1,
  totalEmployer: 0,
  companyFA: [],
  pageFCom: 1,
  totalNumOfPageFCom: 1,
  totalCompany: 0,
};

export const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    requestStart: (state) => {
      state.loading = true;
    },
    requestFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCandidateSuccess: (
      state,
      action: PayloadAction<IForGetAllCandidate>
    ) => {
      state.loading = false;
      state.candidatesFA = action.payload.candidatesFA;
      state.totalNumOfPageFC = action.payload.totalNumOfPageFC;
      state.totalCandidate = action.payload.totalCandidate;
    },
    getEmployerSuccess: (state, action: PayloadAction<IForGetAllEmployer>) => {
      state.loading = false;
      state.employerFA = action.payload.employerFA;
      state.totalNumOfPageFE = action.payload.totalNumOfPageFE;
      state.totalEmployer = action.payload.totalEmployer;
    },
    getCompanySuccess: (state, action: PayloadAction<IForGetAllCompany>) => {
      state.loading = false;
      state.companyFA = action.payload.companyFA;
      state.totalNumOfPageFCom = action.payload.totalNumOfPageFCom;
      state.totalCompany = action.payload.totalCompany;
    },
    getCurrAdminSuccess: (state, action: PayloadAction<IAdmin>) => {
      state.currAdmin = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pageFCom = action.payload;
      state.pageFC = action.payload;
      state.pageFE = action.payload;
    },
    companyUpdateSuccess: (state, action: PayloadAction<ICompanyForAdmin>) => {
      state.loading = false;
        state.companyFA = state.companyFA.map((company) => {
          if(company._id === action.payload._id){
            return action.payload;
          }else{
            return company;
          }
        });
      
    },
  },
});

export const {
  requestStart,
  requestFail,
  getCandidateSuccess,
  getEmployerSuccess,
  getCompanySuccess,
  getCurrAdminSuccess,
  setPage,
  companyUpdateSuccess,
} = adminSlice.actions;

export default adminSlice.reducer;
