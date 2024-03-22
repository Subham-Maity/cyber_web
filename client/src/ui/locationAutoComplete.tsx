"use client";
import React, { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

interface MyComponentProps {
  selected?: string;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  setCountry?: React.Dispatch<React.SetStateAction<any>>;
  isMultiple?: Boolean;
  type: string;
  label: string;
  borderTrue?:boolean;
}

function AddressForm({
  selected,
  setSelected,
  setCountry,
  type,
  label,
  isMultiple,
  borderTrue=true,
}: MyComponentProps) {
  const [query, setQuery] = useState(selected || "");
  // const [selected, setSelected] = useState("");
  const handleQueryChange = (value: string) => {
    setQuery(value);
  };
  useEffect(() => {
    setQuery(selected || "");
  }, [selected]);

  const handleSelect = async (address: any) => {
    try {
      const results = await geocodeByAddress(address);
      // console.log(results);
      if (results.length > 0) {
        const arr = results[0].formatted_address.split(",");
        if (isMultiple) {
          setSelected((prev: any) => [...prev, arr[0].trim()]);
        } else setSelected(arr[0].trim());

        isMultiple ? setQuery("") : setQuery(arr[0].trim());
        setCountry && setCountry(arr[arr.length - 1].trim());
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
  };
  console.log();

  const autocompleteOptions = {
    types: [`(${type})`],
    // types: ["(cities)"],
  };
  return (
    <div className="nice-select " id="_my_nice_select">
      <PlacesAutocomplete
        value={query}
        onChange={handleQueryChange}
        searchOptions={autocompleteOptions}
        onSelect={handleSelect}
        shouldFetchSuggestions={query.length >= 2}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              name={`${label}`}
              {...getInputProps({
                placeholder: `Select ${label} ...`,
                className: "location-search-input",
              })}
              style={{border:!borderTrue?"none":""}}
            />
            {suggestions.length !==0 && (
              <ul
                className="_my_nice_select_options"
                style={{
                  border: `${
                    suggestions.length === 0
                      ? "none"
                      : "1px solid rgba(0, 0, 0, 0.05)"
                  }`,
                }}
              >
                {loading && <div className="option">Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = `option ${
                    suggestion.active && "selected focus"
                  }`;
                  // const style = suggestion.active
                  //   ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  //   : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <li
                      {...getSuggestionItemProps(suggestion, {
                        className,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default AddressForm;
