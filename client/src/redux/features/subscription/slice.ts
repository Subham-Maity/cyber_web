import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICandidateSub, IEmployerSub } from '@/types/template';
import { IDiscountCoupon } from '@/types/subscription';

export interface templateState {
    submitCandidateSub: IEmployerSub | null,
    submitEmploySub: IEmployerSub | null,
    employSub: IEmployerSub[],
    candidateSub: ICandidateSub[],
    error: string | null,
    loading: boolean,
    coupon: IDiscountCoupon | null,
}

const initialState: templateState = {
    submitCandidateSub: null,
    submitEmploySub: null,
    employSub: [],
    candidateSub: [],
    error: null,
    loading: false,
    coupon: null,
}

export const subscriptionSlice = createSlice({
    name: 'subscription',
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
        getEmploySubSuccess: (state, action: PayloadAction<IEmployerSub[]>) => {
            state.employSub = action.payload;
            state.loading = false;
            state.error = null;
        },
        getCandidateSubSuccess: (state, action: PayloadAction<ICandidateSub[]>) => {
            state.candidateSub = action.payload;
            state.loading = false;
            state.error = null;
        },
        submitCandidateSubSuccess: (state, action: PayloadAction<ICandidateSub>) => {
            if (state.candidateSub)
                state.candidateSub.push(action.payload)
            state.loading = false;
            state.error = null;
        },
        submitEmploySubSuccess: (state, action: PayloadAction<IEmployerSub>) => {
            if (state.employSub)
                state.employSub.push(action.payload)
            state.loading = false;
            state.error = null;
        },
        valetedCoupon: (state, action: PayloadAction<IDiscountCoupon | null>) => {
            state.coupon = action.payload;
            state.loading = false;
            state.error = null;
        }
    },
})

export const {
    requestFail,
    requestStart,
    requestSuccess,
    getCandidateSubSuccess,
    getEmploySubSuccess,
    submitCandidateSubSuccess,
    submitEmploySubSuccess,
    valetedCoupon

} = subscriptionSlice.actions

export default subscriptionSlice.reducer;
