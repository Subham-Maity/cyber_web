import React from "react";
import job_data from "@/data/job-data";
import { setPreferredExperience } from "@/redux/features/candidate/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const PreferredExperienceOption = ["Fresher", "Intermediate", "Expert"];
export function JobExperienceItems({
  showLength = true,
}: {
  showLength?: boolean;
}) {
  const uniqueExperiences = [...new Set(job_data.map((job) => job.experience))];
  const { preferredExperience } = useAppSelector(
    (state) => state.candidate.candidateFilter
  );
  const dispatch = useAppDispatch();
  return (
    <>
      {PreferredExperienceOption.map((e, index) => (
        <li key={index}>
          <input
            onChange={() => dispatch(setPreferredExperience(e))}
            type="checkbox"
            name={e}
            defaultValue={e}
            checked={preferredExperience.includes(e)}
          />
          <label>
            {e}
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

const JobExperience = () => {
  return (
    <>
      <div className="main-body">
        <ul className="style-none filter-input">
          <JobExperienceItems />
        </ul>
      </div>
    </>
  );
};

export default JobExperience;
