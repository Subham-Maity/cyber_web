"use client";
import React from "react";
import DashboardHeader from "../candidate/dashboard-header";
import candidate_data from "@/data/candidate-data";
import CandidateItem from "./candidate-item";
import EmployShortSelect from "./short-select";
import { ICandidate } from "@/types/user-type";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Pagination from "@/ui/pagination";
import { setPage } from "@/redux/features/employer/dashboardSlice";
import Loader from "@/ui/loader";
import Link from "next/link";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  savedCandidates: ICandidate[];
};

const SavedCandidateArea = ({ setIsOpenSidebar, savedCandidates }: IProps) => {
  const dispatch = useAppDispatch();
  const {page, totalCandidate, totalNumOfPage, itemsPerPage,loading} = useAppSelector((state) => state.employer)
  const handlePageClick = (event: { selected: number }) => {
    dispatch(setPage(event.selected + 1));
  }
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-block d-sm-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <div>
          <h2 className="main-title m0">Saved Candidate</h2>
          </div>
          {/* <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Short by:</div>
            <EmployShortSelect />
          </div> */}
           <div className="justify-content-end d-block d-sm-flex mt-3 mt-sm-0">
          <Link
          href='/candidates-v1'>
          <button className="btn-two tran3s">
            Visit Candidates
          </button>
          </Link>
        </div>
        </div>
        <div className="mb-20">
          <h4 style={{fontWeight:'100', fontSize:'large'}}>Navigate through your saved candidates with ease..</h4>
          </div>
        
        <div className="wrapper">
        {loading && (<Loader />)}
          {!loading && savedCandidates?.map((item) => (
            <CandidateItem key={item._id} item={item} />
          ))}
        </div>
        {!loading && savedCandidates?.length === 0 && (
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
                      No candidates saved!
                    </p>
                  )}

        {/* <div className="dash-pagination d-flex justify-content-end mt-30">
          <ul className="style-none d-flex align-items-center">
            <li>
              <a href="#" className="active">
                1
              </a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
            <li>..</li>
            <li>
              <a href="#">7</a>
            </li>
            <li>
              <a href="#">
                <i className="bi bi-chevron-right"></i>
              </a>
            </li>
          </ul>
        </div> */}
         {totalCandidate > itemsPerPage && (
                        <Pagination
                          pageCount={totalNumOfPage}
                          handlePageClick={handlePageClick}
                          currPage={page}
                        />
                      )}
      </div>
    </div>
  );
};

export default SavedCandidateArea;
