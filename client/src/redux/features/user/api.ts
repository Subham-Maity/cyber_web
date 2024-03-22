import instance from "@/lib/axios";
import { getUserFail, getUserStart, getUserSuccess, logoutUserFail, logoutUserSuccess } from "./slice"
import { getCurrCandidateSuccess } from "@/redux/features/candidate/dashboardSlice"
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import { getEmployerSuccess } from "../employer/dashboardSlice";
import { notifyError, notifySuccess } from "@/utils/toast";


export const loginWithGoogle = async (dispatch: AppDispatch, bodyObj: any) => {
    const formData = new URLSearchParams(bodyObj).toString();
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    };
    dispatch(getUserStart());
    try {
        const { data } = await instance.post(
            "/candidate/auth/getCandidateGoogle",
            formData,
            { headers: headers }
        );
        dispatch(getUserSuccess({ user: data.user._id, userRole: data.user.role, avatar: data.user.avatar, name: data.user.firstName }));
        // console.log(data);
        if (data.user.role === "candidate") {
            dispatch(getCurrCandidateSuccess(data.user))
        }
        else if (data.user.role === "employer") {
            dispatch(getEmployerSuccess(data.user))
        }
        return true;
    } catch (error) {
        const e = error as AxiosError;
        dispatch(getUserFail(e.message));
        // console.log(error);
        return false;
    }
}

export const employerLoginWithPass = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(getUserStart());
    try {
        const { data } = await instance.post(
            "/employer/auth/login",
            bodyObj,
        );
        dispatch(getUserSuccess({ user: data.user._id, userRole: data.user.role, avatar: data.user.avatar, name: data.user.name }));
        dispatch(getEmployerSuccess(data.user))
        return true;
    } catch (error) {
        const e = error as AxiosError;
        dispatch(getUserFail(e.message));
        // console.log(error);
        return false
    }
}

export const loginWithLn = async (dispatch: AppDispatch, bodyObj: any) => {

    const formData = new URLSearchParams(bodyObj).toString();
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    };
    dispatch(getUserStart());
    try {
        const { data } = await instance.post(
            "/candidate/auth/getCandidate",
            formData,
            { headers: headers }
        );
        dispatch(getUserSuccess({ user: data.user._id, userRole: data.user.role, avatar: data.user.avatar, name: data.user.firstName }));
        if (data.user.role === "candidate") {
            dispatch(getCurrCandidateSuccess(data.user))
        }
        else if (data.user.role === "employer") {
            dispatch(getEmployerSuccess(data.user))
        }
        return true;
    } catch (error) {
        const e = error as AxiosError;
        dispatch(getUserFail(e.message));
        // console.log(error);
        return false
    }
}
export const adminLogin = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(getUserStart());
    try {
        const { data } = await instance.post(
            "/admin/login",
            bodyObj,
            // { withCredentials: true }
        );
        dispatch(getUserSuccess({ user: data.user._id, userRole: data.user.role, avatar: data.user.avatar, name: data.user.name }));
        // console.log(data);
        return true;
    } catch (error) {
        const e = error as AxiosError;
        dispatch(getUserFail(e.message));
        // console.log(error);
        return false
    }
}
export const logoutAdmin = async (dispatch: AppDispatch) => {

    dispatch(getUserStart());
    try {
        const { data } = await instance.get(
            "/admin/logout",
            // { withCredentials: true }
        );
        dispatch(logoutUserSuccess(null));
        notifySuccess("Logout Successfully")
        return true;
    } catch (error) {
        const e = error as AxiosError;
        dispatch(logoutUserFail(e.message));
        notifyError("Logout Failed")
        // console.log(error);

        return false
    }
}



