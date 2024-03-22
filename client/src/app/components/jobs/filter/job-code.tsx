"use client";
import { setJobCode } from "@/redux/features/filterJobPostSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const SearchJobCode = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialJobCode = searchParams.get("jobCode") || "";
  // useEffect(() => {
  //   dispatch(setJobCode(searchParams.get("jobCode") as string))

  // },[])
  const [localSearch, setLocalSearch] = useState(initialJobCode);
  const { jobCode } = useAppSelector((state) => state.filter);
  // const debounce = () => {
  //   let timeoutID: any;
  //   return (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setLocalSearch(e.target.value);
  //     clearTimeout(timeoutID);
  //     timeoutID = setTimeout(() => {
  //       router.push(`job-list-v1?jobCode=${e.target.value}`);
  //       dispatch(setJobCode(e.target.value));
  //     }, 1000);
  //   };
  // };
  // const optimizedDebounce = useMemo(() => debounce(), []);
  // useEffect(() => {
  //   setLocalSearch(searchParams.get("jobCode") || "");
  //   dispatch(setJobCode(searchParams.get("jobCode") as string));
  // }, [searchParams.get("jobCode")]);
  //   useEffect(() => {
  //     console.log(searchParams.get('jobCode'));
  //     dispatch(setJobCode(searchParams.get("jobCode") as string));
  // },[localSearch])
  useEffect(() => {
    setLocalSearch(searchParams.get("jobCode") || "");
  }, [searchParams.get("jobCode")]);

  useEffect(() => {
    router.push(`job-list-v1?jobCode=${localSearch}`);
  }, [localSearch]);
  return (
    <div>
      <a
        className="filter-title fw-500 text-dark"
        data-bs-toggle="collapse"
        href="#collapseSemploye"
        role="button"
        aria-expanded="false"
      >
        Job Code
      </a>
      <div className="collapse show" id="collapseSemploye">
        <div className="main-body">
          <form action="#" className="input-box position-relative">
            <input
              name="jobCode"
              value={localSearch}
              onChange={(e) => {
                // router.push(`job-list-v1?jobCode=${e.target.value}`);
                setLocalSearch(e.target.value);
              }}
              type="text"
              placeholder="type job code here"
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

export default SearchJobCode;
