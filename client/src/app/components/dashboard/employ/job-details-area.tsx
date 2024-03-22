import React, { useEffect, useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import EmployJobItem from "./job-itmes-for-detals";
import EmployShortSelect from "./short-select";
import { IJobApp } from "@/types/job-app-type";
import { getDate } from "@/utils/helper";
import ChatModal from "../../common/popup/chatModal";
import FeedbackModal from "../../common/popup/feedback";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";
import JobLetterModal from "../../common/popup/jobLetterModer";
import CandidateFilterByJobApp from "../../common/popup/candidateFilterByJobApp";
import { IJobPost } from "@/types/jobPost-type";
import Loader from "@/ui/loader";
import SubscriptionModalForEmployer from "../../model/subscriptionModelEmployer";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  jobApp: IJobApp[];
  jobPostId: string;
};
const EmployJobArea = ({ setIsOpenSidebar, jobApp, jobPostId }: IProps) => {
  const { jobPostsForEmployer } = useAppSelector((state) => state.jobPost);
  const [currJobPost, setCurrJobPost] = useState<IJobPost | null>();
  const { loading } = useAppSelector((state) => state.jobApplication);
  const {subscriptionModelEmployer} = useAppSelector((state) => state.model)
  useEffect(() => {
    const foundJobPost = jobPostsForEmployer.find(
      (job) => job._id === jobPostId
    );
    setCurrJobPost(foundJobPost);
  }, [jobPostsForEmployer, jobPostId]);

  return (
    <>
      <div className="dashboard-body">
        <div className="position-relative">
          {/* header start */}
          <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
          {/* header end */}

          <div className="d-flex d-sm-flex align-items-center justify-content-between mb-30 lg-mb-30" style={{paddingLeft:"25px"}}>
            {/* <div className=" d-flex justify-content-between align-items-center"> */}
              <div className=" d-block d-lg-flex">
              <h2 className="main-title m0 d-flex">
                <Link
                  style={{ color: "#31795A" }}
                  className=""
                  href={`/dashboard/employer-dashboard/jobs`}
                >
                  My Jobs
                </Link>
              </h2>
              <div className="d-flex align-items-end" style={{ fontSize: "large" }} >
                /{currJobPost?.title} ({currJobPost?.jobCode})
              </div>
              </div>
            
            <div className="d-flex justify-content-end">
            <button
              type="button"
              className="filter-btn fw-500 tran3s me-3"
              data-bs-toggle="modal"
              data-bs-target="#candidateFilterForJobApp"
            >
              <i className="bi bi-funnel"></i>
              Filter
            </button>
            </div>
            {/* </div> */}
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
                        <th className="col-xl-4 col-md-4 col-sm-6" scope="col">Name</th>
                        <th className="col-xl-3 col-md-4 col-sm-6" scope="col">Applied At</th>
                        <th className="col-xl-3 col-md-4 col-sm-6 text-center" scope="col">Test Score</th>
                        <th className="col-xl-2 col-md-4 col-sm-6 text-center" scope="col">%Match</th>
                        <th className="col-xl-2 col-md-4 col-sm-6" scope="col">Resume</th>
                        <th className="col-xl-1 col-md-4 col-sm-6" scope="col">Status</th>
                        <th className="col-xl-1 col-md-4 col-sm-6" scope="col">Action</th>
                      </tr>
                    </thead>

                    <tbody className="border-0">
                      {!loading &&
                        jobApp?.map((app) => {
                          const createdAt = getDate(app.createdAt);
                          console.log(jobApp, "Check Error");
                          if (typeof app.candidate !== "string") {
                            return (
                              <>
                                <EmployJobItem
                                  jobPostId={jobPostId}
                                  title={`${app.candidate?.firstName} ${app.candidate?.lastName}`}
                                  info={`${
                                    app.candidate?.location?.city || "Delhi"
                                  }`}
                                  tesScore={String(app.testScore) || "89%"}
                                  date={createdAt}
                                  matchScore={
                                    app?.profileMatchPercent
                                  }
                                  status={app?.status}
                                  id={app.candidate?._id}
                                  appId={app._id}
                                  isFeedbackAsked={app.isFeedbackAsked}
                                  resumes={app.candidate?.resumes}
                                  resumeId={app.appliedWithResume}
                                />
                                <JobLetterModal
                                  candidateName={
                                    app.candidate?.firstName +
                                    " " +
                                    app.candidate?.lastName
                                  }
                                  text={app.jobLetter}
                                />
                              </>
                            );
                          }
                        })}
                    </tbody>
                  </table>
                  {loading && <Loader />}
                  {!loading && jobApp?.length === 0 && (
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
                      No candidates to Show
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatModal />
      <FeedbackModal />
      <CandidateFilterByJobApp />
      {subscriptionModelEmployer && <SubscriptionModalForEmployer />}
    </>
  );
};

export default EmployJobArea;
