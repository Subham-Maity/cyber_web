"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import EmployAside from "@/app/components/dashboard/employ/aside";
import AdminProfileArea from "@/app/components/dashboard/admin/profile-area";

const AdminDashboardProfilePage = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <EmployAside
          isOpenSidebar={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
        />
        {/* aside end  */}

        {/* profile area start */}
        <AdminProfileArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* profile area end */}
      </div>
    </Wrapper>
  );
};

export default AdminDashboardProfilePage;
