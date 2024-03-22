import React from "react";
import { useAppDispatch } from "@/redux/hook";
import { setJobCode } from "@/redux/features/employer/employerJobPostFilterSlice";
// import { setSearchKey } from "@/redux/features/filterJobPostSlice";

const SearchJobCodeFilter = () => {
  const dispatch = useAppDispatch();

  // handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      dispatch(setJobCode(e.target.value));
    }, 1000);
  };
  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">Job Code</div>
      <form className="input-box position-relative">
        <input
          onChange={handleSearch}
          defaultValue="CL-"
          type="text"
          placeholder="Search Job Code"
        />
        <button>
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchJobCodeFilter;
