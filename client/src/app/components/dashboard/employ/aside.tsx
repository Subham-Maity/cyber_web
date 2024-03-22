"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import logo from "@/assets/images/logo/CL_Logo.png";

import avatar from "@/assets/dashboard/images/avatar_03.jpg";
import profile_icon_1 from "@/assets/dashboard/images/icon/icon_23.svg";
import profile_icon_2 from "@/assets/dashboard/images/icon/icon_24.svg";
import profile_icon_3 from "@/assets/dashboard/images/icon/icon_25.svg";
import logout from "@/assets/dashboard/images/icon/icon_9.svg";
import nav_1 from "@/assets/dashboard/images/icon/icon_1.svg";
import nav_1_active from "@/assets/dashboard/images/icon/icon_1_active.svg";
import nav_2 from "@/assets/dashboard/images/icon/icon_2.svg";
import nav_2_active from "@/assets/dashboard/images/icon/icon_2_active.svg";
import nav_3 from "@/assets/dashboard/images/icon/icon_3.svg";
import nav_3_active from "@/assets/dashboard/images/icon/icon_3_active.svg";
import nav_4 from "@/assets/dashboard/images/icon/icon_4.svg";
import nav_4_active from "@/assets/dashboard/images/icon/icon_4_active.svg";
import nav_5 from "@/assets/dashboard/images/icon/icon_39.svg";
import nav_5_active from "@/assets/dashboard/images/icon/icon_39_active.svg";
import nav_6 from "@/assets/dashboard/images/icon/icon_6.svg";
import nav_6_active from "@/assets/dashboard/images/icon/icon_6_active.svg";
import nav_7 from "@/assets/dashboard/images/icon/icon_7.svg";
import nav_7_active from "@/assets/dashboard/images/icon/icon_7_active.svg";
import nav_9 from "@/assets/dashboard/images/icon/icon_40.svg";
import nav_9_active from "@/assets/dashboard/images/icon/icon_40_active.svg";
import nav_8 from "@/assets/dashboard/images/icon/icon_8.svg";
import LogoutModal from "../../common/popup/logout-modal";
import LogoutButton from "../candidate/LogoutButton";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/hook";
import userLogo from "@/assets/images/logo/user-icon.png";

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
    link: "/dashboard/employer-dashboard",
    title: "Dashboard",
  },

  {
    id: 3,
    icon: nav_3,
    icon_active: nav_3_active,
    link: "/dashboard/employer-dashboard/jobs",
    title: "My Jobs",
  },
  {
    id: 4,
    icon: nav_2,
    icon_active: nav_2_active,
    link: "/dashboard/employer-dashboard/company",
    title: "Create Company",
  },
  {
    id: 5,
    icon: nav_5,
    icon_active: nav_5_active,
    link: "/dashboard/employer-dashboard/submit-job",
    title: "Create Job",
  },
  {
    id: 8,
    icon: nav_2,
    icon_active: nav_2_active,
    link: "/dashboard/employer-dashboard/profile",
    title: "Profile",
  },
  {
    id: 6,
    icon: nav_6,
    icon_active: nav_6_active,
    link: "/dashboard/employer-dashboard/saved-candidate",
    title: "Saved Candidate",
  },
  {
    id: 7,
    icon: nav_9,
    icon_active: nav_9_active,
    link: "/dashboard/employer-dashboard/membership",
    title: "Membership",
  },
];
// props type
type IProps = {
  isOpenSidebar: boolean;
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const EmployAside = ({ isOpenSidebar, setIsOpenSidebar }: IProps) => {
  const pathname = usePathname();
  const { currEmployer } = useAppSelector((state: RootState) => state.employer);
  const user = currEmployer;
  return (
    <>
      <aside className={`dash-aside-navbar ${isOpenSidebar ? "show" : ""}`}>
        <div className="position-relative">
          <div className="logo text-md-center d-md-block d-flex align-items-center justify-content-between">
            <Link href="/">
              <Image src={logo} alt="logo" priority />
            </Link>
            <button
              className="close-btn d-block d-md-none"
              onClick={() => setIsOpenSidebar(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="user-data">
            <div className="d-flex justify-content-center align-items-center user-avatar position-relative rounded-circle">
              <Image
                src={user?.avatar !== "" ? (user?.avatar as string) : userLogo}
                width={70}
                height={70}
                alt="avatar"
                className="lazy-img user-img"
                // style={{ height: "auto" }}
              />
            </div>
            <div className="user-name-data user-name">
              <p className="text-capitalize d-flex justify-content-center ">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
          </div>
          <nav className="dasboard-main-nav">
            <ul className="style-none">
              {nav_data.map((m) => {
                // const isActive =
                // pathname === m.link || pathname.startsWith(`${m.link}/`);
                const isActive =
                  pathname.startsWith(m.link) && // Check if the current URL starts with the link
                  (m.link === "/dashboard/employer-dashboard"
                    ? pathname === m.link // If the link is the dashboard, check for strict equality
                    : true);
                // const isActive =
                //   pathname !== "/dashboard/employer-dashboard" &&
                //   pathname.startsWith(m.link);
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
                        alt=""
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
                  {/* <Image src={nav_8} alt="icon" className="lazy-img" />
                  <span>Delete Account</span> */}
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

          {/* <LogoutButton /> */}
        </div>
      </aside>
      {/* LogoutModal star */}
      <LogoutModal />
      {/* LogoutModal end */}
    </>
  );
};

export default EmployAside;
