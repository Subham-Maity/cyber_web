import job_img_1 from "@/assets/images/logo/media_22.png";
import {
  setSavedCompaniesPage,
  setSavedJobsPage,
} from "@/redux/features/candidate/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IJobPost } from "@/types/jobPost-type";
import Pagination from "@/ui/pagination";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ShortSelect from "../../common/short-select";
import ActionDropdown from "./action-dropdown-company";
import DashboardHeader from "./dashboard-header";
import { ICompany } from "@/types/company";
import Loader from "@/ui/loader";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  savedCompanies: ICompany[];
};

const SavedCompanyArea = ({ setIsOpenSidebar, savedCompanies }: IProps) => {
  const {
    totalSavedCompany,
    totalNumOfSavedCompaniesPage,
    savedCompanyPage,
    loading,
  } = useAppSelector((s) => s.candidate.candidateDashboard);
  const dispatch = useAppDispatch();
  const itemsPerPage = 4;
  const handlePageClick = (event: { selected: number }) => {
    // console.log("from pagination", event.selected);
    dispatch(setSavedCompaniesPage(event.selected + 1));
  };
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-block d-sm-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Favorite Companies</h2>
          {/* <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Sort by:</div>
            <ShortSelect />
          </div> */}
          <div className="justify-content-end d-block d-sm-flex mt-3 mt-sm-0">
          <Link
          href='/company-v2'>
          <button className="btn-two tran3s">
            Visit companies
          </button>
          </Link>
        </div>
        </div>
        <div className="mb-20">
          <h4 style={{fontWeight:'100', fontSize:'large'}}>Navigate through your favorite companies effortlessly..</h4>
          </div>


        <div className="wrapper">
          {loading && <Loader />}
          {!loading && savedCompanies?.length === 0 && (
            <div className="job-list-one style-two position-relative mb-20">
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
                No companies saved! save company to visit later
              </p>
            </div>
          )}
          {!loading &&
            savedCompanies?.map((c) => (
              <div
                key={c._id}
                className="job-list-one style-two position-relative mb-20"
              >
                <div className="row justify-content-between align-items-center">
                  <div className="col-xxl-3 col-lg-4">
                    <div className="job-title d-flex align-items-center">
                      <Link href={`/company-details/${c._id}`} className="logo">
                        <Image
                          src={c.logo || job_img_1}
                          alt="img"
                          width={60}
                          height={60}
                          className="lazy-img m-auto rounded-circle"
                        />
                      </Link>
                      <Link
                        href={`/company-details/${c._id}`}
                        className="title fw-500 tran3s"
                      >
                        {c.name}
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 ms-auto">
                    {/* {c?.jobType.map((val, index) => (
                    <Link
                      href={`/job-details-v1/${c._id}`}
                      className={`job-duration fw-500 mx-1 ${
                        val == "part-time" ? "part-time" : ""
                      }`}
                    >
                      {`${val} ${" "}`}
                    </Link>
                  ))} */}
                    <div className="job-salary">
                      <span className="fw-500 text-dark">
                        {c.location[0].city}, {c.location[0].country}
                      </span>{" "}
                      / {c.category}
                    </div>
                  </div>
                  <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 ms-auto xs-mt-10 justify-content-end d-flex">
                    {/* <div className="job-location">
                    <a href="#">{c.location}</a>
                  </div>
                  <div className="job-category">
                    {c.primarySkills.map((c, i) => (
                      <a key={i} href="#">
                        {c}
                        {i < c.primarySkills.length - 1 && ", "}
                      </a>
                    ))}
                  </div> */}
                    <Link
                      href={`/company-details/${c._id}#open-job`}
                      className="open-job-btn text-center fw-500 tran3s me-2"
                    >
                      {/* {item.vacancy} open job */}
                      {c.jobOpenings} open job
                    </Link>
                  </div>
                  <div className="col-lg-2 col-md-4">
                    <div className="action-dots float-end">
                      <button
                        className="action-btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span></span>
                      </button>
                      {/* action dropdown start */}
                      <ActionDropdown id={c._id} />
                      {/* action dropdown end */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {totalSavedCompany > itemsPerPage && (
          <Pagination
            pageCount={totalNumOfSavedCompaniesPage}
            handlePageClick={handlePageClick}
            currPage={savedCompanyPage}
          />
        )}
      </div>
    </div>
  );
};

export default SavedCompanyArea;
