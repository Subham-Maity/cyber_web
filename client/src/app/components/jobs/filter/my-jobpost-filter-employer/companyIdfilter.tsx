import React, { useEffect, useState } from "react";
import slugify from "slugify";
import job_data from "@/data/job-data";
import NiceSelect from "@/ui/nice-select";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setLocation } from "@/redux/features/filterJobPostSlice";
import AutocompletePosition from "@/ui/autoCompeteCompanyName";
import { setCompanyId } from "@/redux/features/employer/employerJobPostFilterSlice";

const JobCompany = () => {
  //   const uniqueLocations = [...new Set(job_data.map((job) => job.location))];
  const dispatch = useAppDispatch();
//   const handleLocation = (item:any) => {
//     dispatch(setCompanyId(item.companyId));
//   };
  const { currEmployer } = useAppSelector((state) => state.employer);
  const {company} = useAppSelector((state) => state.emplyerJobPostFilter);
  const [Company, setCompany] = useState(company || {
    name: "",
    companyId: "",
  });
  useEffect(() => {
    dispatch(setCompanyId(Company));
  },[Company])

  useEffect(() => {
    setCompany(company);
  },[company])
  //   const options = uniqueLocations.map((l) => {
  //     return {
  //       value: slugify(l.split(",").join("-").toLowerCase(), "-"),
  //       label: l,
  //     };
  //   });
  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">Company</div>
      <form className="input-box position-relative"  >
        <AutocompletePosition
          selected={Company}
          setSelected={setCompany}
          endPoint="companyName"
          employerId={currEmployer?._id}
          top={true}
          showCreate={false}
          borderNone={true}
        />
      </form>
    </div>
  );
};

export default JobCompany;
