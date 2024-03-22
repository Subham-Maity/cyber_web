"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "@/layouts/wrapper";
import CandidateAside from "@/app/components/dashboard/candidate/aside";
import SavedJobArea from "@/app/components/dashboard/candidate/saved-job-area";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getSavedJobs } from "@/redux/features/candidate/api";
const CandidateDashboardSavedJobPage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  const { savedJobsPage, savedJobs } = useAppSelector(
    (s) => s.candidate.candidateDashboard
  );

  useEffect(() => {
    if (currUser) getSavedJobs(dispatch, currUser, savedJobsPage);
  }, [savedJobsPage]);

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <CandidateAside
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        {/* aside end  */}

        {/* saved job area start */}
        {savedJobs && (
          <SavedJobArea
            setIsOpenSidebar={setIsOpenSidebar}
            savedJobs={savedJobs}
          />
        )}
        {/* saved job area end */}
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardSavedJobPage;
