"use client";
import React, {useState} from "react";
import Wrapper from "@/layouts/wrapper";
import AdminAside from "@/app/components/dashboard/admin/aside";
import AdminEmailSettings from "@/app/components/dashboard/admin/emailSettings";

const AdminDashboardEmailSettings = () => {
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

        
        <AdminEmailSettings setIsOpenSidebar={setIsOpenSidebar} />
        
      </div>
    </Wrapper>
  );
};

export default AdminDashboardEmailSettings; 