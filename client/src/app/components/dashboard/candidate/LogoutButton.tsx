"use client";
import axios, { AxiosError } from "axios";
import React from "react";
import type { RootState } from "@/redux/store";
import logout from "@/assets/dashboard/images/icon/icon_9.svg";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  getUserStart,
  logoutUserFail,
  logoutUserSuccess,
} from "@/redux/features/user/slice";
import Image from "next/image";
import instance from "@/lib/axios";

const LogoutButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector(
    (state: RootState) => state.persistedReducer.user
  );

  const handleClick = async () => {
    dispatch(getUserStart());
    try {
      const { data } = await instance(
        "/candidate/logout"
        // { withCredentials: true}
      );
      console.log(data);
      dispatch(logoutUserSuccess(null));
      router.push("/");
    } catch (error) {
      console.log(error);
      const e = error as AxiosError;
      dispatch(logoutUserFail(e.message));
    }
  };

  return (
    <button
      className="d-flex w-100 align-items-center logout-btn"
      disabled={loading}
      onClick={handleClick}
    >
      {/* <Image src={logout} alt="icon" className="lazy-img" /> */}
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
