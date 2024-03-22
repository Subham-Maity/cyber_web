import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICandidateSub } from '@/types/template';

export interface templateState {
    subscriptionModel: ICandidateSub | null;
    error: string | null,
    loading: boolean,
}

const initialState: templateState = {
    subscriptionModel: null,
    error: null,
    loading: false,
}

export const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {

        requestStart: (state) => {
            state.loading = true;
        },
        requestFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;

        },
        requestSuccess: (state) => {
            state.loading = false;
        },
        getSubModelSuccess: (state, action: PayloadAction<ICandidateSub>) => {
            state.subscriptionModel = action.payload;
            state.loading = false;
            state.error = null;
        }

    },
})

export const {

    requestFail,
    requestStart,
    requestSuccess,
    getSubModelSuccess

} = templateSlice.actions

export default templateSlice.reducer;
