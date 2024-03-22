import instance from "@/lib/axios";
import {
  requestFail,
  requestStart,
  getAllJobAppByCandidateSuccess,
  getAllJobAppByJobPostSuccess,
  createJobAppSuccess,
  allJobAppByCandidateWithJobPostSuccess,
  allJobAppByJobPostWithCandidateSuccess,
  requestSuccess,
  getChatsSuccess,
  addChatSuccess,
  getFeedbackSuccess,
  askFeedbackSuccess,
  responseFeedbackSuccess,
  getChatsFail,
  getChatsByEmployerSuccess,
  allJobAppByCandidateWithJobPostPaginationSuccess,
  getAllShortlistedJobAppByCandidateIdSuccess,
} from "./slice";
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useAppDispatch } from "@/redux/hook";

// dashboard
export const getAllJobAppByCandidate = async (
  dispatch: AppDispatch,
  id: string
) => {
  console.log("from jopApp api", id);

  dispatch(requestStart());
  try {
    const { data } = await instance(`/jobApp/candidate/${id}`);

    dispatch(getAllJobAppByCandidateSuccess(data.allJobApp));
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
};

export const getallJobAppByCandidateWithJobPost = async (
  dispatch: AppDispatch,
  id: string,
  page: number,
  True: string = "false"
) => {
  // console.log("from jopApp api", id)

  dispatch(requestStart());
  try {
    const { data } = await instance(`/jobApp/candidateDash/${id}/${page}`);
    if (True === "true") {
      // dispatch(allJobAppByCandidateWithJobPostSuccess(data));
      dispatch(allJobAppByCandidateWithJobPostPaginationSuccess(data));
      // console.log(data);
    } else {
      dispatch(allJobAppByCandidateWithJobPostSuccess(data));
      console.log(data);
    }
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
};
export const getallJobAppByJobPostWithCandidate = async (
  dispatch: AppDispatch,
  id: string,
  filterState?: any
) => {
  const { candidateName, testScore, status, matchPercent } = filterState;
  dispatch(requestStart());
  try {
    const { data } = await instance(`/jobApp/employerDash/${id}?candidateName=${candidateName}&testScore=${testScore}&status=${status}&matchPercent=${matchPercent}`);
    console.log(data.allJobApp)
    dispatch(allJobAppByJobPostWithCandidateSuccess(data.allJobApp));
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
};

export const getAllJobAppByJobPost = async (
  dispatch: AppDispatch,
  id: string,
  
) => {
 
  dispatch(requestStart());
  try {
    const { data } = await instance(`/jobApp/jobPost/${id}`);

    dispatch(getAllJobAppByJobPostSuccess(data.allJobApp));
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
};

export const createJobApp = async (dispatch: AppDispatch, bodyObj: any) => {
  dispatch(requestStart());
  try {
    const { data } = await instance.post(`/jobApp/create`, bodyObj);

    dispatch(createJobAppSuccess(data.jobApp));
    notifySuccess("you have successfully applied for the job");
  } catch (error) {
    const e = error as AxiosError;
    const response = e.response as any;
    const msg = response.data.message as string;
    dispatch(requestFail(msg));
    notifyError(msg);
  }
};
export const updateJobAppStatus = async (
  dispatch: AppDispatch,
  bodyObj: any,
  socket: any
) => {
  // alert(bodyObj);

  const { candidateId, employerId } = bodyObj;
  dispatch(requestStart());
  try {
    const { data } = await instance.patch(`/jobApp/updateStatus`, bodyObj);

    dispatch(requestSuccess());
    notifySuccess("status updated successfully");
    socket?.emit("sendNotification", {
      senderId: employerId,
      receiverId: candidateId,
      data: data.notification,
    });
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
};

export const initiateChat = async (dispatch: AppDispatch, bodyObj: any) => {
  dispatch(requestStart());
  try {
    const { data } = await instance.post(`/chat/create`, bodyObj);
    dispatch(getChatsSuccess(data.chat));
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
};

export const getMessages = async (dispatch: AppDispatch, id: string) => {
  dispatch(requestStart());
  try {
    const { data } = await instance.get(`/chat/get/${id}`);
    dispatch(getChatsSuccess(data.chat));
  } catch (error) {
    const e = error as AxiosError;
    console.log("from the error of chat", e);
    if (e.response && e.response.status === 404) {
      dispatch(getChatsFail(null));
    } else dispatch(requestFail(e.message));
  }
};
export const addMessages = async (
  dispatch: AppDispatch,
  bodyObj: any,
  participants: [string, string],
  socket: any
) => {
  dispatch(requestStart());
  const { userId } = bodyObj;
  const receiverId = participants.find((val) => val !== userId);
  try {
    const { data } = await instance.post(`/chat/add`, bodyObj);
    dispatch(addChatSuccess(data.chat));
    socket?.emit("sendMessage", {
      senderId: userId,
      receiverId,
      data: data.chat,
    });

    console.log(userId, receiverId);
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
};
export const getChatsByEmployer = async (dispatch: AppDispatch, id: string) => {
  dispatch(requestStart());

  try {
    const { data } = await instance.get(`/chat/getAll/${id}`);
    dispatch(getChatsByEmployerSuccess(data.chats));
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
};
export const getFeedback = async (dispatch: AppDispatch, id: string) => {
  dispatch(requestStart());
  try {
    const { data } = await instance.get(`/jobApp/feedback/${id}`);
    dispatch(getFeedbackSuccess(data.feedback));
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
};

export const askFeedback = async (dispatch: AppDispatch, bodyObj: any) => {
  dispatch(requestStart());
  try {
    const { data } = await instance.post(`/jobApp/feedback/ask`, bodyObj);
    dispatch(askFeedbackSuccess(data.feedback));
    notifySuccess("You have asked for feedback successfully");
  } catch (error) {
    const e = error as AxiosError;
    const response = e.response as any;
    const msg = response.data.message as string;

    dispatch(requestFail(msg));
    // console.log(e);
    notifyError(msg);
  }
};
export const responseFeedback = async (
  dispatch: AppDispatch,
  bodyObj: any,
  socket: any
) => {
  dispatch(requestStart());
  const { candidateId, employerId } = bodyObj;

  try {
    const { data } = await instance.patch(`/jobApp/feedback/response`, bodyObj);
    dispatch(responseFeedbackSuccess(data.feedback));
    notifySuccess("You have successfully responded to feedback ");
    socket?.emit("sendNotification", {
      senderId: employerId,
      receiverId: candidateId,
      data: data.notification,
    });
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
};

export const getAllShortlistedJobAppByCandidateId = async (
  dispatch: AppDispatch,
  candidateId: string
) => {
  dispatch(requestStart());
  try {
    const { data } = await instance.get(
      `/jobApp/getallshortlistedjobapp/${candidateId}`
    );
    dispatch(getAllShortlistedJobAppByCandidateIdSuccess(data.data));
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
};
