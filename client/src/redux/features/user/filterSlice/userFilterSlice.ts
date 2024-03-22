import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { string } from "yup";

// Define a type for the slice state
export interface IFilterState {
  candidateName: string;
  testScore: string;
  status:string;
  matchPercent: string;
  type:string;
  date:Date|null;
//   jobCode: string;
}

// Define the initial state using that type
const initialState: IFilterState = {
    candidateName: "",
    testScore: "",
    status:"",
    matchPercent: "",
    type:"",
    date:null,
};

export const userFilterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCandidateName: (state, action: PayloadAction<string>) =>{
      state.candidateName = action.payload;
    //   state.company.name = action.payload.name;
    },
    setType : (state,action:PayloadAction<string>) =>{
        state.type = action.payload;
    },
    setDate:(state,action:PayloadAction<Date>) =>{
      state.date = action.payload;
    },

    resetFilter: (state) => {
        state.candidateName= "";
        state.type="";
        state.date=null;
    },
  },
});

export const { resetFilter,  setCandidateName,setType,setDate} =
userFilterSlice.actions;

export default userFilterSlice.reducer;
