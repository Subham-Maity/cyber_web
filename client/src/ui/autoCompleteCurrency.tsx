import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Combobox, Transition } from "@headlessui/react";
import instance from "@/lib/axios";
import { Currency } from "@/redux/features/currencyProvider/slice";

interface Props {
  selected: Currency | undefined;
  setSelected: React.Dispatch<
    React.SetStateAction<Currency | undefined>
  >;
  endPoint?: string;
  suggestionsProp:Currency[];
  placeholder?:string
}

function AutocompletePosition({ selected, setSelected, endPoint,suggestionsProp, placeholder }: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Currency[]>([]);

    // console.log(selected);

  useEffect(() => {
    // console.log(query.length);

    const callApi = async () => {
      try {
        if (query.length >= 3) {
            const filteredOptions: Currency[] = suggestionsProp.filter((option) =>
            option.name.toLowerCase().includes(query.toLowerCase())
          )
          setSuggestions(filteredOptions);
        }
      } catch (error) {
        console.log(error);
      }
    };
    callApi();
    // console.log(suggestions)
  }, [query]);
  return (
    <div className="nice-select" style={{ border: "none", padding: "0" }}>
      <Combobox
        value={selected}
        onChange={setSelected}
      >
        <div className="">
          <div className="">
            <Combobox.Input
              className=""
              placeholder="Select Currency"
              displayValue={() => {
                return selected?.symbol+" "+selected?.name;
              }}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Transition
            as={Fragment}
            leave=""
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            // afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="_my_nice_select_options _my_nice_select_options_extended">
              {suggestions.length === 0 && query !== "" ? (
                <div className=" px-4">Nothing found.</div>
              ) : (
                suggestions.map((currency: Currency,id:number) => (
                  <Combobox.Option
                    key={id}
                    className={({ active }) =>
                      `option ${active && "selected focus"}`
                    }
                    value={currency}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-normal" : "font-normal"
                          }`}
                        >
                          {currency.name}{" "}{currency.symbol}
                        </span>
                        {selected ? (
                          <span
                            // onClick={() => selected(person)}
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            
                            {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
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

export default AutocompletePosition;
