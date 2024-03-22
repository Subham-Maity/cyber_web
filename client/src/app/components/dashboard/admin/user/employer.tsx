"use client";
import { getAllCandidate, getAllEmployer } from "@/redux/features/admin/api";
import { setPage } from "@/redux/features/admin/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Loader from "@/ui/loader";
import Pagination from "@/ui/pagination";
import { useEffect } from "react";
import EmployerListItem from "./utils/employerList";

const EmployerList = () => {
  const { employerFA, totalEmployer, pageFE, totalNumOfPageFE, loading } =
    useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.userFilter);
  const { candidateName, type, date } = filter;
  useEffect(() => {
    getAllEmployer(dispatch, { page: pageFE, limit: 8 }, filter);
  }, [pageFE, candidateName, type,date]);
  const itemsPerPage = 8;

  const handlePageClick = (event: { selected: number }) => {
    dispatch(setPage(event.selected + 1));
  };
  console.log("candidatesFA", employerFA);

  return (
    <section className="candidates-profile pb-160 xl-pb-150 lg-pb-80">
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
                    <span className="text-dark fw-500">{totalEmployer}</span>{" "}
                    employers found
                  </div>
                </div>

                <div
                  className={`accordion-box list-style ${
                    "list" === "list" ? "show" : ""
                  }`}
                >
                  {employerFA?.map((item) => (
                    <EmployerListItem key={item._id} item={item} />
                  ))}
                </div>

                {employerFA && (
                  <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                    <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                      Showing{" "}
                      <span className="text-dark fw-500">
                        {(pageFE - 1) * itemsPerPage + 1}
                      </span>{" "}
                      to{" "}
                      <span className="text-dark fw-500">
                        {Math.min(pageFE * itemsPerPage, totalEmployer)}
                      </span>{" "}
                      of{" "}
                      <span className="text-dark fw-500">{totalEmployer}</span>
                    </p>

                    {totalEmployer > itemsPerPage && (
                      <Pagination
                        pageCount={totalNumOfPageFE}
                        handlePageClick={handlePageClick}
                        currPage={pageFE}
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

export default EmployerList;
