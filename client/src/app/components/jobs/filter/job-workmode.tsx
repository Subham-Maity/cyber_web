import React from "react";
import job_data from "@/data/job-data";
import { setWorkMode } from "@/redux/features/filterJobPostSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const WorkModeOption = ["Hybrid", "On-Site", "Remote", "Flexible"];
export function JobWorkModeItems({
  showLength = true,
}: {
  showLength?: boolean;
}) {
  const { workMode } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  return (
    <>
      {WorkModeOption.map((w, index) => (
        <li key={index}>
          <input
            onChange={() => dispatch(setWorkMode(w))}
            type="checkbox"
            name={w}
            defaultValue={w}
            checked={workMode.includes(w)}
          />
          <label>
            {w}
            {/* {showLength && (
              <span>
                {job_data.filter((job) => job.experience === e).length}
              </span>
            )} */}
          </label>
        </li>
      ))}
    </>
  );
}

const JobWorkMode = () => {
  return (
    <>
      <div className="main-body">
        <ul className="style-none filter-input">
          <JobWorkModeItems />
        </ul>
      </div>
    </>
  );
};

export default JobWorkMode;
