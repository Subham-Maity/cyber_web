import React from "react";
// import { JobExperienceItems } from "../job-experience";
// import JobStatus from "./status-filter";
import SubTypeFilter from "./setTypeFilter";

const FilterType = () => {
  return (
    <div className="filter-block d-xl-flex pb-25">
      <div className="filter-title fw-500 text-dark mt-1">
      </div>
      <div className="main-body flex-fill">
        <ul className="style-none filter-input">
          <SubTypeFilter  />
        </ul>
      </div>
    </div>
  );
};

export default FilterType;
