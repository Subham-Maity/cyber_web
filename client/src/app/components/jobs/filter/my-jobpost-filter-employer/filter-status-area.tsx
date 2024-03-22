import React from "react";
// import { JobExperienceItems } from "../job-experience";
import JobStatus from "./status-filter";

const FilterStatus = () => {
  return (
    <div className="filter-block d-xl-flex pb-25">
      <div className="filter-title fw-500 text-dark mt-1">
      </div>
      <div className="main-body ps-xl-4 flex-fill">
        <ul className="style-none filter-input">
          <JobStatus  />
        </ul>
      </div>
    </div>
  );
};

export default FilterStatus;
