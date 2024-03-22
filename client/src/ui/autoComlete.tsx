import React, { useState, useEffect, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";

interface MyComponentProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  suggestions: string[];
  //   setSuggestions: React.Dispatch<React.SetStateAction<string[]>>;
}

function AutocompletePosition({
  query,
  setQuery,
  selected,
  setSelected,
  suggestions,
}: MyComponentProps) {
  return (
    <div className="nice-select " id="_my_nice_select">
      <Combobox value={selected} onChange={setSelected}>
        <div className="">
          <div className="">
            <Combobox.Input
              className=""
              placeholder="type title"
              displayValue={() => selected}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Transition
            as={Fragment}
            leave=""
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="_my_nice_select_options">
              {suggestions.length === 0 && query !== "" ? (
                <div className=" px-4">Nothing found.</div>
              ) : (
                suggestions.map((person: any) => (
                  <Combobox.Option
                    key={person._id}
                    className={({ active }) =>
                      `option ${active && "selected focus"}`
                    }
                    value={person.name}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-normal" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {/* {selected ? (
                          <span
                            // onClick={() => selected(person)}
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                          </span>
                        ) : null} */}
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

export default AutocompletePosition;
