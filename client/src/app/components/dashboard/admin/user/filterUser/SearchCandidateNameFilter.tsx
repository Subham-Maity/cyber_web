import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCandidateName } from "@/redux/features/user/filterSlice/userFilterSlice";

// import { setTitle } from "@/redux/features/employer/employerJobPostFilterSlice";
// import { setSearchKey } from "@/redux/features/filterJobPostSlice";

const SearchCandidateNameFilter = () => {
  const dispatch = useAppDispatch();
const {candidateName} = useAppSelector((state) => state.userFilter);
  // handle search
//   const [text,setText] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  
      dispatch(setCandidateName(e.target.value || ""));
  
  };
  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">Name</div>
      <form className="input-box position-relative">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search by Name"
          value={candidateName}
        />
        <button>
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchCandidateNameFilter;
