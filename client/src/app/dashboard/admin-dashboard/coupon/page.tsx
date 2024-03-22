"use client";
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import AdminAside from "@/app/components/dashboard/admin/aside";
import BlogArea from "@/app/components/dashboard/admin/blog-area";
import CouponArea from "@/app/components/dashboard/admin/coupon-area";

const AdminDashboardProfilePage = () => {
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

        {/* profile area start */}
        <CouponArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* profile area end */}
      </div>
    </Wrapper>
  );
};

export default AdminDashboardProfilePage;
