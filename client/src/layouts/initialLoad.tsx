"use client";
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { setSocket } from "@/redux/features/globalSlice";
import { getCurrCandidate } from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getCurrEmployer } from "@/redux/features/employer/api";
import { getCurrAdmin } from "@/redux/features/admin/api";
import { addNotification } from "@/redux/features/candidate/dashboardSlice";
import { usePathname } from "next/navigation";

const initialLoad = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { currUser, userRole, isAuthenticated } = useAppSelector(
    (s) => s.persistedReducer.user
  );
  const pathName = usePathname();
  const { socket } = useAppSelector((s) => s.global);
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_ENDPOINT;
  console.log(pathName);

  useEffect(() => {
    // getCurr user
    if (currUser && isAuthenticated && pathName !== "/callback") {
      if (userRole === "candidate") getCurrCandidate(dispatch, currUser);
      else if (userRole === "employer") getCurrEmployer(dispatch, currUser);
      else if (userRole === "admin") getCurrAdmin(dispatch, currUser);
    }

    // connect to socket
    if (socketUrl) {
      const socket = io(socketUrl);
      dispatch(setSocket(socket));
    }
  }, [currUser]);

  // listed to real time notification

  useEffect(() => {
    socket?.on("getNotification", (data: any) => {
      dispatch(addNotification(data.notification));
    });
  }, [socket]);

  useEffect(() => {
    socket?.emit("newUser", currUser);
  }, [socket, currUser]);

  return children;
};

export default initialLoad;
