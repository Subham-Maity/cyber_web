import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  setCandidateName,
  setDate,
} from "@/redux/features/user/filterSlice/userFilterSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import { setTitle } from "@/redux/features/employer/employerJobPostFilterSlice";
// import { setSearchKey } from "@/redux/features/filterJobPostSlice";

const SearchDate = () => {
  const dispatch = useAppDispatch();
  const { date } = useAppSelector((state) => state.userFilter);

  // handle search
  //   const [text,setText] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">Date</div>
      <form className=" position-relative" style={{height:"45px"}} >
        <DatePicker
          className="w-full block d-flex h-45 date1"
        
          placeholderText="DD/MM/YYYY"
          name="deadlineDate"
          selected={new Date(date!) || ""}
          onChange={(date: Date | null) =>
            dispatch(setDate(date!))
          }
          dateFormat="dd/MM/yyyy"
          maxDate={new Date()}
        />
        {/* <button>
          <i className="bi bi-search"></i>
        </button> */}
      </form>
    </div>
  );
};

export default SearchDate;
