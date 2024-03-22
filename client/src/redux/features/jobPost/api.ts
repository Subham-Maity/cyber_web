import instance from "@/lib/axios";
import { getJobPostsSuccess, requestFail, requestStart, requestSuccess, submitJobPostSuccess, getJobPostsForEmployerSuccess, askGptStart, askGptSuccess, askGptEnd, getRelatedJobsSuccess, setFileNamePc, getAllJobPostsSuccess, getJobPostViewsSuccess, registerJobPostViewSuccess, getJobPostForEmployerDashboardSuccess, getJobPostForEmployerNiceSelectSuccess, getJobPostForEmployerDashboardCardsSuccess, updateJobPostSuccess } from "./slice"
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import { IFilterState } from "../filterJobPostSlice";
import { notifyError, notifySuccess } from "@/utils/toast";
import { setUploadProgress } from "../globalSlice";


export const getAllJobPosts = async (dispatch: AppDispatch, page: number, filter: any, adminId: string = "") => {
    // const { title, jobCode, company: { companyId }, status } = filter
    const { title, jobCode, company, status } = filter;

    const companyId = company ? company.companyId : '';
    const title1=title===undefined?'':title;
    dispatch(requestStart())
    try {
        const { data } = await instance(`/jobPost/getalljobposts?page=${page}&adminId=${adminId}&title=${title1}&jobCode=${jobCode}&companyId=${companyId}&status=${status}`);
        dispatch(getAllJobPostsSuccess({ jobPost: data.jobPosts, page: data.page, totalPages: data.totalPages, totalDocuments: data.totalDocs }))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message))
    }
}

export const getJObPosts = async (dispatch: AppDispatch, queryObject: IFilterState, page: number, candidateId: string) => {
    const { location, jobCategory, jobType, salary, workMode, preferredExperience, status, jobCode } = queryObject;

    dispatch(requestStart());
    try {
        const { data } = await instance(`/jobPost/get?jobCode=${jobCode}&location=${location.join(",")}&jobType=${jobType.join(",")}&jobCategory=${jobCategory.join(",")}&workMode=${workMode.join(",")}&preferredExperience=${preferredExperience.join(",")}&salary=${salary}&status=${status}&page=${page}&candidateId=${candidateId}`)
        console.log(jobCode);
        
        dispatch(getJobPostsSuccess({ allJobPost: data.result, totalJobPost: data.totalJobPost, totalNumOfPage: data.totalNumOfPage }))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message))
    }

}
export const getJObPostsByCompanyId = async (dispatch: AppDispatch, queryObject: { companyId: string, status: string }, page: number, candidateId: string) => {
    const { companyId, status } = queryObject;
    dispatch(requestStart());
    try {
        const { data } = await instance(`/jobPost/get?page=${page}&candidateId=${candidateId}&companyId=${companyId}&status=${status}`)
        // console.log(data.result)
        dispatch(getJobPostsSuccess({ allJobPost: data.result, totalJobPost: data.totalJobPost, totalNumOfPage: data.totalNumOfPage }))
    } catch (error) {
        const e = error as AxiosError;
        dispatch(requestFail(e.message))
    }

}
export const addJobPost = async (dispatch: AppDispatch, bodyObj: any) => {

    dispatch(requestStart());
    try {
        const { data } = await instance.post("/jobPost/add", bodyObj);
        dispatch(submitJobPostSuccess(data.job));
        notifySuccess("Job Posted Successfully");
    } catch (error) {
        const e = error as AxiosError;
        const response = e.response as any;
        const msg = response.data.message;
        dispatch(requestFail(e.message));
        notifyError(msg);
    }
}
export const updateJobPost = async (dispatch: AppDispatch, bodyObj: any) => {
    dispatch(requestStart());
    try {
        const { data } = await instance.patch("/jobPost/add", bodyObj);
        dispatch(updateJobPostSuccess(data.job))
        notifySuccess("Job Post Updated Successfully");
    } catch (error) {
        const e = error as AxiosError;
        const response = e.response as any;
        const msg = response.data.message;
        dispatch(requestFail(e.message));
        notifyError(msg);

    }
}

export const getJobPostsForEmployer = async (dispatch: AppDispatch, id: string, page: number, filterState: any) => {

    const { company: { companyId }, status, jobCode, title } = filterState;
    dispatch(requestStart());

    try {
        const { data } = await instance(`jobPost/employer/${id}?page=${page}&companyId=${companyId}&status=${status}&jobCode=${jobCode}&title=${title}`);
        dispatch(getJobPostsForEmployerSuccess({ jobPostsForEmployer: data.jobPosts, totalJobPostPagesForEmployer: data.totalPages, currentPageForJobPostEmployer: data.currentPage, pageSizeForJobPostEmployer: data.pageSize, totalJobPostsForEmployer: data.totalCount }));
    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}
export const askToGpt = async (dispatch: AppDispatch, query: string) => {

    dispatch(askGptStart());

    try {
        const { data } = await instance(`/jobPost/askGpt?query=${query}`);
        dispatch(askGptSuccess());
        return data.result;

    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        const response = e.response as any;
        notifyError(response.data.message || "Something went wrong, try later");
        dispatch(askGptEnd());
    }
}
export const askToGptForCan = async (dispatch: AppDispatch, query: string) => {

    dispatch(askGptStart());

    try {
        const { data } = await instance(`/jobPost/askGpt/candidate?query=${query}`);
        dispatch(askGptSuccess());
        return data.result;

    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        const response = e.response as any;
        notifyError(response.data.message || "Something went wrong, try later");
        dispatch(askGptEnd());
    }
}
export const getJobPostDetailsForEmployer = async (dispatch: AppDispatch, id: string) => {
    dispatch(requestStart());
    try {
        const { data } = await instance(`/jobPost/getJobForEmployer/${id}`,
            //  { withCredentials: true }
        );
        dispatch(submitJobPostSuccess(data.job));

    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}
export const getJobPostDetails = async (dispatch: AppDispatch, id: string) => {
    // getJobDetailsWithCompany
    dispatch(requestStart());
    try {
        const { data } = await instance(`/jobPost/${id}`,
            //  { withCredentials: true }
        );
        dispatch(submitJobPostSuccess(data.job));

    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

export const getRelatedJobs = async (dispatch: AppDispatch, id: string) => {
    // getJobDetailsWithCompany
    dispatch(requestStart());
    try {
        const { data } = await instance(`/jobPost/related?jobId=${id}`,
        );
        dispatch(getRelatedJobsSuccess(data.jobs));
    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

export const deleteJobPost = async (dispatch: AppDispatch, id: string) => {

    dispatch(requestStart());
    try {
        const { data } = await instance.delete(`/jobPost/${id}`);
        dispatch(getJobPostsSuccess({ allJobPost: data.result, totalJobPost: data.totalJobPost, totalNumOfPage: data.totalNumOfPage }));

    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}
export const uploadResumeToServer = async (dispatch: AppDispatch, file: File, metadata: any) => {

    dispatch(askGptStart());
    const formData = new FormData();
    formData.append('pdfFile', file)
    formData.append('metadata', JSON.stringify(metadata));
    try {
        const { data } = await instance.post('/jobPost/uploadToPc', formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                'Accept': 'application/json',
            },
            onUploadProgress: (data) => {
                if (data.total) dispatch(setUploadProgress(Math.round(((data.loaded / data.total) * 100))))
            }
        })
        dispatch(setFileNamePc(data.fileName));
    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(askGptEnd());
    }
}

export const queryToGpt = async (dispatch: AppDispatch, candidateId: string, query: string) => {

    dispatch(askGptStart());
    try {
        const { data } = await instance(`/jobPost/queryToPc?candidateId=${candidateId}&query=${query}`);
        console.log(data);
        dispatch(askGptSuccess());
        return data.response;
    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(askGptEnd());
    }
}

export const getSuggestion = async (dispatch: AppDispatch, candidateId: string, question: string, s3Key: string) => {

    // alert("called");
    const bodyObj = {
        candidateId,
        question,
        s3Key
    }

    dispatch(askGptStart());
    try {
        // const { data } = await instance(`/jobPost/suggestion?candidateId=${candidateId}&question=${question}&s3Key=${s3Key}`);
        const { data } = await instance(`/jobPost/suggestion`, { params: bodyObj });
        console.log(data);
        dispatch(askGptSuccess());
        return data.response;
    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        const response = e.response as any;
        notifyError(response?.data?.message || "Something went wrong, try later")
        dispatch(askGptEnd());
    }
}

export const registerJobPostView = async (dispatch: AppDispatch, id: string) => {
    dispatch(requestStart());
    try {
        const data = await instance.post(`/jobPost/jobpostviews/${id}`)
        dispatch(registerJobPostViewSuccess())
    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

export const getJobPostViews = async (dispatch: AppDispatch, viewData: string, id: string) => {
    dispatch(requestStart());
    try {

        const data = await instance.get(`/jobPost/jobpostviews/${id}/${viewData}`);
        // console.log(data.data.data);
        dispatch(getJobPostViewsSuccess(data.data.data))
        return data.data.data;

    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

export const getJobPostForEmployerDashboard = async (dispatch: AppDispatch, id: string) => {
    dispatch(requestStart());
    try {
        const data = await instance.get(`/jobPost/jobpostforemployerdashboard/${id}`);
        dispatch(getJobPostForEmployerDashboardSuccess(data.data.data));
    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

export const getJobPostForEmployerNiceSelect = async (dispatch: AppDispatch, id: string) => {
    dispatch(requestStart());
    try {
        const data = await instance.get(`/jobPost/jobpostforemployerniceselect/${id}`);
        // console.log(data,"getJobPostForEmployerNiceSelect");
        dispatch(getJobPostForEmployerNiceSelectSuccess(data.data.data));
    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

export const getJobPostForEmployerDashboardCards = async (dispatch: AppDispatch, id: string) => {
    dispatch(requestStart());
    try {
        const data = await instance.get(`/jobPost/jobpostforemployerdashboardcards/${id}`);
        // console.log(data,"getJobPostForEmployerDashboardCards");
        dispatch(getJobPostForEmployerDashboardCardsSuccess(data.data));
    } catch (error) {
        console.log(error);
        const e = error as AxiosError;
        dispatch(requestFail(e.message));
    }
}

