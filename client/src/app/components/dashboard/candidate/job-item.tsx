import React from "react";
import ActionDropdown from "./action-dropdown-jobApp";
import { getDate } from "@/utils/helper";
import Link from "next/link";

const CandidateJobItem = ({
  title,
  jobCode,
  info,
  date,
  application,
  status,
  updatedAt,
  jobAppId,
  jobId,
}: {
  title: string;
  jobCode: string;
  info: string;
  date: string;
  application: string;
  status: string;
  updatedAt: string;
  jobAppId: string;
  jobId?: string;
}) => {
  return (
    <>
      <tr
        className={`${status === "Received" && "pending"} ${
          status === "Under Review" && "active"
        } ${status === "Not Selected" && "expired"} ${
          status === "Shortlisted" && "active"
        }`}
      >
        <td>
          <Link href={`/job-details-v1/${jobId}`}>
          <div className="job-name fw-500">{title},</div>
          <div>({jobCode})</div>
          </Link>
          <div className="info1">{info}</div>
        </td>
        <td>{getDate(date)}</td>
        <td>{application}</td>
        <td>
          <div className="job-status text-capitalize">{status}</div>
        </td>
        <td>{getDate(updatedAt)}</td>
        <td>
          <div className="action-dots float-end">
            <button
              className="action-btn dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span></span>
            </button>

            <ActionDropdown jobAppId={jobAppId} />
          </div>
        </td>
      </tr>
      {/* <ChatModal appId={id} /> */}
    </>
  );
};

export default CandidateJobItem;
