import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setTitle } from "@/redux/features/employer/employerJobPostFilterSlice";
// import { setSearchKey } from "@/redux/features/filterJobPostSlice";

const SearchTitleFilter = () => {
  const dispatch = useAppDispatch();
  const { title } = useAppSelector((state) => state.emplyerJobPostFilter);
  // handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      dispatch(setTitle(e.target.value));
    }, 1000);
  };
  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">Title</div>
      <form className="input-box position-relative">
        <input
          onChange={handleSearch}
          // value={title}
          defaultValue=""
          type="text"
          placeholder="Search by Keywords"
        />
        <button>
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchTitleFilter;
