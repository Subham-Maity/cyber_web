"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import CandidateAside from "@/app/components/dashboard/candidate/aside";
import CandidateMembershipArea from "@/app/components/dashboard/candidate/membership-area";

const EmployDashboardMembershipPage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <CandidateAside
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        {/* aside end  */}

        {/* membership area start */}
        <CandidateMembershipArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* membership area end */}
      </div>
    </Wrapper>
  );
};

export default EmployDashboardMembershipPage;
