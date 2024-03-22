import instance from "@/lib/axios";
import { requestFail, requestStart, requestSuccess, getSubModelSuccess } from "./slice"
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import { IFilterState } from "../filterJobPostSlice";
import { notifyError, notifySuccess } from "@/utils/toast";


export const getCandidateSubModel = async (dispatch: AppDispatch, modelName: string) => {

    dispatch(requestStart());
    try {
        const { data } = await instance(`/template/get?model=${modelName}`);
        dispatch(getSubModelSuccess(data.dynamicTemplate));

    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message))
    }

}

export const updateTemplate = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStart());
    try {
        const { data } = await instance.post(`/template/update`, bodyObj);
        dispatch(requestSuccess());
        notifySuccess("Field added successfully");

    } catch (error) {

        const e = error as AxiosError;
        const response = e.response as any;
        const msg = response.data.message;
        dispatch(requestFail(e.message));
        notifyError(msg);
    }

}