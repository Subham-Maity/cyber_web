"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "@/layouts/wrapper";
import CandidateAside from "@/app/components/dashboard/candidate/aside";
import CandidateJobArea from "@/app/components/dashboard/candidate/job-area";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { getallJobAppByCandidateWithJobPost } from "@/redux/features/jobApp/api";

const EmployDashboardJobsPage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  // const dispatch = useAppDispatch();
  // const { allJobAppByCandidateWithJobPost, currentPage } = useAppSelector(
  //   (state) => state.jobApplication
  // );

  // const { currUser } = useAppSelector((state) => state.persistedReducer.user);

  // useEffect(() => {
  //   if (currUser) getallJobAppByCandidateWithJobPost(dispatch, currUser, currentPage);
  // }, []);

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <CandidateAside
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        {/* aside end  */}

        {/* job area start */}
         
          <CandidateJobArea
            setIsOpenSidebar={setIsOpenSidebar}
          />
        
        {/* job area end */}
      </div>
    </Wrapper>
  );
};

export default EmployDashboardJobsPage;
