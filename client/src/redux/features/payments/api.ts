import instance from "@/lib/axios";
import { AppDispatch } from "@/redux/store";
import { notifyError } from "@/utils/toast";
import { AxiosError } from "axios";
import { getAllPaymentSuccess, paymentRequestFail, paymentRequestStart } from "./Slice";

export const getAllPayments = async (dispatch:AppDispatch,page:number,productModel:string) => {
    dispatch(paymentRequestStart());
    try {
        const data = await instance.get(`/payment/get?page=${page}&productModel=${productModel}`);
        console.log(data)
        dispatch(getAllPaymentSuccess(data.data)); 
        // notifySuccess("Coupon Created Successfully")
    } catch (error) {
        const e = error as AxiosError
        dispatch(paymentRequestFail(e.message))
        notifyError("Fetch Failed")
    }
}