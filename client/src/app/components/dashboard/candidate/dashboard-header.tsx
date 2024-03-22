"use client";
import search from "@/assets/dashboard/images/icon/icon_10.svg";
import notifi from "@/assets/dashboard/images/icon/icon_11.svg";
import notify_icon_2 from "@/assets/dashboard/images/icon/icon_37.svg";
import { updateNotification } from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { format } from "timeago.js";
import LogoutButton from "./LogoutButton";
// notification item
function NotificationItem({
  icon,
  main,
  time,
  isUnread,
  redirectUrl,
  id,
}: {
  icon: StaticImageData;
  main: string;
  time: Date;
  isUnread: boolean;
  redirectUrl?: string;
  id: string;
}) {
  const dispatch = useAppDispatch();

  const handleClick = (id: string) => {
    if (currUser) updateNotification(dispatch, { id, candidateId: currUser });
  };
  const { currUser } = useAppSelector((s) => s.persistedReducer.user);
  return (
    <li className={`d-flex align-items-center ${!isUnread ? "unread" : ""}`}>
      <Image src={icon} alt="icon" className="lazy-img icon" />
      <div className="flex-fill ps-2">
        {/* <h6>You have {main} new mails</h6> */}
        <h6>
          <Link
            className="text-wrap"
            onClick={() => handleClick(id)}
            href={redirectUrl || "#"}
          >
            {main}
          </Link>
        </h6>

        <span className="time">{format(time)}</span>
      </div>
    </li>
  );
}
// props type
type IProps = {
  setIsOpenSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
};
const DashboardHeader = ({ setIsOpenSidebar }: IProps) => {
  // handle click to open
  const handleOpen = () => {
    if (setIsOpenSidebar) {
      setIsOpenSidebar(true);
    }
  };
  const pathName = usePathname();
  const { currCandidate } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const {currEmployer} = useAppSelector((state) => state.employer)
  // const t=currCandidate?.notifications[0].timestamp
  const unreadNotification = currCandidate? currCandidate?.notifications.filter(
    (n) => n.isRead === false
  ):currEmployer?.notifications.filter( (n) => n.isRead === false);
  // unreadNotification?.forEach((notification) => {
  //   notification.timestamp = new Date(notification.timestamp);
  // });

  // Sort the notifications by timestamp in descending order (latest first)
  // unreadNotification?.sort((a, b) => b.timestamp - a.timestamp);
  // console.log("from notification", currCandidate);

  return (
    <header className="dashboard-header">
      <div className="d-flex align-items-center justify-content-end">
        <button
          onClick={handleOpen}
          className="dash-mobile-nav-toggler d-block d-md-none me-auto"
        >
          <span></span>
        </button>
        {pathName.split("/").includes("candidate-dashboard") && (
          <div className="me-5 fw-normal  btn-one ">
            <Link href={`${process.env.NEXT_PUBLIC_HOME_ENDPOINT}/job-list-v1`}>
              Find Jobs
            </Link>
          </div>
        )}

        {/* <form action="#" className="search-form">
          <input type="text" placeholder="Search here.." />
          <button>
            <Image src={search} alt="search" className="lazy-img m-auto" />
          </button>
        </form> */}

        <div className=" btn-one">
          <LogoutButton />
        </div>
        <div className="profile-notification ms-2 ms-md-5 me-4">
          <button
            className="noti-btn dropdown-toggle"
            type="button"
            id="notification-dropdown"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            <Image src={notifi} alt="Notification" className="lazy-img" />
            {unreadNotification && unreadNotification.length > 0 && (
              <div className="badge-pill">{unreadNotification.length}</div>
            )}
          </button>
          <ul className="dropdown-menu" aria-labelledby="notification-dropdown">
            <li>
              <h4>Notification</h4>
              <ul className="style-none notify-list">
                {unreadNotification && unreadNotification.length > 0 ? (
                  unreadNotification.map((n, index) => {
                    return (
                      <NotificationItem
                        key={n._id}
                        icon={notify_icon_2}
                        main={n.message}
                        time={n.timestamp}
                        isUnread={n.isRead}
                        redirectUrl={n.redirectUrl}
                        id={n._id}
                      />
                    );
                  })
                ) : (
                  <p className="d-flex align-items-center ">
                    <span>No notification found</span>
                    <span>
                      <i className="bi bi-2x bi-exclamation-circle ms-3 mt-1"></i>
                    </span>
                  </p>
                )}
              </ul>
            </li>
          </ul>
        </div>
        {/* {pathName.split("/").includes("employer-dashboard") && (
          <div>
            <Link
              href="/dashboard/employer-dashboard/submit-job"
              className="job-post-btn tran3s"
            >
              Post a Job
            </Link>
          </div>
        )} */}
      </div>
    </header>
  );
};

export default DashboardHeader;
