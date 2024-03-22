import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { string } from "yup";

// Define a type for the slice state
export interface IFilterState {
  candidateName: string;
  testScore: string;
  status:string;
  matchPercent: string;
//   jobCode: string;
}

// Define the initial state using that type
const initialState: IFilterState = {
    candidateName: "",
    testScore: "",
    status:"",
    matchPercent: "",
};

export const candidateFilterByJobPostSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCandidateName: (state, action: PayloadAction<string>) =>{
      state.candidateName = action.payload;
    //   state.company.name = action.payload.name;
    },
    setTestScore: (state, action: PayloadAction<string>) => {
      state.testScore = action.payload;
      console.log(action.payload)
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setMatchPercent: (state, action: PayloadAction<string>) => {
      state.matchPercent = action.payload
    },

    resetFilter: (state) => {
        state.candidateName= "";
        state.testScore= "0";
        state.status="";
        state.matchPercent= "0";
    },
  },
});

export const { resetFilter, setMatchPercent, setCandidateName, setTestScore, setStatus } =
candidateFilterByJobPostSlice.actions;

export default candidateFilterByJobPostSlice.reducer;
