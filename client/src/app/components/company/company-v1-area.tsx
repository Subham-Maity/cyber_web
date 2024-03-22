"use client";
import { getCompanies } from "@/redux/features/company/api";
import { setPage } from "@/redux/features/company/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Loader from "@/ui/loader";
import Pagination from "@/ui/pagination";
import { useEffect, useState } from "react";
import CompanyGridItem from "./company-grid-item";
import CompanyListItem from "./company-list-item";
import CompanyV1Filter from "./filter/company-v1-filter";

const CompanyV1Area = ({ style_2 = false }: { style_2?: boolean }) => {
  const dispatch = useAppDispatch();
  const filterState = useAppSelector((state) => state.company.companyFilter);
  const { currUser, userRole } = useAppSelector(
    (state) => state.persistedReducer.user
  );
  const { subscriptionModel } = useAppSelector((state) => state.model);
  const { currCandidate } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const { name, teamSize, location } = filterState;
  const { companies, totalCompanies, totalNumOfPage, loading, page } =
    useAppSelector((state) => state.company.companyList);

  const [jobType, setJobType] = useState<string>(style_2 ? "list" : "grid");

  useEffect(() => {
    // dispatch(setSubscriptionModel(true));
    getCompanies(dispatch, filterState, page, currUser ? currUser : "");
  }, [name, teamSize, page, location]);

  const handlePageClick = (event: { selected: number }) => {
    dispatch(setPage(event.selected + 1));
  };
  return (
    <>
      <section className="company-profiles pt-160 lg-pt-140 pb-160 xl-pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <button
                type="button"
                className="filter-btn w-100 pt-2 pb-2 h-auto fw-500 tran3s d-lg-none mb-40"
                data-bs-toggle="offcanvas"
                data-bs-target="#filteroffcanvas"
              >
                <i className="bi bi-funnel"></i>
                Filter
              </button>
              <div
                className="filter-area-tab offcanvas offcanvas-start"
                id="filteroffcanvas"
              >
                <button
                  type="button"
                  className="btn-close text-reset d-lg-none"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
                <div className="main-title fw-500 text-dark">Filter By</div>
                {/* CompanyV1Filter */}
                <CompanyV1Filter />
                {/* CompanyV1Filter */}
              </div>
            </div>

            <div className="col-xl-9 col-lg-8">
              {!loading ? (
                <div className="ms-xxl-5 ms-xl-3">
                  <div className="upper-filter d-flex justify-content-between align-items-center mb-20">
                    <div className="total-job-found">
                      Total{" "}
                      <span className="text-dark fw-500">{totalCompanies}</span>{" "}
                      {totalCompanies > 1 ? "companies" : "company"} found
                    </div>
                    <div className="d-flex align-items-center">
                      {/* <div className="short-filter d-flex align-items-center">
                    <div className="text-dark fw-500 me-2">Short:</div>
                    <ShortSelect />
                  </div> */}
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
                    </div>
                  </div>

                  <div
                    className={`accordion-box grid-style ${
                      jobType === "grid" ? "show" : ""
                    }`}
                  >
                    <div className="row">
                      {companies.map((item) => (
                        <div
                          key={item._id}
                          className="col-xl-4 col-lg-6 col-md-4 col-sm-6 d-flex"
                        >
                          <CompanyGridItem item={item} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`accordion-box list-style ${
                      jobType === "list" ? "show" : ""
                    }`}
                  >
                    {companies?.map((item) => (
                      <CompanyListItem key={item._id} item={item} />
                    ))}
                  </div>

                  {companies && (
                    <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                      <p className="m0 order-last text-center text-sm-start xs-pb-20 align-items-center">
                        Showing{" "}
                        <span className="text-dark fw-500">
                          {totalCompanies > 0 ? (page - 1) * 8 + 1 : 0}
                        </span>{" "}
                        to{" "}
                        <span className="text-dark fw-500">
                          {Math.min(page * 8, totalCompanies)}
                        </span>{" "}
                        of{" "}
                        <span className="text-dark fw-500">
                          {totalCompanies}
                        </span>
                      </p>

                      {totalCompanies > 8 && (
                        <Pagination
                          pageCount={totalNumOfPage}
                          handlePageClick={handlePageClick}
                          currPage={page}
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
    </>
  );
};

export default CompanyV1Area;
