import React from "react";
import job_data from "@/data/job-data";
import { setLocation } from "@/redux/features/filterJobPostSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const LocationOption = [
  "Tongshan",
  "Orodo",
  "Guanyinge",
  "Shiziling",
  "Wanling",
];
export function JobLocationSelectItems({
  showLength = true,
}: {
  showLength?: boolean;
}) {
  const { location } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  return (
    <>
      {LocationOption.map((l, index) => (
        <li key={index}>
          <input
            onChange={() => dispatch(setLocation([l]))}
            type="checkbox"
            name={l}
            defaultValue={l}
            checked={location.includes(l)}
          />
          <label>
            {l}
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

const JobLocationSelect = () => {
  return (
    <>
      <div className="main-body">
        <ul className="style-none filter-input">
          <JobLocationSelectItems />
        </ul>
      </div>
    </>
  );
};

export default JobLocationSelect;
