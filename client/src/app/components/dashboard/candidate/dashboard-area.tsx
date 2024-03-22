"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import job_data from "@/data/job-data";
import icon_1 from "@/assets/dashboard/images/icon/icon_12.svg";
import icon_2 from "@/assets/dashboard/images/icon/icon_13.svg";
import icon_3 from "@/assets/dashboard/images/icon/icon_14.svg";
import icon_4 from "@/assets/dashboard/images/icon/icon_15.svg";
import main_graph from "@/assets/dashboard/images/main-graph.png";
import DashboardHeader from "./dashboard-header";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import {
  getAllShortlistedJobAppByCandidateId,
  getallJobAppByCandidateWithJobPost,
} from "@/redux/features/jobApp/api";
import job_img_1 from "@/assets/images/logo/media_22.png";
import { type } from "os";
import Link from "next/link";
import NiceSelect from "@/ui/nice-select";
import {
  getCandidateProfileViewsForChart,
  getTotalViewsOfCandidate,
} from "@/redux/features/candidate/api";
import CandidateAreaChart from "@/ui/EmployerAreaChart";
interface ProfileView {
  view_count?: number;
  view_timestamp?: string;
}
// card item
export function CardItem({
  img,
  value,
  title,
}: {
  img: StaticImageData;
  value: string;
  title: string;
}) {
  return (
    <div className="col-lg-3 col-6">
      <div className="dash-card-one bg-white border-30 position-relative mb-15">
        <div className="d-sm-flex align-items-center justify-content-between">
          <div className="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1">
            <Image src={img} alt="icon" className="lazy-img" />
          </div>
          <div className="order-sm-0">
            <div className="value fw-500">{value}</div>
            <span>{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const DashboardArea = ({ setIsOpenSidebar }: IProps) => {
  const job_items = [...job_data.reverse().slice(0, 5)];
  const {
    allJobAppByCandidateWithJobPost: jobApps,
    totalJobsApplied,
    numberOfShortlistedJobApps,
  } = useAppSelector((state) => state.jobApplication);
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  const { currCandidate, totalViews } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (currCandidate) {
      getallJobAppByCandidateWithJobPost(dispatch, currCandidate._id, 1);
      getTotalViewsOfCandidate(dispatch, currCandidate._id);
      getAllShortlistedJobAppByCandidateId(dispatch, currCandidate._id);
    }
  }, [currCandidate]);

  const [viewsDataDay, setViewsDataDay] = useState<ProfileView[][] | []>();
  const [viewsDataMonth, setViewsDataMonth] = useState<ProfileView[][] | []>();
  const [viewsDataYear, setViewsDataYear] = useState<ProfileView[][] | []>();
  const [dataMode, setDataMode] = useState<string>("day");
  const [lastUnit, setLastUnit] = useState<number>(6);
  // const [trigger, setTrigger] = useState<number>();
  const handleLastUnits = (item: { value: string; label: string }) => {
    const val = parseInt(item.value);
    setLastUnit(val);
  };
  // useEffect(() => {

  // },[])
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currCandidate) {
          const viewsDay: any = await getCandidateProfileViewsForChart(
            dispatch,
            currCandidate._id,
            "day"
          );
          setViewsDataDay(viewsDay);

          const viewsMonth: any = await getCandidateProfileViewsForChart(
            dispatch,
            currCandidate._id,
            "month"
          );
          setViewsDataMonth(viewsMonth);

          const viewsYear: any = await getCandidateProfileViewsForChart(
            dispatch,
            currCandidate._id,
            "year"
          );
          // console.log(viewsYear,"views year");
          setViewsDataYear(viewsYear);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // console.log(currCandidate)
    // console.log(viewsDataYear,"Year")
  }, [currCandidate]);

  // useEffect(() => {
  //   console.log(viewsDataYear,"Year")
  // },[viewsDataYear])
  // const isDataAvailable = viewsDataDay && viewsDataMonth && viewsDataYear;

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Dashboard</h2>
        <div className="row">
          <CardItem
            img={icon_1}
            title="Applications"
            value={totalJobsApplied.toString()}
          />
          <CardItem
            img={icon_2}
            title="Shortlisted"
            value={numberOfShortlistedJobApps.toString()}
          />
          <CardItem img={icon_3} title="Views" value={totalViews.toString()} />
          <CardItem
            img={icon_4}
            title="Credit left"
            value={
              currCandidate?.subscription?.offering.aiTokenLimit.toString() ||
              ""
            }
          />
        </div>

        <div className="row d-flex pt-50 lg-pt-10">
          <div className="col-xl-7 col-lg-6 d-flex flex-column">
            <div className="user-activity-chart bg-white border-20 mt-30 h-100">
              <h4 className="dash-title-two">Profile Views</h4>
              <div
                className="flex px-2 md:px-6 lg:px-8 xl:px-10 "
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="gap-1 sm:gap-2" style={{ display: "flex" }}>
                  <button
                    className=" font-bold p-2 px-3"
                    style={{
                      background: dataMode === "day" ? "#D2F34C" : "#3f634d",
                      borderRadius: "9999px",
                      color: dataMode === "day" ? " #3f634d" : "white",
                    }}
                    onClick={() => setDataMode("day")}
                  >
                    Day
                  </button>
                  <button
                    className="p-2 font-bold px-3"
                    style={{
                      background: dataMode === "month" ? "#D2F34C" : "#3f634d",
                      borderRadius: "9999px",
                      color: dataMode === "month" ? " #3f634d" : "white",
                    }}
                    onClick={() => setDataMode("month")}
                  >
                    Month
                  </button>
                  <button
                    className=" p-2 px-3"
                    style={{
                      background: dataMode === "year" ? "#D2F34C" : "#3f634d",
                      borderRadius: "9999px",
                      color: dataMode === "year" ? " #3f634d" : "white",
                    }}
                    onClick={() => setDataMode("year")}
                  >
                    Year
                  </button>
                </div>
                <div className="col-xl-5">
                  <NiceSelect
                    options={[
                      { value: "2", label: `last 3 ${dataMode}s` },
                      { value: "4", label: `last 5 ${dataMode}s` },
                      { value: "6", label: `last 7 ${dataMode}s` },
                      { value: "11", label: `last 12 ${dataMode}s` },
                    ]}
                    defaultCurrent={2}
                    onChange={(item) => handleLastUnits(item)}
                    name="last units"
                    dataMode={dataMode}
                  />
                </div>
              </div>
              <div className="px-3 pb-3 mt-50">
                <CandidateAreaChart
                  dataMode={dataMode}
                  lastUnit={lastUnit}
                  viewsDataDay={viewsDataDay}
                  viewsDataMonth={viewsDataMonth}
                  viewsDataYear={viewsDataYear}
                />
                {/* // <p>Hello</p> */}
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6 d-flex">
            <div className="recent-job-tab bg-white border-20 mt-30 w-100">
              <h4 className="dash-title-two">Recent Applied Job</h4>
              <div className="wrapper">
                {jobApps.slice(0, 6).map((app) => {
                  if (typeof app.jobPost !== "string") {
                    return (
                      <div
                        key={app._id}
                        className="job-item-list d-flex align-items-center"
                      >
                        {/* <div>
                          <Image
                            src={job_img_1}
                            alt="logo"
                            width={40}
                            height={40}
                            className="lazy-img logo"
                          />
                        </div> */}
                        <div className="job-title">
                          <h6 className="mb-5">
                            <Link href={`/job-details-v1/${app.jobPost?._id}`}>
                              {app.jobPost?.title}
                            </Link>
                          </h6>
                          <div className="meta">
                            <span>{app.jobPost?.jobType[0]}</span> .{" "}
                            <span>{app.jobPost?.location[0]}</span>
                          </div>
                        </div>
                        {/* <div className="job-action">
                          <button
                            className="action-btn dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <span></span>
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <Link
                                className="dropdown-item"
                                href={`/job-details-v1/${app.jobPost?._id}`}
                              >
                                View Job
                              </Link>
                            </li>
                            {/* <li>
                            <a className="dropdown-item" href="#">
                              Archive
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              Delete
                            </a>
                          </li> *
                          </ul>
                        </div> */}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardArea;
