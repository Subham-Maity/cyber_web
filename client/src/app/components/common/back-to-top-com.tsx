"use client";
import BackToTop from "@/lib/back-to-top";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

function BackToTopCom() {
  useEffect(() => {
    BackToTop(".scroll-top");
  }, []);
  const pathName = usePathname();
  return (
    <>
      {pathName !== "/callback" && (
        <button className="scroll-top">
          <i className="bi bi-arrow-up-short"></i>
        </button>
      )}
    </>
  );
}

export default BackToTopCom;
