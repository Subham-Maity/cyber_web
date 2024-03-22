import React from "react";
import job_data from "@/data/job-data";
import { setCandidateType } from "@/redux/features/candidate/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const PreferredExperienceOption = ["Female", "Male"];
export function JobExperienceItems({
  showLength = true,
}: {
  showLength?: boolean;
}) {
  const uniqueExperiences = [...new Set(job_data.map((job) => job.experience))];
  const { candidateType } = useAppSelector(
    (state) => state.candidate.candidateFilter
  );
  const dispatch = useAppDispatch();
  return (
    <>
      {PreferredExperienceOption.map((e, index) => (
        <li key={index}>
          <input
            onChange={() => dispatch(setCandidateType(e))}
            type="checkbox"
            name={e}
            defaultValue={e}
            checked={candidateType === e}
          />
          <label>{e}</label>
        </li>
      ))}
    </>
  );
}

const CandidateType = () => {
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

export default CandidateType;
