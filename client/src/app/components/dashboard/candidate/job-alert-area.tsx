import React from "react";
import DashboardHeader from "./dashboard-header";
import JobAlertItem from "./job-alert-item";
import ShortSelect from "../../common/short-select";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import job_img_1 from "@/assets/images/logo/media_22.png";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/ui/loader";
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const JobAlertArea = ({ setIsOpenSidebar }: IProps) => {
  const { recommendedJobs,loading } = useAppSelector(
    (s) => s.candidate.candidateDashboard
  );
  return (
    <div className="dashboard-body">
      
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Job Alert </h2>
          {/* <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Short by:</div>
            <ShortSelect />
          </div> */}
        </div>
        {loading && (<Loader />)}
        <div className="wrapper">
        {!loading && recommendedJobs?.length === 0 && (
          <div
        
          className="job-list-one style-two position-relative mb-20"
        >
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
                        No job alerts based on your skills!
                      </p>
                      </div>
                    )}
          {!loading && recommendedJobs?.map((obj) => {
            const j = obj.job;
            const score = obj.score;

            return (
              <div
                key={j._id}
                className="job-list-one style-two position-relative mb-20"
              >
                <div className="row justify-content-between align-items-center">
                  <div className="col-xxl-3 col-lg-4">
                    <div className="job-title d-flex align-items-center">
                      <Link href={`/job-details-v1/${j._id}`} className="logo">
                        <Image
                          src={typeof j.companyId!=="string"?j.companyId.logo:job_img_1}
                          alt="img"
                          className="lazy-img m-auto"
                          width={50}
                          height={50}
                        />
                      </Link>
                      <Link
                        href={`/job-details-v1/${j._id}`}
                        className="title fw-500 tran3s"
                      >
                        {j.title}
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 ms-auto">
                    {j?.jobType.map((val, index) => (
                      <Link
                        href={`/job-details-v1/${j._id}`}
                        className={`job-duration fw-500 mx-1 ${
                          val == "part-time" ? "part-time" : ""
                        }`}
                      >
                        {`${val} ${" "}`}
                      </Link>
                    ))}
                    <div className="job-salary">
                      <span className="fw-500 text-dark">
                        ${j.salary.minimum}-{j.salary.maximum}
                      </span>{" "}
                      / {"monthly"} . {j.preferredExperience.join(", ")}
                    </div>
                  </div>
                  <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 ms-auto xs-mt-10">
                    <div className="job-location">
                      <span></span>
                      {j.location.map((l, i) => (
                        <span>{l}</span>
                      ))}
                    </div>
                    <div className="job-category">
                      {j.primarySkills.map((c, i) => (
                        <Link key={i} href={`/job-details-v1/${j._id}`}>
                          {c}
                          {i < j.primarySkills.length - 1 && ", "}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-4">
                    {/* <div className="action-dots float-end">
                      <button
                        className="action-btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span></span>
                      </button>
                      
                      <ActionDropdown id={j._id} jobAppId={j._id} />
                      
                    </div> */}
                    <div className="float-end">
                      <div className="">{score} %</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    // <div className="dashboard-body">
    //   <div className="position-relative">
    //     {/* header start */}
    //     <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
    //     {/* header end */}

    //     <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
    //       <h2 className="main-title m0">Job Alerts</h2>
    //       {/* <div className="short-filter d-flex align-items-center">
    //         <div className="text-dark fw-500 me-2">Short by:</div>
    //         <ShortSelect/>
    //       </div> */}
    //     </div>

    //     <div className="bg-white card-box border-20">
    //       <div className="table-responsive">
    //         <table className="table job-alert-table">
    //           <thead>
    //             <tr>
    //               <th scope="col">Title</th>
    //               <th scope="col">Alert </th>
    //               <th scope="col">Job</th>
    //               <th scope="col">Time</th>
    //               <th scope="col">Actions</th>
    //             </tr>
    //           </thead>
    //           <tbody className="border-0">
    //             <JobAlertItem
    //               title="Product Designer"
    //               location="Yearly Salary . Germany"
    //               duration="Fulltime"
    //               category="Design, Product"
    //               found="2"
    //               time="Weekly"
    //             />

    //             <JobAlertItem
    //               title="Marketing"
    //               location="Weekly Salary . United kingdom"
    //               duration="Part-Time"
    //               category="Account, Marketing"
    //               found="13"
    //               time="Monthly"
    //             />

    //             <JobAlertItem
    //               title="Hotel Manager"
    //               location="Yearly Salary . Germany"
    //               duration="Fulltime"
    //               category="Design, Product"
    //               found="7"
    //               time="Daily"
    //             />

    //             <JobAlertItem
    //               title="Developer"
    //               location="Monthly Salary . United States"
    //               duration="Fulltime"
    //               category="Account, Finance"
    //               found="3"
    //               time="Weekly"
    //             />

    //             <JobAlertItem
    //               title="Account Manager"
    //               location="Hourly Salary . Spain"
    //               duration="Part-Time"
    //               category="Account, Finance"
    //               found="9"
    //               time="Monthly"
    //             />
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>

    //     <div className="dash-pagination d-flex justify-content-end mt-30">
    //       <ul className="style-none d-flex align-items-center">
    //         <li>
    //           <a href="#" className="active">
    //             1
    //           </a>
    //         </li>
    //         <li>
    //           <a href="#">2</a>
    //         </li>
    //         <li>
    //           <a href="#">3</a>
    //         </li>
    //         <li>..</li>
    //         <li>
    //           <a href="#">7</a>
    //         </li>
    //         <li>
    //           <a href="#">
    //             <i className="bi bi-chevron-right"></i>
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
  );
};

export default JobAlertArea;
