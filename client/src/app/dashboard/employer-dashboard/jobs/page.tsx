"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "@/layouts/wrapper";
import EmployAside from "@/app/components/dashboard/employ/aside";
import EmployJobArea from "@/app/components/dashboard/employ/job-area";
// import { getJobPostsForEmployer } from "@/redux/features/jobPost/api";
import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";

const EmployDashboardJobsPage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  // const dispatch = useDispatch();
  // const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  

  // useEffect(() => {
  //   if (currUser) getJobPostsForEmployer(dispatch, currUser);
  // }, []);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <EmployAside
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        {/* aside end  */}

        {/* job area start */}
         {
          <EmployJobArea
            setIsOpenSidebar={setIsOpenSidebar}
            
          />
        }

        {/* job area end */}
      </div>
    </Wrapper>
  );
};

export default EmployDashboardJobsPage;
