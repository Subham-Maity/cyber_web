import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface IFilterState {
    location: string[];
    salary: number;
    keyword: string;
    preferredExperience: string[];
    candidateType: string;
}

// Define the initial state using that type
const initialState: IFilterState = {
    location: [],
    salary: -1,
    keyword: "",
    preferredExperience: [],
    candidateType: ""
};

export const candidateFilterSlice = createSlice({
    name: "candidateFilter",
    initialState,
    reducers: {
        setLocationFilter: (state, action: PayloadAction<string[]>) => {
            state.location=action.payload;
        },

        setPreferredExperience: (state, action: PayloadAction<string>) => {
            if (state.preferredExperience.includes(action.payload)) {
                state.preferredExperience = state.preferredExperience.filter((e) => e !== action.payload);
            } else {
                state.preferredExperience.push(action.payload);
            }
        },
        setSalary: (state, action: PayloadAction<number>) => {
            if (state.salary !== action.payload) {
                state.salary = action.payload
            }
        },
        setKeyword: (state, action: PayloadAction<string>) => {
            if (state.keyword !== action.payload) {
                state.keyword = action.payload
            }
        },
        setCandidateType: (state, action: PayloadAction<string>) => {
            if (state.keyword !== action.payload) {
                state.candidateType = action.payload
            }
        },

        resetFilter: (state) => {
            state.location = [],
                state.keyword = "",
                state.salary = -1,
                state.preferredExperience = []
        },
    },
});

export const {

    setLocationFilter,
    setPreferredExperience,
    setSalary,
    setKeyword,
    resetFilter,
    setCandidateType
} = candidateFilterSlice.actions;

export default candidateFilterSlice.reducer;
