import instance from "@/lib/axios";
import { AxiosError } from "axios";
import { AppDispatch } from "@/redux/store";
import {
  fetchSmtpConfigError,
  fetchSmtpConfigRequest,
  fetchSmtpConfigSuccess,
  addSmtpConfigSuccess,
  setSmtpConfig,
  updateSmtpConfigSuccess,
  
} from "./slice";
import { String } from "lodash";

export interface SmtpConfig {
  host: string;
  port: string;
  secure: boolean;
  user: string;
  pass: string;
}

export const getSmtpConfigs = async (dispatch: AppDispatch) => {
  dispatch(fetchSmtpConfigRequest());
  try {
    const { data } = await instance.get("/smtpConfig");
    // console.log(data[0],"From api")
    dispatch(fetchSmtpConfigSuccess(data[0]));
    return data;
  } catch (error) {
    const e = error as AxiosError;
    dispatch(fetchSmtpConfigError(e.message));
    return [];
  }
};

export const addSmtpConfig = async (dispatch: AppDispatch, smtpConfig: SmtpConfig) => {
  dispatch(fetchSmtpConfigRequest());
  try {
    const { data } = await instance.post("/smtpConfig", smtpConfig);
    dispatch(addSmtpConfigSuccess(data));
  } catch (error) {
    const e = error as AxiosError;
    dispatch(fetchSmtpConfigError(e.message));
    return null;
  }
};

export const updateSmtpConfig = async (dispatch: AppDispatch, smtpConfig: SmtpConfig) => {
  dispatch(fetchSmtpConfigRequest());
  try {
    // Assuming you have an identifier to determine which configuration to update
    const { data } = await instance.patch("/smtpConfig", smtpConfig);
    console.log(data);
    dispatch(updateSmtpConfigSuccess(data));
    // return data;
  } catch (error) {
    const e = error as AxiosError;
    dispatch(fetchSmtpConfigError(e.message));
    return null;
  }
};