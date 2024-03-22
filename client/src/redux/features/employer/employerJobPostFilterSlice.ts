import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { string } from "yup";

// Define a type for the slice state
export interface IFilterState {
  status: string;
  companyId: string;
  company:{name:string,companyId:string}
  title: string;
  jobCode: string;
}

// Define the initial state using that type
const initialState: IFilterState = {
  status: "active",
  companyId: "",
  company:{name:"",companyId:""},
  title: "",
  jobCode: "",
};

export const employerJobPostFilterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCompanyId: (state, action: PayloadAction<{companyId: string,name: string}>) =>{
      state.company.companyId = action.payload.companyId;
      state.company.name = action.payload.name;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
      console.log(action.payload)
    },
    setJobCode: (state, action: PayloadAction<string>) => {
      state.jobCode = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      if(state.status===action.payload){
        state.status = "";
      }else{
        state.status = action.payload;

      }
    },

    resetFilter: (state) => {
      state.status = "";
      state.company.companyId = "";
      state.company.name = "";
      state.jobCode = "";
      state.title = "";
    },
  },
});

export const { resetFilter, setStatus, setCompanyId, setTitle, setJobCode } =
employerJobPostFilterSlice.actions;

export default employerJobPostFilterSlice.reducer;
