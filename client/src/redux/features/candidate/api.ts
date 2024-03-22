import instance from "@/lib/axios";
import {
  getCandidatesSuccess,
  requestFail,
  requestStart,
  getDetailsSuccess,
} from "./slice";
import {
  getCurrCandidateSuccess,
  requestFailDash,
  requestStartDash,
  requestSuccessDash,
  removeSavedJobSuccess,
  updateExpSuccess,
  updateCurrCandidateSuccess,
  getSavedJobsSuccess,
  getSavedCompaniesSuccess,
  updateNotificationSuccess,
  addResume,
  getRecommendedJobsSuccess,
  deleteResumeSuccess,
  updateAvatarSuccess,
  updateEduSuccess,
  getCandidateProfileViewsForChartSuccess,
  getCandidateProfileTotalViewsSuccess,
  updateExistingEduSuccess,
  updateExistingExpSuccess,
} from "./dashboardSlice";
import axios, { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import { IFilterState } from "../candidate/filterSlice";
import { notifyError, notifySuccess } from "@/utils/toast";
import { toggleIsSaved as toggleJobIsSaved } from "@/redux/features/jobPost/slice";
import { toggleIsSaved as toggleCompanyIsSaved } from "@/redux/features/company/slice";
import { setUploadProgress } from "../globalSlice";
import { logoutAdmin } from "../user/api";

export const getCandidates = async (
  dispatch: AppDispatch,
  queryObject: IFilterState,
  page: number,
  employerId: string
) => {
  const { location, candidateType, keyword, preferredExperience } = queryObject;

  dispatch(requestStart());
  try {
    const { data } = await instance(
      `/candidate/get?location=${location}&preferredExperience=${preferredExperience}&keyword=${keyword}&candidateType=${candidateType}&page=${page}&employerId=${employerId}`
    );
    dispatch(
      getCandidatesSuccess({
        candidates: data.result,
        totalCandidate: data.totalCandidate,
        totalNumOfPage: data.totalNumOfPage,
      })
    );
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
};

export const getCandidateDetails = async (
  dispatch: AppDispatch,
  id: string
) => {
  dispatch(requestStart());
  try {
    const { data } = await instance(`/candidate/${id}`);
    dispatch(getDetailsSuccess(data.candidate));
  } catch (error) {
    const e = error as AxiosError;
    const response = e.response as any;
    const msg = response.data.message;
    dispatch(requestFail(e.message));
    notifyError(msg);
  }
};
// dashboard
export const getCurrCandidate = async (dispatch: AppDispatch, id: string) => {
  dispatch(requestStartDash());
  try {
    const { data } = await instance(`/candidate/auth/${id}`);

    dispatch(getCurrCandidateSuccess(data.candidate));
  } catch (error) {
    const e = error as AxiosError;
    console.log(e);
    if (id && e.response?.status === 401) {
      await logoutAdmin(dispatch);
    }
    dispatch(requestFailDash(e.message));
  }
};
export const updateCurrCandidate = async (
  dispatch: AppDispatch,
  id: string,
  bodyObj: any
) => {
  dispatch(requestStartDash());
  try {
    const { data } = await instance.patch(`/candidate/update/${id}`, bodyObj);

    dispatch(updateCurrCandidateSuccess(data.candidate));
    return true;
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
    return false;
  }
};
export const addEducation = async (
  dispatch: AppDispatch,
  id: string,
  bodyObj: any
) => {
  dispatch(requestStartDash());
  try {
    const { data } = await instance.patch(
      `/candidate/updateEdu/${id}`,
      bodyObj
    );
    dispatch(updateEduSuccess(data.education));
    notifySuccess("Education added successfully");
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
    notifyError("Something went wrong try again");
  }
};
export const updateEducation = async (dispatch: AppDispatch, id: string, eduId: string, bodyObj: any) => {
  try {
    const { data } = await instance.patch(
      `/candidate/updateEdu/${id}/${eduId}`,
      bodyObj
    );
    dispatch(updateExistingEduSuccess(data.data));
    notifySuccess("Education updated successfully");
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
    notifyError("Something went wrong try again");
  }
}

export const addExperience = async (
  dispatch: AppDispatch,
  id: string,
  bodyObj: any
) => {
  dispatch(requestStartDash());
  try {
    const { data } = await instance.patch(
      `/candidate/updateExp/${id}`,
      bodyObj
    );
    // console.log(data);
    dispatch(updateExpSuccess(data.experience));
    notifySuccess("Experience added successfully")
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
    notifyError("Something went wrong try again");
  }
};
export const updateExperience = async (dispatch: AppDispatch, id: string, expId: string, bodyObj: any) => {
  dispatch(requestStartDash());
  try {
    const { data } = await instance.patch(
      `/candidate/updateExp/${id}/${expId}`,
      bodyObj
    );
    console.log(data);
    dispatch(updateExistingExpSuccess(data.data));
    notifySuccess("Experience added successfully")
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
    notifyError("Something went wrong try again");
  }
}
export const getSavedJobs = async (
  dispatch: AppDispatch,
  id: string,
  page: number
) => {
  dispatch(requestStartDash());
  try {
    const { data } = await instance(
      `/candidate/savedJob?candidateId=${id}&page=${page}`
    );
    console.log(data);
    dispatch(
      getSavedJobsSuccess({
        savedJobs: data.savedJobs,
        totalNumOfSavedJobsPage: data.totalNumOfPage,
        totalSavedJob: data.totalSavedJob,
      })
    );
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
  }
};
export const saveJob = async (dispatch: AppDispatch, bodyObj: any) => {
  dispatch(requestStartDash());
  try {
    const { data } = await instance.post(`/candidate/savedJob`, bodyObj);
    dispatch(
      getSavedJobsSuccess({
        savedJobs: data.savedJobs,
        totalNumOfSavedJobsPage: data.totalNumOfPage,
        totalSavedJob: data.totalSavedJob,
      })
    );
    dispatch(toggleJobIsSaved(bodyObj.jobPostId));
    notifySuccess("Job Saved Successfully");
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
    notifyError(e.message);
  }
};

export const removeSavedJob = async (dispatch: AppDispatch, bodyObj: any) => {
  const { jobPostId, candidateId, page } = bodyObj;
  dispatch(requestStartDash());
  try {
    const { data } = await instance.delete(
      `/candidate/savedJob?jobPostId=${jobPostId}&candidateId=${candidateId}&page=${page}`
    );
    dispatch(
      getSavedJobsSuccess({
        savedJobs: data.savedJobs,
        totalNumOfSavedJobsPage: data.totalNumOfPage,
        totalSavedJob: data.totalSavedJob,
      })
    );
    dispatch(toggleJobIsSaved(bodyObj.jobPostId));
    dispatch(removeSavedJobSuccess);
    notifySuccess("Job remove form saved Jobs");
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
    notifyError(e.message);
  }
};
export const getSavedCompanies = async (
  dispatch: AppDispatch,
  id: string,
  page: number
) => {
  dispatch(requestStartDash());
  try {
    const { data } = await instance(
      `/candidate/savedCompany?candidateId=${id}&page=${page}`
    );
    // console.log(data);
    dispatch(
      getSavedCompaniesSuccess({
        savedCompanies: data.savedCompanies,
        totalNumOfSavedCompaniesPage: data.totalNumOfPage,
        totalSavedCompany: data.totalSavedCompany,
      })
    );
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
  }
};

export const saveCompany = async (dispatch: AppDispatch, bodyObj: any) => {
  dispatch(requestStartDash());
  try {
    const { data } = await instance.post(`/candidate/savedCompany`, bodyObj);
    dispatch(
      getSavedCompaniesSuccess({
        savedCompanies: data.savedCompanies,
        totalNumOfSavedCompaniesPage: data.totalNumOfPage,
        totalSavedCompany: data.totalSavedCompany,
      })
    );
    dispatch(toggleCompanyIsSaved(bodyObj.companyId));
    notifySuccess("Company Saved Successfully");
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
    notifyError(e.message);
  }
};

export const removeSavedCompany = async (
  dispatch: AppDispatch,
  bodyObj: any
) => {
  const { companyId, candidateId, page } = bodyObj;
  dispatch(requestStartDash());
  try {
    const { data } = await instance.delete(
      `/candidate/savedCompany?companyId=${companyId}&candidateId=${candidateId}&page=${page}`
    );
    dispatch(
      getSavedCompaniesSuccess({
        savedCompanies: data.savedCompanies,
        totalNumOfSavedCompaniesPage: data.totalNumOfPage,
        totalSavedCompany: data.totalSavedCompany,
      })
    );
    dispatch(toggleCompanyIsSaved(companyId));
    // dispatch(removeSavedJobSuccess);
    notifySuccess("Company removed form saved companies");
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
    notifyError(e.message);
  }
};

export const updateNotification = async (
  dispatch: AppDispatch,
  bodyObj: any
) => {
  dispatch(requestStartDash());
  try {
    const { data } = await instance.patch(
      `/candidate/updateNoti/${bodyObj.id}`,
      { candidateId: bodyObj.candidateId }
    );
    dispatch(updateNotificationSuccess(data.candidate));
    // notifySuccess("Job remove form saved Jobs");
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
    // notifyError(e.message)
  }
};

export const uploadResume = async (
  dispatch: AppDispatch,
  file: File,
  metaData: any
) => {
  dispatch(requestStartDash());
  const { name, candidateId } = metaData;

  try {
    const { data } = await instance.post(`/candidate/upload`, metaData);

    if (data) {
      console.log(data);
      const uploadRes = await axios.put(data.url, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (data:any) => {
          if (data.total)
            dispatch(
              setUploadProgress(Math.round((data.loaded / data.total) * 100))
            );
        },
      });
      if (uploadRes) {
        const { data } = await instance.patch(`/candidate/upload`, {
          name,
          candidateId,
          s3Key: `resume/${candidateId}__${name}`,
        });
        dispatch(addResume(data.resume));
      }
      notifySuccess("Your resume uploaded successfully");
    }
  } catch (error) {
    const e = error as AxiosError;
    console.log(e);
    dispatch(requestFailDash(e.message));
  }
};

export const deleteResume = async (dispatch: AppDispatch, metaData: any) => {
  dispatch(requestStartDash());
  const { s3Key, candidateId, resumeId } = metaData;

  try {
    const { data } = await instance.delete(
      `/candidate/delete?candidateId=${candidateId}&s3Key=${s3Key}&resumeId=${resumeId}`
    );
    dispatch(deleteResumeSuccess(data.resumeId));
    notifySuccess("Resume deleted successfully");
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
  }
};
export const updateAvatar = async (
  dispatch: AppDispatch,
  file: File,
  metaData: any
) => {
  dispatch(requestStartDash());
  const { extension, userId } = metaData;

  try {
    const { data } = await instance.post(`/candidate/uploadProfile`, metaData);
    if (data) {
      const uploadRes = await axios.put(data.url, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (data:any) => {
          if (data.total)
            dispatch(
              setUploadProgress(Math.round((data.loaded / data.total) * 100))
            );
        },
      });
      if (uploadRes) {
        const { data } = await instance.patch(`/candidate/uploadProfile`, {
          userId,
          s3Key: `profile/candidate/${userId}.${extension}`,
        });
        dispatch(updateAvatarSuccess(data.avatar));
      }
      notifySuccess("Profile updated successfully");
    }
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
    notifyError("something went wrong try again");
  }
};
export const getRecommendedJobs = async (
  dispatch: AppDispatch,
  candidateId: string
) => {
  dispatch(requestStartDash());
  try {
    const { data } = await instance.get(
      `/candidate/recommended?candidateId=${candidateId}`
    );
    dispatch(getRecommendedJobsSuccess(data.jobs));
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
  }
};

export const getCandidateProfileViewsForChart = async (
  dispatch: AppDispatch,
  id: string,
  viewby: string
) => {
  dispatch(requestStartDash());
  try {
    const { data } = await instance.get(
      `/candidate/profileViews/${id}/${viewby}`
    );
    // console.log(data.data);

    dispatch(getCandidateProfileViewsForChartSuccess(data.data));

    return data.data;
  } catch (error) {
    console.log(error);
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
  }
};

export const getTotalViewsOfCandidate = async (
  dispatch: AppDispatch,
  id: string
) => {
  dispatch(requestStartDash());
  try {
    const { data } = await instance.get(`/candidate/totalProfileViews/${id}`);
    // console.log(data.totalViews,"CheckTotalViews");
    dispatch(getCandidateProfileTotalViewsSuccess(data.totalViews));
  } catch (error) {
    console.log(error);
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
  }
};

export const getItemsByJoiningDate = async (
  dispatch: AppDispatch,
  selectedUserType: string,
  viewBy: string
) => {
  try {
    const { data } = await instance.get(
      `/${selectedUserType}/itemsbyjoiningdate/${viewBy}`
    );
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    const e = error as AxiosError;
    dispatch(requestFailDash(e.message));
  }
};

export const addCandidateSkillDB = async (
  dispatch: AppDispatch,
  skill: string
) => {
  dispatch(requestStartDash());
  try {
    const { data } = await instance.post(
      `/candidateSkills/add`, { skillName: skill }
    );
    console.log(data);
    dispatch(requestSuccessDash())
    return true;
  } catch (error) {
    // console.log(error);
    const e = error as any;
    dispatch(requestFailDash(e.response?.data.message));
    notifyError(e.response?.data.message);
    return false;
  }
};
