"use client";
import React, { useEffect, useState } from "react";
import candidate_data from "@/data/candidate-data";
import CandidateListItem from "../user/utils/candidateList";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getCandidates } from "@/redux/features/candidate/api";
import Pagination from "@/ui/pagination";
import { setPage } from "@/redux/features/admin/slice";
import Loader from "@/ui/loader";
import { getAllCandidate, getAllCompany } from "@/redux/features/admin/api";
import CompanyListItem from "./companyListItem";
import { ICompany } from "@/types/company-type";
import { ICompanyForAdmin } from "@/types/for-admin-type";

const CompanyList = () => {
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);

  const { companyFA, pageFCom, totalCompany, totalNumOfPageFCom, loading } =
    useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  const [viewCompanyState, setCompanyState] = useState("my");
  useEffect(() => {
    if (currUser) {
      if (viewCompanyState === "all")
        getAllCompany(dispatch, { page: pageFCom, limit: 8 }, "");
      else {
        getAllCompany(dispatch, { page: pageFCom, limit: 8 }, currUser);
      }
    }
  }, [pageFCom, currUser, viewCompanyState]);
  const itemsPerPage = 8;
const {userRole} = useAppSelector((state) => state.persistedReducer.user);
  const handlePageClick = (event: { selected: number }) => {
    dispatch(setPage(event.selected + 1));
  };
  //   console.log("candidatesFA", companyFA);

  return (
    <section className="candidates-profile sm-pt-10 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
      <div className="container">
        {userRole === "admin" && 
        <div className="d-flex ms-auto xs-mt-30">
          <div
            className="nav nav-tabs tab-filter-btn me-4"
            id="nav-tab"
            role="tablist"
            >
            <button
              className="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#a11"
              type="button"
              role="tab"
              aria-selected="true"
              onClick={() => {
                setCompanyState("my");
                dispatch(setPage(1));
              }}
              >
              My Companies
            </button>
            <button
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#a12"
              type="button"
              role="tab"
              aria-selected="false"
              onClick={() => {
                setCompanyState("all");
                dispatch(setPage(1));
              }}
              >
              All
            </button>
          </div>
        </div>
        }

        <div className="row">
          {/* <div className="col-xl-3 col-lg-4">
            <button
              type="button"
              className="filter-btn w-100 pt-2 pb-2 h-auto fw-500 tran3s d-lg-none mb-40"
              data-bs-toggle="offcanvas"
              data-bs-target="#filteroffcanvas"
            >
              <i className="bi bi-funnel"></i>
              Filter
            </button>
            
            <CandidateV1FilterArea />
            
          </div> */}

          <div className=" w-100 mt-3 ">
            {!loading ? (
              <div className="">
                <div className="upper-filter d-flex justify-content-between align-items-center mb-20">
                  <div className="total-job-found">
                    All <span className="text-dark fw-500">{totalCompany}</span>{" "}
                    companies found
                  </div>
                </div>

                {viewCompanyState === "all" && <div
                  className={`accordion-box list-style ${
                    "list" === "list" ? "show" : ""
                  }`}
                  id="a11"
                >
                  {companyFA?.length === 0 && (
                    <p
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "1.5em",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#888",
                      }}
                    >
                      No Companies yet!
                    </p>
                  )}
                  {companyFA?.map((item) => (
                    <CompanyListItem key={item._id} item={item} />
                  ))}
                </div>}

                {viewCompanyState==="my" && <div
                  className={`accordion-box list-style ${
                    "list" === "list" ? "show" : ""
                  }`}
                  id="a12"
                >
                  {companyFA?.length === 0 && (
                    <p
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "1.5em",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#888",
                      }}
                    >
                      No Companies yet!
                    </p>
                  )}
                  {companyFA?.map((item) => (
                    <CompanyListItem key={item._id} item={item} />
                  ))}
                </div>}
                {companyFA.length !== 0 && (
                  <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                    <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                      Showing{" "}
                      <span className="text-dark fw-500">
                        {(pageFCom - 1) * itemsPerPage + 1}
                      </span>{" "}
                      to{" "}
                      <span className="text-dark fw-500">
                        {Math.min(pageFCom * itemsPerPage, totalCompany)}
                      </span>{" "}
                      of{" "}
                      <span className="text-dark fw-500">{totalCompany}</span>
                    </p>

                    {totalCompany > itemsPerPage && (
                      <Pagination
                        pageCount={totalNumOfPageFCom}
                        handlePageClick={handlePageClick}
                        currPage={pageFCom}
                      />
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="total-job-found ">
                <div style={{ marginTop: "100px" }}>
                  <Loader />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyList;
