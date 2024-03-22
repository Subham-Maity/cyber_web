import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setJobCode } from "@/redux/features/employer/employerJobPostFilterSlice";
import { setTestScore } from "@/redux/features/jobApp/filter-candidates-by-jobapp/candidateFilterByJobPostSlice";
import Slider from "@mui/material-next/Slider";

// import { setSearchKey } from "@/redux/features/filterJobPostSlice";

const TestScoreFilter = () => {
  const dispatch = useAppDispatch();
  const {testScore} = useAppSelector((state) => state.employerCandidateByJobAppFilter)

  // handle search
  // const [warn, setWarn] = useState<boolean>(false);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    dispatch(setTestScore(e.target.value));
    
  };
  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">Test Score</div>
      <form className="input-box position-relative">
        {/* <input
          onChange={handleSearch}
          //   defaultValue=""
          type="number"
          placeholder="Search Test Score"
        />
        <button>
          <i className="bi bi-search"></i>
        </button>
        {warn && <p style={{ color: "red" }}>Enter in range [0,100]</p>} */}
        <Slider
          max={100}
          min={0}
          valueLabelDisplay="auto"
          value={testScore}
          track="inverted"
          onChange={handleSearch}
          step={25}
          marks
          sx={{
            '& .MuiSlider-thumb': {
              backgroundColor: '#31795A', // Button color
            },
            '& .MuiSlider-rail': {
              backgroundColor: '#D2F34C', // Track color
            },
            '& .MuiSlider-valueLabel': {
              color: '#31795A', // ValueLabel color
            },
          }}
        />
      </form>
    </div>
  );
};

export default TestScoreFilter;
