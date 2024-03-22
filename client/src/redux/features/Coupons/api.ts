import instance from "@/lib/axios";
import { AppDispatch } from "@/redux/store";
import { ICoupon } from "@/types/coupon-type";
import { couponRequestFail, couponRequestStart, couponRequestSuccess, getAllCouponSuccess, setCouponEditSuccess } from "./couponSlice";
import { AxiosError } from "axios";
import { notifyError, notifySuccess } from "@/utils/toast";

export const createCoupon = async(dispatch:AppDispatch,bodyObj:any) => {
    dispatch(couponRequestStart())
    try {
        const data = await instance.post(`/coupon/create`,bodyObj);
        dispatch(couponRequestSuccess());
        notifySuccess("Coupon Created Successfully")
    } catch (error) {
        const e = error as AxiosError
        dispatch(couponRequestFail(e.message))
        notifyError("Coupon formation failed")
    }
}   

export const getAllCoupons = async (dispatch:AppDispatch,page:number) => {
    dispatch(couponRequestStart());
    try {
        const data = await instance.get(`/coupon/getAll?page=${page}`);
        console.log(data)
        dispatch(getAllCouponSuccess(data.data)); 
        // notifySuccess("Coupon Created Successfully")
    } catch (error) {
        const e = error as AxiosError
        dispatch(couponRequestFail(e.message))
        notifyError("Fetch Failed")
    }
}

export const updateCoupon = async (dispatch:AppDispatch,bodyObj:any) => {
    dispatch(couponRequestStart());
    try {
        const data = await instance.patch(`/coupon/edit/${bodyObj._id}`,bodyObj);
        dispatch(setCouponEditSuccess());
        notifySuccess("Coupon updated successfully");
    } catch (error) {
        const e = error as AxiosError
        dispatch(couponRequestFail(e.message))
        notifyError("Coupon update failed");
    }
}