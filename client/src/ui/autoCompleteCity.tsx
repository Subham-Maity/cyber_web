import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function AutocompleteCity() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  //   console.log(selected);

  const key = "AIzaSyAoRBoehhoLznAQVPyIQU5BoviiGRdIAao";
  //   const serverUrl =
  //     "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json";
  const serverUrl =
    "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=new&key=AIzaSyAoRBoehhoLznAQVPyIQU5BoviiGRdIAao";
  useEffect(() => {
    console.log(query.length);
    // Make a request to your backend to get autocomplete suggestions
    const callApi = async () => {
      try {
        if (query.length >= 3) {
          const { data } = await axios.get(serverUrl);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    callApi();
  }, [query]);
  return (
    <div className="w-full">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left ">
            <Combobox.Input
              className="w-full border text-md py-3 pl-3 pr-10  leading-5 text-gray-900  focus:outline-none  focus:ring-0  border-gray-300 rounded-md p-2  focus:ring-blue-500"
              displayValue={() => selected}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {suggestions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                suggestions.map((person: any) => (
                  <Combobox.Option
                    key={person._id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-[#617af1] text-white" : "text-gray-900"
                      }`
                    }
                    value={person.name}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            // onClick={() => selected(person)}
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default AutocompleteCity;
