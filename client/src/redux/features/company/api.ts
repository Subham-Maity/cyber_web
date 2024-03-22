import instance from "@/lib/axios";
import { getCompanySuccess, requestFail, requestStart, getCompaniesSuccess } from "./slice"
import { submitCompanyFail, submitCompanyStart, updateLogo, submitCompanySuccess } from "../companySlice";
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import axios from "axios";
import { ICompanyFilterState } from "./filter";
import { setUploadProgress } from "../globalSlice";
import { notifySuccess } from "@/utils/toast";

export const addCompany = async (dispatch: AppDispatch, bodyObj: any, file: File) => {

    dispatch(submitCompanyStart());
    const nameArr = file?.name.split(".");
    const logoMetadata = {
        folder: "company",
        extension: nameArr?nameArr[nameArr?.length - 1]:"",
        type: file?.type,
    }
    try {

        const { data } = await instance.post("/company/add", { bodyObj, logoMetadata });
        if (data) {
            dispatch(submitCompanySuccess(data.company));

            const companyId = data.company._id;
            console.log(data);
            const uploadRes = await axios.put(data.url, file, {
                headers: {
                    "Content-Type": file.type,
                },
                onUploadProgress: (data) => {
                    if (data.total)
                        dispatch(setUploadProgress(Math.round((data.loaded / data.total) * 100)));
                },
            })
            if (uploadRes) {
                const { data } = await instance.patch(`/company/logo`, { companyId, s3Key: `profile/company/${companyId}.${logoMetadata.extension}` });
                dispatch(updateLogo(data.logo));

            }
        }
        

        // console.log(data);
    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(submitCompanyFail(e.message));
    }
}

export const getCompanies = async (dispatch: AppDispatch, queryObject: ICompanyFilterState, page: number, candidateId: string) => {
    const { name, teamSize,location } = queryObject;

    dispatch(requestStart());
    try {
        const { data } = await instance(`/company/get?name=${name}&teamSize=${teamSize.join(",")}&page=${page}&candidateId=${candidateId}&location=${location}`)
        // console.log(data.result)
        dispatch(getCompaniesSuccess({ companies: data.result, totalCompanies: data.totalCompanies, totalNumOfPage: data.totalNumOfPage }))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message))
    }

}

export const getCompanyDetails = async (dispatch: AppDispatch, id: string) => {

    dispatch(requestStart());
    try {
        const { data } = await instance(`/company/${id}`);

        dispatch(getCompanySuccess(data.company))
        return data.result;

    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}


