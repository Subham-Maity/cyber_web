"use client";
import avatar from "@/assets/dashboard/images/avatar_01.jpg";
import nav_1 from "@/assets/dashboard/images/icon/icon_1.svg";
import nav_1_active from "@/assets/dashboard/images/icon/icon_1_active.svg";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import nav_2 from "@/assets/dashboard/images/icon/icon_2.svg";
import nav_2_active from "@/assets/dashboard/images/icon/icon_2_active.svg";
import nav_3 from "@/assets/dashboard/images/icon/icon_3.svg";
import nav_3_active from "@/assets/dashboard/images/icon/icon_3_active.svg";
import nav_4 from "@/assets/dashboard/images/icon/icon_4.svg";
import nav_4_active from "@/assets/dashboard/images/icon/icon_4_active.svg";
import nav_8 from "@/assets/dashboard/images/icon/icon_5.svg";
import nav_8_active from "@/assets/dashboard/images/icon/icon_5_active.svg";
import nav_6 from "@/assets/dashboard/images/icon/icon_6.svg";
import nav_6_active from "@/assets/dashboard/images/icon/icon_6_active.svg";
import logo from "@/assets/images/logo/CL_Logo.png";
import type { RootState } from "@/redux/store";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LogoutModal from "../../common/popup/logout-modal";
import LogoutButton from "./LogoutButton";

// nav data
const nav_data: {
  id: number;
  icon: StaticImageData;
  icon_active: StaticImageData;
  link: string;
  title: string;
}[] = [
  {
    id: 1,
    icon: nav_1,
    icon_active: nav_1_active,
    link: "/dashboard/candidate-dashboard",
    title: "Dashboard",
  },
  {
    id: 2,
    icon: nav_2,
    icon_active: nav_2_active,
    link: "/dashboard/candidate-dashboard/profile",
    title: "My Profile",
  },
  {
    id: 7,
    icon: nav_3,
    icon_active: nav_3_active,
    link: "/dashboard/candidate-dashboard/jobs",
    title: "Applied jobs",
  },
  {
    id: 6,
    icon: nav_6,
    icon_active: nav_6_active,
    link: "/dashboard/candidate-dashboard/saved-job",
    title: "Saved Job",
  },

  // {
  //   id: 3,
  //   icon: nav_3,
  //   icon_active: nav_3_active,
  //   link: "/dashboard/candidate-dashboard/resume",
  //   title: "Resume",
  // },
  {
    id: 4,
    icon: nav_4,
    icon_active: nav_4_active,
    link: "/dashboard/candidate-dashboard/membership",
    title: "Membership",
  },
  {
    id: 8,
    icon: nav_6,
    icon_active: nav_6_active,
    link: "/dashboard/candidate-dashboard/saved-company",
    title: "Favorite Companies",
  },
  {
    id: 5,
    icon: nav_8,
    icon_active: nav_8_active,
    link: "/dashboard/candidate-dashboard/job-alert",
    title: "Job Alert",
  },
  // {
  //   id:10,
  //   icon:nav_4,
  //   icon_active:nav_4_active,
  //   link:"/dashboard/admin-dashboard/template",
  //   title:"Email Template"
  // },

  // {
  //   id: 7,
  //   icon: nav_7,
  //   icon_active: nav_7_active,
  //   link: "/dashboard/candidate-dashboard/setting",
  //   title: "Account Settings",
  // },
];
// props type
type IProps = {
  isOpenSidebar: boolean;
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const CandidateAside = ({ isOpenSidebar, setIsOpenSidebar }: IProps) => {
  const pathname = usePathname();
  const { currCandidate } = useSelector(
    (state: RootState) => state.candidate.candidateDashboard
  );
  let user = currCandidate;
  useEffect(() => {
    user = currCandidate
  },[currCandidate])

  return (
    <>
      <aside className={`dash-aside-navbar ${isOpenSidebar ? "show" : ""}`}>
        <div className="position-relative">
          <div className="logo text-md-center d-md-block d-flex align-items-center justify-content-between">
            <Link href="/">
              <Image src={logo} alt="logo" priority />
            </Link>
            <button
              onClick={() => setIsOpenSidebar(false)}
              className="close-btn d-block d-md-none"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="user-data">
            <div className="d-flex justify-content-center align-items-center user-avatar position-relative rounded-circle">
              {/* <Image
                src={
                  user?.avatar !== "none" ? (user?.avatar as string) : avatar
                }
                width={50}
                height={50}
                alt="avatar"
                className="lazy-img"
                style={{ height: "auto" }}
              /> */}
              <img
                width={50}
                height={50}
                src={user?.avatar || ""}
                // src={
                //   user?.avatar !== "none" || false
                //     ? (user?.avatar as string)
                //     : avatar
                // }
                alt="avatar"
                className="lazy-img user-img"
              />
            </div>
            <div className="user-name-data user-name ">
              <p className="  d-flex gap-1 justify-content-center align-items-center  ">
                <span className="text-center text-capitalize mt-2">
                  {user?.firstName} {user?.lastName}
                </span>
                <span
                  className=""
                  title={
                    user?.isProfileCompleted
                      ? "your profile is completed"
                      : "please complete your profile"
                  }
                >
                  {user && user?.isProfileCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#00bf58"
                      className="bi bi-check-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#ff4757"
                      className="bi bi-exclamation-triangle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                      <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                    </svg>
                  )}
                </span>
              </p>
            </div>
          </div>
          <nav className="dasboard-main-nav">
            <ul className="style-none">
              {nav_data.map((m) => {
                const isActive = pathname === m.link;
                return (
                  <li key={m.id} onClick={() => setIsOpenSidebar(false)}>
                    <Link
                      href={m.link}
                      className={`d-flex w-100 align-items-center ${
                        isActive ? "active" : ""
                      }`}
                    >
                      <Image
                        src={isActive ? m.icon_active : m.icon}
                        alt="icon"
                        className="lazy-img"
                      />
                      <span>{m.title}</span>
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href="#"
                  className="d-flex w-100 align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  {/* <Image src={nav_8} alt="icon" className="lazy-img" /> */}
                  {/* <span>Delete Account</span> */}
                </a>
              </li>
            </ul>
          </nav>
          {/* <div className="profile-complete-status">
            <div className="progress-value fw-500">87%</div>
            <div className="progress-line position-relative">
              <div className="inner-line" style={{ width: "80%" }}></div>
            </div>
            <p>Profile Complete</p>
          </div> */}
        </div>
      </aside>
      {/* LogoutModal star */}
      <LogoutModal />
      {/* LogoutModal end */}
    </>
  );
};

export default CandidateAside;
