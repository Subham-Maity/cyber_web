"use client";
import { resetFilter } from "@/redux/features/filterJobPostSlice";
import { useAppDispatch } from "@/redux/hook";
import { animationCreate } from "@/utils/utils";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  //  handle reset first time render this page
  const handleReset = () => {
    dispatch(resetFilter());
  };
  useEffect(() => {
    // handle animation
    animationCreate();
  }, []);
  useEffect(() => {
    handleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // add user to the socket
  // useEffect(() => {
  //   socket?.emit("newUser", currUser);
  // }, [socket, currUser]);

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default Wrapper;
