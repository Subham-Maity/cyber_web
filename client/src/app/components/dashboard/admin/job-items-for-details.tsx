import React from "react";
import ActionDropdown from "../employ/actionDropDownForDetails";
import Link from "next/link";
import { IResume } from "@/types/user-type";
import ResumeDownloadButton from "@/ui/downloadBtn";
import { FileArrowDown } from "@phosphor-icons/react";

const EmployJobItem = ({
  jobPostId,
  title,
  info,
  date,
  tesScore,
  status,
  id,
  appId,
  isFeedbackAsked,
  resumes,
  resumeId,
  matchScore,
}: {
  jobPostId: string;
  title: string;
  info: string;
  date: string;
  tesScore: String;
  status: string;
  // experience: string;
  id: string;
  appId: string;
  isFeedbackAsked: boolean;
  resumes: IResume[];
  resumeId: string;
  matchScore: number;
}) => {
  const appliedResume = resumes?.find((resume) => resume?._id === resumeId);
  return (
    <tr
      className={` ${status === "Received" && "pending"} ${
        status === "Under Review" && "active"
      } ${status === "Not Selected" && "expired"} ${
        status === "Shortlisted" && "active"
      }`}
    >
      <td>
        <div className="job-name fw-500">
          <Link href={`/candidate-profile-v1/${id}`} target="_blank">
            {title}
          </Link>
        </div>
        <div className="info1">{info}</div>
      </td>
      <td>{date}</td>
      <td className="text-capitalize text-center">{tesScore}</td>
      <td>
        <div className="text-capitalize text-center">{matchScore}</div>
      </td>
      <td>
        <div className=" d-flex ">
          <ResumeDownloadButton
            fileName={
              appliedResume?.name || (resumes?.length ? resumes[0].name : "")
            }
            s3Key={
              appliedResume?.s3Key || (resumes?.length ? resumes[0].s3Key : "")
            }
            id={appId}
            candidateId={id}
            jobPostId={jobPostId}
          />
          <FileArrowDown size={24} color="black" />
        </div>
      </td>
      <td>
        <div className="job-status text-capitalize">
          {status === "Received" ? "Pending" : status}
        </div>
      </td>
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

          <ActionDropdown
            isFeedbackAsked={isFeedbackAsked}
            id={appId}
            candidateId={id}
            jobPostId={jobPostId}
          />
        </div>
      </td>
    </tr>
  );
};

export default EmployJobItem;
