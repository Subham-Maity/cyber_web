import React, { useEffect, useState } from "react";
import job_data from "@/data/job-data";
import { setPreferredExperience } from "@/redux/features/filterJobPostSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setStatus } from "@/redux/features/employer/employerJobPostFilterSlice";
import NiceSelect from "@/ui/nice-select";
import { setType } from "@/redux/features/user/filterSlice/userFilterSlice";

const PreferredStatusOption = [
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
  { value: "", label: "All" },
];

export function UserSubsType({
  showLength = true,
}: {
  showLength?: boolean;
}) {
  //   const uniqueExperiences = [...new Set(job_data.map((job) => job.experience))];
//   let def = 2;
  const [def,setDef] = useState(2);
  const { status } = useAppSelector((state) => state.emplyerJobPostFilter);
  useEffect(() => {
    let d = PreferredStatusOption.findIndex((m) => m.value===status);
    console.log(def)
    setDef(d);
  },[status])
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="filter-block pb-50 lg-pb-20">
        <div className="filter-title fw-500 text-dark">Status</div>
        <form className="input-box position-relative">
          <NiceSelect
            onChange={(item) => dispatch(setType(item.value))}
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

const SubTypeFilter = () => {
  return (
    <>
      <div className="main-body">
        <ul className="style-none filter-input">
          <UserSubsType />
        </ul>
      </div>
    </>
  );
};

export default SubTypeFilter;
