import instance from "@/lib/axios";
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import { fetchEmailTemplateError,fetchEmailTemplateRequest,fetchEmailTemplateSuccess,addEmailTemplateSuccess,deleteEmailTemplateSuccess,updateEmailTemplateSuccess, setBeingUsedFor } from "./slice";
import { notifyError } from "@/utils/toast";

interface Template {
    id:string;
    templateType: string;
    templateName: string;
    subject: string;
    body: string;
  }

export const getTemplates = async (dispatch: AppDispatch,bodyObj:any) => {
  dispatch(fetchEmailTemplateRequest());
  try {
    const { data } = await instance.get("/emailTemplate",{params:bodyObj});
    dispatch(fetchEmailTemplateSuccess({templates: data.result,totalNumOfPage: data.totalNumOfPage,totalTemplate: data.totalTemplate}));
    
  } catch (error) {
    const e = error as AxiosError;
    dispatch(fetchEmailTemplateError(e.message));
    return[];
    
  }
};

export const addTemplate = async (dispatch: AppDispatch, template: Template) => {
  dispatch(fetchEmailTemplateRequest());
  try {
    const { data } = await instance.post("/emailTemplate", template);
    dispatch(addEmailTemplateSuccess(data));
  } catch (error) {
    const e = error as AxiosError;
    dispatch(fetchEmailTemplateError(e.message));
    return null;
  }
};

export const updateTemplate = async (dispatch: AppDispatch, id: string | undefined, updatedTemplate: Template) => {
  dispatch(fetchEmailTemplateRequest());
  try {
    const { data } = await instance.patch(`/emailTemplate/${id}`, updatedTemplate);
    dispatch(updateEmailTemplateSuccess(data)); 
  } catch (error) {
    const e = error as AxiosError;
    dispatch(fetchEmailTemplateError(e.message));
    return false;
  }
};

export const deleteTemplate = async (dispatch: AppDispatch, id: string | undefined) => {
  dispatch(fetchEmailTemplateRequest());
  try {
    const{data}=await instance.delete(`/emailTemplate/${id}`);
    dispatch(deleteEmailTemplateSuccess(data))    
  } catch (error) {
    const e = error as AxiosError;
    dispatch(fetchEmailTemplateError(e.message));
  }
};

export const updateBeingUsedFor = async (dispatch:AppDispatch, id:string, usedFor:string) => {
  try {
    const {data} = await instance.patch(`/emailTemplate/updateuse/${id}?use=${usedFor}`);
    dispatch(setBeingUsedFor({id,usedFor}))

  } catch (error) {
    const e = error as AxiosError;
    dispatch(fetchEmailTemplateError(e.message));
  }
}
// Additional functions can be added based on your requirements.
