import React from "react";
import { setTeamSize } from "@/redux/features/company/filter";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const teamSizeOptions = [
  "Individual",
  "1-10",
  "11-50",
  "51-100",
  "101-500",
  "501-1,000",
  "1,001-5,000",
  "5,001-10,000",
  "10,000+",
];

const TeamSize = () => {
  const { teamSize } = useAppSelector((state) => state.company.companyFilter);
  const dispatch = useAppDispatch();
  return (
    <div>
      <a
        className="filter-title fw-500 text-dark collapsed"
        data-bs-toggle="collapse"
        href="#collapseTeam"
        role="button"
        aria-expanded="false"
      >
        Team Size
      </a>
      <div className="collapse show" id="collapseTeam">
        <div className="main-body">
          <ul className="style-none filter-input">
            {teamSizeOptions.map((w, index) => (
              <li key={index}>
                <input
                  onChange={() => dispatch(setTeamSize(w))}
                  type="checkbox"
                  name={w}
                  defaultValue={w}
                  checked={teamSize.includes(w)}
                />
                <label>
                  {w}
                  {/* {showLength && (
              <span>
                {job_data.filter((job) => job.experience === e).length}
              </span>
            )} */}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamSize;
