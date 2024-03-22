"use client";
import { setName } from "@/redux/features/company/filter";
import { useAppDispatch } from "@/redux/hook";
import React, { useMemo, useState } from "react";

const SearchCompany = () => {
  const dispatch = useAppDispatch();

  const [localSearch, setLocalSearch] = useState("");

  const debounce = () => {
    let timeoutID: any;
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(setName(e.target.value));
      }, 1000);
    };
  };
  const optimizedDebounce = useMemo(() => debounce(), []);

  return (
    <div>
      <a
        className="filter-title fw-500 text-dark"
        data-bs-toggle="collapse"
        href="#collapseSemploye"
        role="button"
        aria-expanded="false"
      >
        Search Company
      </a>
      <div className="collapse show" id="collapseSemploye">
        <div className="main-body">
          <form action="#" className="input-box position-relative">
            <input
              name="search"
              value={localSearch}
              onChange={optimizedDebounce}
              type="text"
              placeholder="Company Name"
            />
            <button>
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchCompany;
