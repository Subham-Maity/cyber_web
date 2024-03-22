import { ILocation } from "@/types/company";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// interface location  {
// city:string,
// country:string,
// }
// Define a type for the slice state
export interface ICompanyFilterState {
    name: string,
    teamSize: string[],
    location: string[]
}

// Define the initial state using that type
const initialState: ICompanyFilterState = {
    name: "",
    teamSize: [],
    location:[]
};

export const companyFilterSlice = createSlice({
    name: "companyFilter",
    initialState,
    reducers: {
        setTeamSize: (state, action: PayloadAction<string>) => {
            if (state.teamSize.includes(action.payload)) {
                state.teamSize = state.teamSize.filter(ele => ele !== action.payload);
            } else {
                state.teamSize.push(action.payload);
            }
        },

        setName: (state, action: PayloadAction<string>) => {
            if (state.name !== action.payload) {
                state.name = action.payload
            }
        },
        setLocationFilter:(state,action:PayloadAction<string[]>) => {
            state.location = action.payload;
        },

        resetFilter: (state) => {
            state.name = "",
                state.teamSize = [],
                state.location=[]
        },
    },
});

export const {
    setTeamSize,
    setName,
    resetFilter,
    setLocationFilter
} = companyFilterSlice.actions;

export default companyFilterSlice.reducer;
