"use client";
import React, {useState} from "react";
import Wrapper from "@/layouts/wrapper";
import AdminAside from "@/app/components/dashboard/admin/aside";
import AdminTemplateArea from "@/app/components/dashboard/admin/template-area";

const AdminDashboardEmailTemplate = () => {
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

        {/* Template area */}
        <AdminTemplateArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* Template area end */}
      </div>
    </Wrapper>
  );
};

export default AdminDashboardEmailTemplate;