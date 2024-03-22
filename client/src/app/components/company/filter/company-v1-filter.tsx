import React, { useState } from "react";
import FilterCompanyLocation from "./filter-company-location";
import SearchCompany from "./SearchCompany";
import TeamSize from "./TeamSize";
import { useAppDispatch } from "@/redux/hook";
import { resetFilter } from "@/redux/features/company/filter";
import SearchLocation from "./LocationFilter";

const CompanyV1Filter = () => {
  const dispatch = useAppDispatch();
  const [location, setLocation] = useState<string[]>([]);

  const handleReset = () => {
    setLocation([]);
    dispatch(resetFilter());
  };
  return (
    <div className="light-bg border-20 ps-4 pe-4 pt-25 pb-30 mt-20">
      <div className="filter-block bottom-line pb-25">
        <SearchCompany />
      </div>

      {/* <div className="filter-block bottom-line pb-25 mt-25">
        <a
          className="filter-title fw-500 text-dark"
          data-bs-toggle="collapse"
          href="#collapseCstatus"
          role="button"
          aria-expanded="false"
        >
          Company Status
        </a>
        <div className="collapse show" id="collapseCstatus">
          <div className="main-body">
            <ul className="style-none filter-input">
              <li>
                <input type="checkbox" name="CompanyStatus" />
                <label>New</label>
              </li>
              <li>
                <input type="checkbox" name="CompanyStatus" />
                <label>Top Rated</label>
              </li>
              <li>
                <input type="checkbox" name="CompanyStatus" />
                <label>Older</label>
              </li>
            </ul>
          </div>
        </div>
      </div> */}

      {/* <div className="filter-block bottom-line pb-25 mt-25">
        <a
          className="filter-title fw-500 text-dark"
          data-bs-toggle="collapse"
          href="#collapseLocation"
          role="button"
          aria-expanded="false"
        >
          Location
        </a>
        <div className="collapse show" id="collapseLocation">
          <div className="main-body">
            <FilterCompanyLocation />
          </div>
        </div>
      </div> */}
      <div className="filter-block bottom-line pb-25 mt-25">
      <SearchLocation location={location} setLocation={setLocation} />
      </div>

      <div className="filter-block bottom-line pb-25 mt-25">
        <TeamSize />
      </div>

      <button
        onClick={handleReset}
        className="btn-ten fw-500 text-white w-100 text-center tran3s mt-30"
      >
        Reset Filter
      </button>
    </div>
  );
};

export default CompanyV1Filter;
