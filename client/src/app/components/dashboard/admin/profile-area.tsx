"use client";
import React, { useState } from "react";
import "react-phone-number-input/style.css";
import DashboardHeader from "../candidate/dashboard-header";
import CreateCompany from "./company/createCompany";
import CompanyList from "./company/companyList";
import { is } from "date-fns/locale";
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployProfileArea = ({ setIsOpenSidebar }: IProps) => {
  const [isCandidate, setIsCandidate] = useState(true);
  const handleToggle = () => {
    setIsCandidate((prev) => !prev);
  };
  return (
    <div className="dashboard-body">
      <div className="position-relative candidates-profile-details">
        {/* header start */}

        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <div className="subscription-tab align-content-center py-2  d-flex gap-3 px-2">
            <p
              onClick={handleToggle}
              className={`p-1 px-2 ${isCandidate && "active"}`}
            >
              Create
            </p>
            <p
              onClick={handleToggle}
              className={`p-1 px-2 ${!isCandidate && "active"}`}
            >
              Companies
            </p>
          </div>
        </div>

        <div className="wrapper">
          {isCandidate ? <CreateCompany /> : <CompanyList />}
        </div>
      </div>
    </div>
  );
};

export default EmployProfileArea;
