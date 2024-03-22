import instance from "@/lib/axios";
import {
  requestStart,
  requestFail,
  getCandidateSuccess,
  getEmployerSuccess,
  getCurrAdminSuccess,
  getCompanySuccess,
  companyUpdateSuccess,
} from "./slice";
import {
  blogRequestFail,
  blogRequestStart,
  blogRequestSuccess,
  getBlogsSuccess,
  getBlogByIdSuccess,
  addCommentSuccess,
  searchBlogSuccess,
  setRecentBlogs,
  blogUpdateSuccess,
  blogDeleteSuccess,
} from "./blogSlice";
import axios, { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import { setUploadProgress } from "../globalSlice";
import { updateLogo } from "../companySlice";
import { IFilterState } from "../user/filterSlice/userFilterSlice";
import { notifyError, notifyInfo, notifySuccess } from "@/utils/toast";

export const getCurrAdmin = async (dispatch: AppDispatch, id: string) => {
  dispatch(requestStart());
  try {
    const { data } = await instance.get(`/admin/getCurrUser?id=${id}`);
    dispatch(getCurrAdminSuccess(data.user));
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
};

export const getAllCandidate = async (dispatch: AppDispatch, bodyObj: any, filter: IFilterState) => {
  const { type, candidateName, date } = filter;
  const d = date?.toString();
  dispatch(requestStart());
  try {
    const { data } = await instance.get(`/admin/candidate`, {
      params: { ...bodyObj, name: candidateName, type, date: d },
    });
    dispatch(
      getCandidateSuccess({
        candidatesFA: data.result,
        totalCandidate: data.totalCandidate,
        totalNumOfPageFC: data.totalNumOfPage,
      })
    );
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
};

export const deleteCandidateByAdmin = async (dispatch: AppDispatch, id: string, bodyObj: any) => {
  try {
    const data = await instance.patch(`/candidate/deleteByAdmin/${id}`, bodyObj);

  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
}

export const deletedEmployerByAdmin = async (dispatch: AppDispatch, id: string, bodyObj: any) => {
  try {
    const data = await instance.patch(`employer/updateEmployerByAdmin/${id}`, bodyObj);

  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
}

export const createEmployer = async (dispatch: AppDispatch, bodyObj: any) => {

  try {

    const data = await instance.post(`employer/auth/signup`, bodyObj);
    notifyInfo("Employer created successfully");


  } catch (error) {
    const e = error as AxiosError;
    console.log(e);
    notifyError("something went wrong, please try again");
    dispatch(requestFail(e.message));
  }
}


export const getAllEmployer = async (dispatch: AppDispatch, bodyObj: any, filter: IFilterState) => {
  const { type, candidateName, date } = filter;
  const d = date?.toString();
  dispatch(requestStart());
  try {
    const { data } = await instance.get("/admin/employer", { params: { ...bodyObj, type, name: candidateName, date: d } });
    dispatch(
      getEmployerSuccess({
        employerFA: data.result,
        totalEmployer: data.totalEmployer,
        totalNumOfPageFE: data.totalNumOfPage,
      })
    );
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
};

export const getAllCompany = async (
  dispatch: AppDispatch,
  bodyObj: any,
  id: string = ""
) => {
  dispatch(requestStart());
  try {
    const { data } = await instance.get(`/admin/company?id=${id}`, {
      params: bodyObj,
    });
    dispatch(
      getCompanySuccess({
        companyFA: data.result,
        totalCompany: data.totalCompany,
        totalNumOfPageFCom: data.totalNumOfPage,
      })
    );
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
};

// blog

export const createBlog = async (dispatch: AppDispatch, bodyObj: any) => {
  dispatch(blogRequestStart());
  try {
    const { data } = await instance.post("/blog", bodyObj);
    dispatch(blogRequestSuccess());
  } catch (error) {
    const e = error as AxiosError;
    dispatch(blogRequestFail(e.message));
  }
};

export const getAllBlog = async (dispatch: AppDispatch, bodyObj: any) => {
  dispatch(blogRequestStart());
  try {
    const { data } = await instance.get("/blog", { params: bodyObj });
    dispatch(
      getBlogsSuccess({
        blogs: data.blogs,
        totalPages: data.totalPages,
        totalBlogs: data.totalBlogs,
        blogsPerPage: data.blogsPerPage,
      })
    );
    if (bodyObj.page === 1) {
      dispatch(setRecentBlogs({ blogs: data.blogs }));
    }
  } catch (error) {
    const e = error as AxiosError;
    dispatch(blogRequestFail(e.message));
  }
};

export const searchBlog = async (dispatch: AppDispatch, filter: any) => {
  const { searchTerm } = filter;

  dispatch(blogRequestStart());
  try {
    const { data } = await instance.get(
      `/blog/search?searchTerm=${searchTerm}`
    );
    dispatch(searchBlogSuccess(data.blogs));
  } catch (error) {
    const e = error as AxiosError;
    dispatch(blogRequestFail(e.message));
  }
};

export const getBlogById = async (dispatch: AppDispatch, id: string) => {
  dispatch(blogRequestStart());
  try {
    const { data } = await instance.get(`/blog/${id}`);
    dispatch(getBlogByIdSuccess(data.blog));
  } catch (error) {
    const e = error as AxiosError;
    dispatch(blogRequestFail(e.message));
  }
};

export const addComment = async (
  dispatch: AppDispatch,
  commentId: string,
  bodyObj: any
) => {
  dispatch(blogRequestStart());
  try {
    const { data } = await instance.put(
      `/blog/comment?id=${commentId}`,
      bodyObj
    );
    dispatch(addCommentSuccess(data.comment));
  } catch (error) {
    const e = error as AxiosError;
    dispatch(blogRequestFail(e.message));
  }
};


export const updateCompany = async (dispatch: AppDispatch, companyId: string, bodyObj: any, file?: File) => {
  dispatch(requestStart());
  const nameArr = file?.name.split(".");
  const logoMetadata = {
    folder: "company",
    extension: nameArr ? nameArr[nameArr?.length - 1] : "",
    type: file?.type,
  }
  try {
    const { data } = await instance.patch(`/company/${companyId}`, { bodyObj, logoMetadata })
    
    if (data) {

      dispatch(companyUpdateSuccess(data.company));
      if(bodyObj.isDeleted === true ){
        notifySuccess("Company deleted successfully");
      }
      const companyId = data.company._id;
      console.log(data);
      const uploadRes = await axios.put(data.url, file, {
        headers: {
          "Content-Type": file?.type || "",
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


  } catch (error) {
    const e = error as AxiosError;
    dispatch(blogRequestFail(e.message));
    console.log(e);
    notifyError(`${(e.response?.data as any).message}`)
  }
}

export const updateBlog = async (dispatch: AppDispatch, id: string, bodyObj: any) => {
  dispatch(blogRequestStart());
  try {
    const { data } = await instance.patch(`/blog/${id}`, bodyObj);
    dispatch(blogUpdateSuccess());

  } catch (error) {
    const e = error as AxiosError;
    dispatch(blogRequestFail(e.message));
  }
}

export const deleteBlog = async (dispatch: AppDispatch, id: string) => {
  dispatch(blogRequestStart());
  try {
    await instance.delete(`/blog/${id}`);
    dispatch(blogDeleteSuccess());
  } catch (error) {
    const e = error as AxiosError;
    dispatch(blogRequestFail(e.message));
  }
}



