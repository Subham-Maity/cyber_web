"use client";
import React, { useState, useEffect } from "react";
import Wrapper from "@/layouts/wrapper";
import EmployAside from "@/app/components/dashboard/employ/aside";
import SavedCandidateArea from "@/app/components/dashboard/employ/saved-candidate-area";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getSavedCandidate } from "@/redux/features/employer/api";

const EmployDashboardSavedCandidatePage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  const { page, savedCandidates } = useAppSelector((s) => s.employer);

  useEffect(() => {
    if (currUser) getSavedCandidate(dispatch, { employerId: currUser, page });
  }, [page]);

  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <EmployAside
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        {/* aside end  */}

        {/* saved candidate area start */}
        {savedCandidates && (
          <SavedCandidateArea
            setIsOpenSidebar={setIsOpenSidebar}
            savedCandidates={savedCandidates}
          />
        )}
        {/* saved candidate area end */}
      </div>
    </Wrapper>
  );
};

export default EmployDashboardSavedCandidatePage;
