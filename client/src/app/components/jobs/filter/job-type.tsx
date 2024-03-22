import React from "react";
import job_data from "@/data/job-data";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setJobType } from "@/redux/features/filterJobPostSlice";

// job type items
const JobTypeOption = [
  "Full time",
  "Part time",
  "Internship",
  "Hourly contract",
  "Fixed price",
];
export function JobTypeItems({ showLength = true }: { showLength?: boolean }) {
  const jobDuration = [...new Set(job_data.map((job) => job.duration))];
  const { jobType } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  return (
    <>
      {JobTypeOption.map((duration, index) => (
        <li key={index}>
          <input
            onChange={() => dispatch(setJobType(duration))}
            type="checkbox"
            name={duration}
            defaultValue={duration}
            checked={jobType.includes(duration)}
          />
          <label>
            {duration}{" "}
            {/* {showLength && (
              <span>
                {job_data.filter((job) => job.duration === duration).length}
              </span>
            )} */}
          </label>
        </li>
      ))}
    </>
  );
}

const JobType = () => {
  return (
    <div className="main-body">
      <ul className="style-none filter-input">
        <JobTypeItems />
      </ul>
    </div>
  );
};

export default JobType;
