"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import AdminAside from "@/app/components/dashboard/admin/aside";
import DashboardSettingArea from "@/app/components/dashboard/candidate/dashboard-setting";

const AdminDashboardSettingPage = () => {
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

        {/* dashboard area start */}
        <DashboardSettingArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* dashboard area end */}
      </div>
    </Wrapper>
  );
};

export default AdminDashboardSettingPage;
