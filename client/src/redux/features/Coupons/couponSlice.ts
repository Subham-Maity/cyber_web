import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICoupon } from "@/types/coupon-type";
export interface InitialState {
    loading: boolean;
    error?: string | null;
    coupons:ICoupon[];
    page:number;
    totalPages:number;
    itemsPerPage:number;
    totalCoupons:number;
    currCouponEdit:string;
}


const initialState: InitialState = {
    loading: false,
    error: null,
    coupons:[],
    page:1,
    totalPages:1,
    itemsPerPage:8,
    totalCoupons:0,
    currCouponEdit:"",
    
}

export const couponSlice = createSlice({
    name: 'couponsSlice',
    initialState,
    reducers: {
        couponRequestStart: (state) => {
            state.loading = true;
        },
        couponRequestFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        couponRequestSuccess:(state) => {
            state.loading=false;
        },
        getAllCouponSuccess:(state,action:PayloadAction<any>) => {
            state.loading = false;
            state.coupons = action.payload.coupons as ICoupon[];
            state.totalCoupons = action.payload.totalCoupons as number;
            state.itemsPerPage = action.payload.itemsPerPage as number;
            state.totalPages = action.payload.totalPages as number;
        },
        setPage:(state,action:PayloadAction<number>) => {
            state.loading=false;
            state.page = action.payload;
        },
        setCurrCouponEdit:(state,action:PayloadAction<string>) => {
            state.loading=false;
            state.currCouponEdit=action.payload;
        },
        setCouponEditSuccess:(state) => {
            state.loading=false;
        },
    }
})

export const {
    couponRequestFail,
    couponRequestStart,
    couponRequestSuccess,
    getAllCouponSuccess,
    setPage,
    setCurrCouponEdit,
    setCouponEditSuccess
} = couponSlice.actions

export default couponSlice.reducer;