import React, { useState } from "react";
import job_data from "@/data/job-data";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setJobCategory } from "@/redux/features/filterJobPostSlice";

const JobCategoryOption = [
  "Firewall Management",
  "Ethical hacking",
  "Cloud security",
  "Cloud Management",
  "Network Security",
  "Cryptographer",
];
const JobCategory = () => {
  const uniqueCategories = [
    ...new Set(job_data.flatMap((job) => job.category)),
  ];
  const [isShowMore, setIsShowMore] = useState(false);
  const { jobCategory } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const visibleCategories = isShowMore
    ? JobCategoryOption
    : JobCategoryOption.slice(0, 4);

  return (
    <div className="main-body">
      <ul className="style-none filter-input">
        {visibleCategories.map((c, i) => (
          <li key={i}>
            <input
              onChange={() => dispatch(setJobCategory(c))}
              type="checkbox"
              name={c}
              defaultValue={c}
              checked={jobCategory.includes(c)}
            />
            <label>
              {c}{" "}
              {/* <span>
                {job_data.filter((job) => job.category.includes(c)).length}
              </span> */}
            </label>
          </li>
        ))}
      </ul>
      <div
        onClick={() => setIsShowMore((prevState) => !prevState)}
        className="more-btn text-black"
      >
        <i className="bi bi-dash"></i> Show {isShowMore ? "Less" : "More"}
      </div>
    </div>
  );
};

export default JobCategory;
