"use client";
import React, { useEffect, useState } from "react";
import candidate_data from "@/data/candidate-data";
import CandidateListItem from "./utils/candidateList";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getCandidates } from "@/redux/features/candidate/api";
import Pagination from "@/ui/pagination";
import { setPage } from "@/redux/features/admin/slice";
import Loader from "@/ui/loader";
import { getAllCandidate } from "@/redux/features/admin/api";

const CandidateList = () => {
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);

  const { candidatesFA, pageFC, totalCandidate, totalNumOfPageFC, loading } =
    useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.userFilter);
  const { candidateName, type, date } = filter;
  useEffect(() => {
    setTimeout(() => {
      getAllCandidate(dispatch, { page: pageFC, limit: 8 },filter);
    }, 1000);
  }, [pageFC, candidateName, type,date]);
  const itemsPerPage = 8;

  const handlePageClick = (event: { selected: number }) => {
    dispatch(setPage(event.selected + 1));
  };
  console.log("candidatesFA", candidatesFA);

  return (
    <section className="candidates-profile  pb-160 xl-pb-150 lg-pb-80">
      <div className="container">
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

          <div className=" w-100 ">
            {!loading ? (
              <div className="">
                <div className="upper-filter d-flex justify-content-between align-items-center mb-20">
                  <div className="total-job-found">
                    All{" "}
                    <span className="text-dark fw-500">{totalCandidate}</span>{" "}
                    candidates found
                  </div>
                  {/* <div className="d-flex align-items-center">
                    <div className="short-filter d-flex align-items-center">
                      <div className="text-dark fw-500 me-2">Short:</div>
                      <ShortSelect />
                    </div>
                    <button
                      onClick={() => setJobType("list")}
                      className={`style-changer-btn text-center rounded-circle tran3s ms-2 list-btn ${
                        jobType === "grid" ? "active" : ""
                      }`}
                      title="Active List"
                    >
                      <i className="bi bi-list"></i>
                    </button>
                    <button
                      onClick={() => setJobType("grid")}
                      className={`style-changer-btn text-center rounded-circle tran3s ms-2 grid-btn ${
                        jobType === "list" ? "active" : ""
                      }`}
                      title="Active Grid"
                    >
                      <i className="bi bi-grid"></i>
                    </button>
                  </div> */}
                </div>

                {/* <div
                  className={`accordion-box grid-style ${
                    jobType === "grid" ? "show" : ""
                  }`}
                >
                  <div className="row">
                    {candidates?.map((item) => (
                      <div key={item._id} className="col-xxl-4 col-sm-6 d-flex">
                        <CandidateGridItem item={item} />
                      </div>
                    ))}
                  </div>
                </div> */}

                <div
                  className={`accordion-box list-style ${
                    "list" === "list" ? "show" : ""
                  }`}
                >
                  {candidatesFA?.map((item) => (
                    <CandidateListItem key={item._id} item={item} />
                  ))}
                </div>

                {candidatesFA && (
                  <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                    <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                      Showing{" "}
                      <span className="text-dark fw-500">
                        {(pageFC - 1) * itemsPerPage + 1}
                      </span>{" "}
                      to{" "}
                      <span className="text-dark fw-500">
                        {Math.min(pageFC * itemsPerPage, totalCandidate)}
                      </span>{" "}
                      of{" "}
                      <span className="text-dark fw-500">{totalCandidate}</span>
                    </p>

                    {totalCandidate > itemsPerPage && (
                      <Pagination
                        pageCount={totalNumOfPageFC}
                        handlePageClick={handlePageClick}
                        currPage={pageFC}
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

export default CandidateList;
