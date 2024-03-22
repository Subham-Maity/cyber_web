import instance from "@/lib/axios";
import { getEmployerSuccess, requestSuccessDash, getSavedCandidatesSuccess, requestFailDash, requestStartDash, updateAvatarSuccess, updateCurrEmployerSuccess } from "./dashboardSlice";
import axios, { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import { notifyError, notifySuccess } from "@/utils/toast";
import { toggleIsSaved } from "@/redux/features/candidate/slice"
import { setUploadProgress } from "../globalSlice";
// dashboard
export const getCurrEmployer = async (dispatch: AppDispatch, id: string) => {

    dispatch(requestStartDash());
    try {
        const { data } = await instance(`/employer/auth/${id}`)

        dispatch(getEmployerSuccess(data.employer))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
    }
}

export const updateCurrEmployer = async (dispatch: AppDispatch, id: string, bodyObj: any) => {

    dispatch(requestStartDash());
    try {
        const { data } = await instance.patch(`/employer/update/${id}`, bodyObj)
        dispatch(updateCurrEmployerSuccess(data.employer))
        return true;
    } catch (error) {

        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
        return false;
    }
}

export const updateAvatar = async (dispatch: AppDispatch, file: File, metaData: any) => {

    dispatch(requestStartDash());
    const { extension, userId } = metaData;


    try {
        const { data } = await instance.post(`/employer/uploadProfile`, metaData);
        if (data) {
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
                const { data } = await instance.patch(`/employer/uploadProfile`, { userId, s3Key: `profile/employer/${userId}.${extension}` });
                dispatch(updateAvatarSuccess(data.avatar));

            }
            notifySuccess("Profile updated successfully");
        }

    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
    }
}

export const saveCandidate = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStartDash());
    try {
        const { data } = await instance.post(`/employer/savedCandidate`, bodyObj);
        dispatch(getSavedCandidatesSuccess({ savedCandidates: data.savedCandidates, totalNumOfPage: data.totalNumOfPage, totalCandidate: data.totalSavedCandidate, itemsPerPage: data.itemsPerPage }))
        dispatch(toggleIsSaved(bodyObj.candidateId))
        notifySuccess("Candidate Saved Successfully")
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
        notifyError(e.message)

    }
}

export const removeCandidate = async (dispatch: AppDispatch, bodyObj: any) => {

    const { employerId, candidateId, page } = bodyObj;

    dispatch(requestStartDash());
    try {
        const { data } = await instance.delete(`/employer/savedCandidate?employerId=${employerId}&candidateId=${candidateId}&page=${page}`);
        dispatch(getSavedCandidatesSuccess({ savedCandidates: data.savedCandidates, totalNumOfPage: data.totalNumOfPage, totalCandidate: data.totalSavedCandidate, itemsPerPage: data.itemsPerPage }))
        dispatch(toggleIsSaved(bodyObj.candidateId))
        notifySuccess("Candidate removed from Saved Candidates")
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
        notifyError(e.message)

    }
}

export const getSavedCandidate = async (dispatch: AppDispatch, bodyObj: any) => {

    const { employerId, page } = bodyObj;

    dispatch(requestStartDash());
    try {
        const { data } = await instance.get(`/employer/savedCandidate?employerId=${employerId}&page=${page}`);
        dispatch(getSavedCandidatesSuccess({ savedCandidates: data.savedCandidates, totalNumOfPage: data.totalNumOfPage, totalCandidate: data.totalSavedCandidate, itemsPerPage: data.itemsPerPage }))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
        // notifyError(e.message)

    }
}

export const addNotificationToCandidate = async (dispatch: AppDispatch, bodyObj: any, socket: any) => {

    const { candidateId, employerId } = bodyObj;
    dispatch(requestStartDash());
    try {
        const { data } = await instance.patch(`/employer/candidateNotification`, bodyObj);
        notifySuccess("Requested successfully")
        socket?.emit("sendNotification", {
            senderId: employerId,
            receiverId: candidateId,
            data: data.notification
        });
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
    }
}

export const addPositionToDB = async (
    dispatch: AppDispatch,
    title: string
) => {
    dispatch(requestStartDash());
    try {
        const { data } = await instance.post(
            `/jobTitle/add`, { positionName: title }
        );
        console.log(data);
        dispatch(requestSuccessDash())
        notifySuccess("Position added successfully");
        return true;
    } catch (error) {
        // console.log(error);
        const e = error as any;
        dispatch(requestFailDash(e.response?.data.message));
        notifyError(e.response?.data.message);
        return false;
    }
};

export const addJobCategoryToDB = async (
    dispatch: AppDispatch,
    title: string
) => {
    dispatch(requestStartDash());
    try {
        const { data } = await instance.post(
            `/jobCategory/add`, { categoryName: title }
        );
        // console.log(data);
        dispatch(requestSuccessDash())
        notifySuccess("Job category added successfully");
        return true;
    } catch (error) {
        // console.log(error);
        const e = error as any;
        dispatch(requestFailDash(e.response?.data.message));
        notifyError(e.response?.data.message);
        return false;
    }
};

export const changePassword = async(dispatch:AppDispatch,bodyObj:any) => {
    dispatch(requestStartDash());
    try {
        const {data} = await instance.patch(`/employer/forgetPassword`,bodyObj);
        notifySuccess("Password Changed Successfully");
        dispatch(requestSuccessDash());

    } catch (error) {
         const e = error as AxiosError;
        dispatch(requestFailDash(e.message))
        notifyError(e.message)

    }
}