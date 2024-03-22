"use client";
// import React from "react";
// import job_data from "@/data/job-data";
import { setLocationFilter } from "@/redux/features/candidate/filterSlice";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";

// const LocationOption = [
//   "Tongshan",
//   "Orodo",
//   "Guanyinge",
//   "Shiziling",
//   "Wanling",
// ];
// export function JobLocationSelectItems({
//   showLength = true,
// }: {
//   showLength?: boolean;
// }) {
//   const { location } = useAppSelector(
//     (state) => state.candidate.candidateFilter
//   );
//   const dispatch = useAppDispatch();
//   return (
//     <>
//       {LocationOption.map((l, index) => (
//         <li key={index}>
//           <input
//             onChange={() => dispatch(setLocation(l))}
//             type="checkbox"
//             name={l}
//             defaultValue={l}
//             checked={location.includes(l)}
//           />
//           <label>
//             {l}
//             {/* {showLength && (
//               <span>
//                 {job_data.filter((job) => job.experience === e).length}
//               </span>
//             )} */}
//           </label>
//         </li>
//       ))}
//     </>
//   );
// }

// const JobLocationSelect = () => {
//   return (
//     <>
//       <div className="main-body">
//         <ul className="style-none filter-input">
//           <JobLocationSelectItems />
//         </ul>
//       </div>
//     </>
//   );
// };

// export default JobLocationSelect;



import { useAppDispatch } from "@/redux/hook";
import React, { useEffect,SetStateAction,Dispatch, useMemo, useState } from "react";
import LocationAutoComplete from "@/ui/locationAutoComplete";

interface SearchLocationProps {
  location: string[];
  setLocation: Dispatch<SetStateAction<string[]>>;
}

const SearchLocation: React.FC<SearchLocationProps> = ({ location, setLocation }) => {
  const dispatch = useAppDispatch();

  // const [location, setLocation] = useState<string[]>([]);

  //   const debounce = () => {
  //     let timeoutID: any;
  //     return (e: React.ChangeEvent<HTMLInputElement>) => {
  //     //   setLocalSearch(e.target.value);
  //       clearTimeout(timeoutID);
  //       timeoutID = setTimeout(() => {
  //         dispatch(setLocationFilter(location));
  //       }, 1000);
  //     };
  //   };
  //   const optimizedDebounce = useMemo(() => debounce(), []);
  useEffect(() => {
    dispatch(setLocationFilter(location));
  }, [location]);
  const removeLocationClick = (value: string) => {
    setLocation((prev) => prev.filter((location) => location !== value));
  };

  return (
    <div>
      <a
        className="filter-title fw-500 text-dark"
        data-bs-toggle="collapse"
        href="#collapseLocation"
        role="button"
        aria-expanded="false"
      >
        Search Location
      </a>
      <div className="collapse show" id="collapseLocation">
        <div className="main-body">
          <form action="#" className="input-box position-relative">
            <LocationAutoComplete
              setSelected={setLocation}
              type="cities"
              label="location"
              isMultiple={true}
              borderTrue={false}
            />
            <button>
              <i className="bi bi-search"></i>
            </button>
          </form>
         
          <div
          style={{ marginTop: "10px"}}
            className="d-flex"
          >
            {location.map((value) => (
              <button 
              style={{
               
                fontSize: "12px",
                fontWeight: 500,
                margin: "10px 3px 0",
                padding: "0 14px",
                height: "25px",
                background: "rgba(49, 121, 90, 0.1)",
                borderRadius: "30px",
              }}
              key={value} onClick={() => removeLocationClick(value)}>
                {value}
              </button>
            ))}
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default SearchLocation;

