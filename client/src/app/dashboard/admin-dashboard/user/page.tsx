"use client";
import AdminAside from "@/app/components/dashboard/admin/aside";
import UserList from "@/app/components/dashboard/admin/userList";
import Wrapper from "@/layouts/wrapper";
import { useState } from "react";
const CandidateDashboardSavedJobPage = () => {
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

        {/* saved job area start */}
        {<UserList setIsOpenSidebar={setIsOpenSidebar} />}
        {/* saved job area end */}
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardSavedJobPage;
