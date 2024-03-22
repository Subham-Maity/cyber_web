import React, { useEffect, useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import EmployJobItem from "./job-item";
import EmployShortSelect from "./short-select";
import { IJobPost } from "@/types/jobPost-type";
import DeepMenus from "@/layouts/headers/component/deep-dash-nav";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setPageForJobPostEmployer } from "@/redux/features/jobPost/slice";
import Pagination from "@/ui/pagination";
import { getJobPostsForEmployer } from "@/redux/features/jobPost/api";
import EmployerJobFilterModal from "../../common/popup/employerJobFilterModal";
import Loader from "@/ui/loader";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  // jobPosts: IJobPost[];
};
const EmployJobArea = ({ setIsOpenSidebar }: IProps) => {
  const dispatch = useAppDispatch();
  const filterState = useAppSelector((state) => state.emplyerJobPostFilter);
  const { status, company:{companyId}, jobCode, title } = filterState;
  const {
    jobPostsForEmployer,
    currentPageForJobPostEmployer,
    totalJobPostPagesForEmployer,
    totalJobPostsForEmployer,
    pageSizeForJobPostEmployer,
    loading
  } = useAppSelector((state) => state.jobPost);
  const { currEmployer } = useAppSelector((state) => state.employer);
  const handlePageClick = (event: { selected: number }) => {
    console.log("from pagination", event.selected);
    dispatch(setPageForJobPostEmployer(event.selected + 1));
  };
  const [value,setValue] = useState<number[]>([]);

  useEffect(() => {
    if (currEmployer)
      getJobPostsForEmployer(
        dispatch,
        currEmployer._id,
        currentPageForJobPostEmployer,
        filterState
      );
      console.log(companyId)
  }, [
    currentPageForJobPostEmployer,
    currEmployer,
    status,
    companyId,
    jobCode,
    title,
  ]);
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex d-sm-flex align-items-center justify-content-between mb-20 lg-mb-30">
          {/* <h2 className="main-title m0">My Jobs</h2> */}
          <DeepMenus />
          {/* <div className="d-flex ms-auto xs-mt-30">
            <div
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
            </div>
            <div className="short-filter d-flex align-items-center ms-auto">
              <div className="text-dark fw-500 me-2">Short by:</div>
              <EmployShortSelect />
            </div>
          </div> */}
        </div>

        <div className="bg-white card-box border-20">
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="a1" role="tabpanel">
              <div className="table-responsive">
                <table className="table job-alert-table">
                  <thead>
                    <tr>
                      <th className="col-xl-4 col-md-4 col-sm-6" scope="col">Title</th>
                      <th className="col-xl-2 col-md-4 col-sm-6 text-center" scope="col">Job Created</th>
                      <th className="col-xl-2 col-md-4 col-sm-6 text-center" scope="col">Applicants</th>
                      <th className="col-xl-1 col-md-4 col-sm-6" scope="col">Status</th>
                      <th className="col-xl-1 col-md-4 col-sm-6" scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="border-0">
                  
                    {!loading && jobPostsForEmployer?.map((job) => {
                      let createdAt: string | Date = new Date(job.createdAt);
                      createdAt = createdAt.toLocaleDateString();

                      return (
                        <EmployJobItem
                          // job= {job}
                          title={job.title}
                          info={`${job.preferredExperience} . ${job.jobType[0]}`}
                          application={`${job.candidates.length}`}
                          date={createdAt}
                          status={job.status}
                          id={job._id}
                          jobCode={job.jobCode}
                        />
                      );
                    })}
                  </tbody>
                </table>
                {loading && (<Loader />)}
                {!loading && jobPostsForEmployer?.length === 0 && ( 
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
                      No Job Posts yet!
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
                      <th scope="col">Job Created</th>
                      <th scope="col">Applicants</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
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

            {totalJobPostsForEmployer > pageSizeForJobPostEmployer && (
              <Pagination
                pageCount={totalJobPostPagesForEmployer}
                handlePageClick={handlePageClick}
                currPage={currentPageForJobPostEmployer}
              />
            )}
          </div>
        </div>

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

      </div>
      <EmployerJobFilterModal 
      // maxPrice={0}
      //   priceValue={[0,20]}
      //   setPriceValue={setValue} 
      />
    </div>
  );
};

export default EmployJobArea;
