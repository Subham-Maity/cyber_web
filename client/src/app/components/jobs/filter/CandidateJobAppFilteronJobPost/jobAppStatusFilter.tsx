import React, { useEffect, useState } from "react";
import job_data from "@/data/job-data";
import { setPreferredExperience } from "@/redux/features/filterJobPostSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { setStatus } from "@/redux/features/employer/employerJobPostFilterSlice";
import NiceSelect from "@/ui/nice-select";
import { setStatus } from "@/redux/features/employer/employerJobPostFilterSlice";

const PreferredStatusOption = [
  { value: "Under Review", label: "Under Review" },
  { value: "Shortlisted", label: "Shortlisted" },
  { value: "Not Selected", label: "Rejected" },
  { value: "Received", label: "Pending" },
  { value: "", label: "All" },
];

export function JobAppStatusItems({
  showLength = true,
}: {
  showLength?: boolean;
}) {
  //   const uniqueExperiences = [...new Set(job_data.map((job) => job.experience))];
//   let def = 2;
  const [def,setDef] = useState(4);
  const { status } = useAppSelector((state) => state.employerCandidateByJobAppFilter);
  useEffect(() => {
    let d = PreferredStatusOption.findIndex((m) => m.value===status);
    // console.log(def)
    setDef(d);
  },[status])
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="filter-block pb-50 lg-pb-20">
        <div className="filter-title fw-500 text-dark">Status</div>
        <form className="input-box position-relative">
          <NiceSelect
            onChange={(item) => dispatch(setStatus(item.value))}
            // type="checkbox"
            options={PreferredStatusOption}
            defaultCurrent={def}
            name="Status"
            // name={e}
            // defaultValue={e}
            // checked={status.includes(e.value)}
          />
        </form>
      </div>

      {/* <label>
            {e} */}
      {/* {showLength && (
              <span>
                {job_data.filter((job) => job.experience === e).length}
              </span>
            )} */}
      {/* </label> */}
    </>
  );
}

const JobAppStatus = () => {
  return (
    <>
      <div className="main-body">
        <ul className="style-none filter-input">
          <JobAppStatusItems />
        </ul>
      </div>
    </>
  );
};

export default JobAppStatus;
