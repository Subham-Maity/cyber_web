"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "@/layouts/wrapper";
import CandidateAside from "@/app/components/dashboard/candidate/aside";
import JobAlertArea from "@/app/components/dashboard/candidate/job-alert-area";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getRecommendedJobs } from "@/redux/features/candidate/api";
import { useDispatch } from "react-redux";

const CandidateProfileJobAlertPage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const { currUser } = useAppSelector((s) => s.persistedReducer.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currUser) getRecommendedJobs(dispatch, currUser);
  }, []);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <CandidateAside
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        {/* aside end  */}

        {/* job alert area start */}
        <JobAlertArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* job alert area end */}
      </div>
    </Wrapper>
  );
};

export default CandidateProfileJobAlertPage;
