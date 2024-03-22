"use client";
import { setLocationFilter, setName } from "@/redux/features/company/filter";
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
