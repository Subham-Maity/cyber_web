import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICoupon } from "@/types/coupon-type";
export interface InitialState {
  loading: boolean;
  error?: string | null;
  payments: any[];
  totalPayments:number;
  totalPages:number;
  page: number;
  productModel:string;
}

const initialState: InitialState = {
  loading: false,
  error: null,
  payments: [],
  page: 1,
  totalPayments:0,
  totalPages:0,
  productModel:"CandidateSub"
};

export const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState,
  reducers: {
    paymentRequestStart: (state) => {
      state.loading = true;
    },
    paymentRequestFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    getAllPaymentSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.payments = action.payload.payments;
      state.totalPages = action.payload.totalPages;
      state.totalPayments = action.payload.totalPayments;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.page = action.payload;
    },
    setProductModel:(state,action:PayloadAction<string>) => {
      state.loading = false;
      state.productModel = action.payload;
    },
  },
});

export const {
  paymentRequestStart,
  paymentRequestFail,
  getAllPaymentSuccess,
  setPage,
  setProductModel
} = paymentSlice.actions;

export default paymentSlice.reducer;
