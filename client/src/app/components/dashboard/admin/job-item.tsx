import React from "react";
import ActionDropdown from "../candidate/action-dropdown-sabJobs";
import { getDate } from "@/utils/helper";
import Link from "next/link";
import EditJobPostModal from "../../common/popup/editJobPostModal";
import EditJobPostModalForAdmin from "../../common/popup/EditJobPostForAdmin";
import ActionDropdownForAll from "../candidate/actionDropdownForAll";

const EmployJobItem = ({
  title,
  info,
  date,
  application,
  status,
  showLink,
  jobCode,
  id,
}: {
  title: string;
  info: string;
  date: string;
  application: string;
  status: string;
  showLink?: string;
  id: string;
  jobCode: string;
}) => {
  return (
    <tr className={status}>
      <td>
        {showLink === "my" ? (
          <div className="job-name fw-500">
            <Link
              href={`/dashboard/admin-dashboard/jobs/${id}`}
            >{`${title} (${jobCode})`}</Link>
          </div>
        ) : (
          <div className="job-name fw-500">{`${title} (${jobCode})`}</div>
        )}
        <div className="info1">{info}</div>
      </td>
      <td>{getDate(date)}</td>
      <td className="text-center">{application}</td>
      <td>
        <div className="job-status text-capitalize">{status}</div>
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
          {/* action dropdown start */}
          {showLink === "my" ? (
            <ActionDropdown id={id} />
          ) : (
            <ActionDropdownForAll id={id} />
          )}
          {/* <EditJobPostModal /> */}
          {/* action dropdown end */}
        </div>
      </td>
    </tr>
  );
};

export default EmployJobItem;
