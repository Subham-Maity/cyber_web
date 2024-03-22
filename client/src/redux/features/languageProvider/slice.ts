import {  createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface languageState {
    languages: string[];
    loading:boolean;
    error:string;
}

const initialState: languageState = {
    languages:[],
    loading:false,
    error:''
}

export const languageSlice = createSlice({
    name:"Language",
    initialState:initialState,
    reducers:{
        fetchLanguageRequest: (state) => {
            state.loading = true;
        },
        fetchLanguageSuccess:(state,action: PayloadAction<string[]>) => {
            state.loading = false;
            state.languages=action.payload;
        },
        fetchLanguageError:(state,action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})

export const {
    fetchLanguageRequest,
    fetchLanguageSuccess,
    fetchLanguageError
} = languageSlice.actions

export default languageSlice.reducer;