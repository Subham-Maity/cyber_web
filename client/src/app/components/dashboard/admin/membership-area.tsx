"use client";
import React, { useState, useEffect } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import SubscriptionModel from "./subscriptionModel";
import CandidateSub from "./subscription/candidateSub";
import EmployerSub from "./subscription/EmployerSub";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  getCandidateSub,
  getEmploySub,
} from "@/redux/features/subscription/api";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployMembershipArea = ({ setIsOpenSidebar }: IProps) => {
  const [isCandidate, setIsCandidate] = useState<boolean>(() => {
    const storedValue = localStorage.getItem("isCandidate");
    return storedValue ? JSON.parse(storedValue) : false;
  });
  console.log("candidate value is", isCandidate);
  const handleToggle = () => {
    const newCandidate = !isCandidate;
    localStorage.setItem("isCandidate", newCandidate.toString());
    setIsCandidate((prev) => !prev);
  };

  const dispatch = useAppDispatch();
  const { employSub, candidateSub } = useAppSelector((s) => s.subscription);

  useEffect(() => {
    let storedValue: string | boolean | null =
      localStorage.getItem("isCandidate");

    if (storedValue) {
      storedValue = JSON.parse(storedValue);
    } else {
      storedValue = false;
    }

    if (storedValue) {
      getCandidateSub(dispatch);
    } else {
      getEmploySub(dispatch);
    }
  }, [isCandidate]);

  return (
    <>
      <div className="dashboard-body">
        <div className="position-relative">
          {/* header start */}
          <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
          {/* header end */}

          <div className="d-flex justify-content-between align-items-center  ">
            <div className=" d-flex gap-3 py-4">
              <h2 className="main-title mb-0 ">Membership </h2>
              {/* <button
                className="btn-one justify-content-center"
                data-bs-toggle="modal"
                data-bs-target="#subscriptionModel"
                type="button"
              >
                Add{" "}
              </button> */}
            </div>
            <div className="subscription-tab align-content-center py-2  d-flex gap-3 px-2">
              <p
                onClick={handleToggle}
                className={`p-1 px-2 ${isCandidate && "active"}`}
              >
                Candidate
              </p>
              <p
                onClick={handleToggle}
                className={`p-1 px-2 ${!isCandidate && "active"}`}
              >
                Employer
              </p>
            </div>
          </div>

          {/* <div className="membership-plan-wrapper mb-20">
            <div className="row gx-0">
              <div className="col-xxl-7 col-lg-6 d-flex flex-column">
                <div className="column w-100 h-100">
                  <h4>Current Plan (Gold)</h4>
                  <p>
                    Unlimited access to our legal document library and online
                    rental application tool, billed monthly.
                  </p>
                </div>
              </div>
              <div className="col-xxl-5 col-lg-6 d-flex flex-column">
                <div className="column border-left w-100 h-100">
                  <div className="d-flex">
                    <h3 className="price m0">$29</h3>
                    <div className="ps-4 flex-fill">
                      <h6>Monthly Plan</h6>
                      <span className="text1 d-block">
                        Your subscription renews{" "}
                        <span className="fw-500">July 12th, 2023</span>
                      </span>
                      <a href="#" className="cancel-plan tran3s">
                        Cancel Current Plan
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {isCandidate ? (
            <CandidateSub subscriptionArr={candidateSub} />
          ) : (
            <EmployerSub subscriptionArr={employSub} />
          )}
        </div>
      </div>
      <SubscriptionModel />
    </>
  );
};

export default EmployMembershipArea;
