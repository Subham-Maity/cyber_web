"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import AdminAside from "@/app/components/dashboard/admin/aside";
import AdminMembershipArea from "@/app/components/dashboard/admin/membership-area";

const AdminDashboardMembershipPage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <AdminAside
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        {/* aside end  */}

        {/* membership area start */}
        <AdminMembershipArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* membership area end */}
      </div>
    </Wrapper>
  );
};

export default AdminDashboardMembershipPage;
