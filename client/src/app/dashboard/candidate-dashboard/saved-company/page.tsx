"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "@/layouts/wrapper";
import CandidateAside from "@/app/components/dashboard/candidate/aside";
import SavedCompanyArea from "@/app/components/dashboard/candidate/saved-company-area";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getSavedCompanies } from "@/redux/features/candidate/api";
const CandidateDashboardSavedJobPage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  const { savedCompanyPage, savedCompanies } = useAppSelector(
    (s) => s.candidate.candidateDashboard
  );

  useEffect(() => {
    if (currUser) getSavedCompanies(dispatch, currUser, savedCompanyPage);
  }, [savedCompanyPage]);

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
        {savedCompanies && (
          <SavedCompanyArea
            setIsOpenSidebar={setIsOpenSidebar}
            savedCompanies={savedCompanies}
            />
        )}
        {/* saved job area end */}
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardSavedJobPage;
