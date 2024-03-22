"use client";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import React from "react";
import { usePathname } from "next/navigation";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const pathName = usePathname();

  const { currUser, isAuthenticated, userRole } = useAppSelector(
    (s) => s.persistedReducer.user
  );

  // useEffect(() => {
  //   if (pathName !== "/callback" && (!currUser || !isAuthenticated)) {
  //     router.push("/");
  //   }
  // }, [currUser, isAuthenticated]);

  const pathArr = pathName.split("/").filter((p) => p != "");
  console.log(pathArr, "pathArr");

  useEffect(() => {
    const paths = ["/admin/auth", "/callback"];
    if (
      !paths.includes(pathName) &&
      !pathName.includes("/blog") &&
      (!currUser || !isAuthenticated) &&
      pathArr.length >= 2
    ) {
      router.push("/");
    } else if (currUser && pathName === "/admin/auth") {
      router.push("/"); // Redirect to home page or any other page
    } else if (pathName === "/candidates-v1" && !isAuthenticated) {
      router.push("/");
    }
  }, [currUser, isAuthenticated, pathName]);

  return children;
};

export default Protected;
