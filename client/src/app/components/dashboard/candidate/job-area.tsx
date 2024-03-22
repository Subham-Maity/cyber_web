import React, { useEffect } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import CandidateJobItem from "./job-item";
import EmployShortSelect from "../employ/short-select";
import { IJobApp } from "@/types/job-app-type";
import { IJobPost } from "@/types/jobPost-type";
import Pagination from "@/ui/pagination";
import ChatModal from "../../common/popup/chatModal";
import FeedbackModal from "../../common/popup/feedback";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getallJobAppByCandidateWithJobPost } from "@/redux/features/jobApp/api";
import { setPage } from "@/redux/features/jobApp/slice";
import Loader from "@/ui/loader";
import SubscriptionModal from "../../model/subscriptionModel";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmployJobArea = ({ setIsOpenSidebar }: IProps) => {
  // console.log(jobApps);
  const dispatch = useAppDispatch();
  const {
    allJobAppByCandidateWithJobPostPagination,
    currentPage,
    totalPages,
    itemsPerPage,
    totalJobsApplied,
    loading,
  } = useAppSelector((state) => state.jobApplication);
  const { subscriptionModel } = useAppSelector((state) => state.model);
  const { currCandidate } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  useEffect(() => {
    if (currCandidate)
      getallJobAppByCandidateWithJobPost(
        dispatch,
        currCandidate?._id,
        currentPage,
        "true"
      );
  }, [currentPage, currCandidate]);
  // console.log(allJobAppByCandidateWithJobPostPagination);
  const handlePageClick = (event: { selected: number }) => {
    dispatch(setPage(event.selected + 1));
  };

  return (
    <>
      <div className="dashboard-body">
        <div className="position-relative">
          {/* header start */}
          <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
          {/* header end */}

          <div className="d-sm-flex align-items-center justify-content-between mb-30 lg-mb-30">
            <h2 className="main-title m0">Applied Jobs</h2>
            
            <div className="d-flex ms-auto xs-mt-30">
              {/* <div
              className="nav nav-tabs tab-filter-btn me-4"
              id="nav-tab"
              role="tablist"
            >
              <button
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#a1"
                type="button"
                role="tab"
                aria-selected="true"
              >
                All
              </button>
              <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#a2"
                type="button"
                role="tab"
                aria-selected="false"
              >
                New
              </button>
            </div> */}
              {/* <div className="short-filter d-flex align-items-center ms-auto">
              <div className="text-dark fw-500 me-2">Short by:</div>
              <EmployShortSelect />
            </div> */}
            </div>
          </div>
          <div className="mb-20">
          <h4 style={{fontWeight:'100', fontSize:'large'}}>Keep track of positions you've applied </h4>
          </div>
          <div className="bg-white card-box border-20">
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="a1"
                role="tabpanel"
              >
                <div className="table-responsive">
                  <table className="table job-alert-table">
                    <thead>
                      <tr>
                        <th className="col-xl-3 col-md-4 col-sm-6" scope="col">
                          Title
                        </th>
                        <th className="col-xl-3 col-md-4 col-sm-6" scope="col">
                          Applied On
                        </th>
                        <th className="col-xl-2 col-md-4 col-sm-6" scope="col">
                          Salary
                        </th>
                        <th className="col-xl-2 col-md-4 col-sm-6" scope="col">
                          Status
                        </th>
                        <th className="col-xl-3 col-md-4 col-sm-6" scope="col">
                          Updated On
                        </th>
                        <th className="col-xl-1 col-md-4 col-sm-6" scope="col">
                          Options
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-0">
                      {!loading &&
                        allJobAppByCandidateWithJobPostPagination?.map(
                          (app) => {
                            // let ceratedAt: Date | string = new Date(app.createdAt);
                            // ceratedAt = ceratedAt.toLocaleDateString();

                            let updatedAt: Date | string = new Date(
                              app.updatedAt
                            );
                            updatedAt = updatedAt.toLocaleDateString();

                            if (typeof app.jobPost !== "string") {
                              return (
                                <CandidateJobItem
                                  jobId={app.jobPost._id}
                                  jobAppId={app._id}
                                  title={app.jobPost.title}
                                  jobCode={app.jobPost.jobCode}
                                  info={`${app.jobPost.jobType[0]} . ${app.jobPost.location}`}
                                  application={`$ ${app.jobPost.salary.minimum} - ${app.jobPost.salary.maximum} K /month`}
                                  date={app.createdAt}
                                  status={app.status}
                                  updatedAt={updatedAt}
                                />
                              );
                            }
                          }
                        )}
                    </tbody>
                  </table>
                  {loading && <Loader />}
                  {!loading &&
                    allJobAppByCandidateWithJobPostPagination?.length === 0 && (
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
                        Please apply! to see job applications
                      </p>
                    )}
                </div>
              </div>
              {/* <div className="tab-pane fade" id="a2" role="tabpanel">
              <div className="table-responsive">
                <table className="table job-alert-table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Job Applied</th>
                      <th scope="col">Salary</th>
                      <th scope="col">Status</th>
                      <th scope="col">Updated At</th>
                    </tr>
                  </thead>
                  <tbody className="border-0">
                    <EmployJobItem
                      title="Marketing Specialist"
                      info="Part-time . Uk"
                      application="20"
                      date="13 Aug, 2023"
                      status="pending"
                    />

                    <EmployJobItem
                      title="Brand & Producr Designer"
                      info="Fulltime . Spain"
                      application="130"
                      date="05 Jun, 2023"
                      status="active"
                    />

                    <EmployJobItem
                      title="Developer for IT company"
                      info="Fulltime . Germany"
                      application="70"
                      date="14 Feb, 2023"
                      status="active"
                    />

                    <EmployJobItem
                      title="Accounting Manager"
                      info="Fulltime . USA"
                      application="278"
                      date="27 Sep, 2023"
                      status="expired"
                    />
                  </tbody>
                </table>
              </div>
            </div> */}
            </div>
          </div>
          {totalJobsApplied > itemsPerPage && (
            <Pagination
              pageCount={totalPages}
              handlePageClick={handlePageClick}
              currPage={currentPage}
            />
          )}
        </div>
      </div>
      <ChatModal />
      <FeedbackModal />
      {subscriptionModel && <SubscriptionModal />}
    </>
  );
};

export default EmployJobArea;
