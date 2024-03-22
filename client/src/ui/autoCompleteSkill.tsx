import React, { useState, useEffect, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import instance from "@/lib/axios";
import { notifyError, notifyInfo } from "@/utils/toast";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { cybersecuritySkills } from "@/data/skills";
import { addCandidateSkillDB } from "@/redux/features/candidate/api";
interface Props {
  skills: string[];
  setSkills: React.Dispatch<React.SetStateAction<string[]>>;
  top?:boolean
}
// { selected, setSelected }: Props
function AutocompleteSkill({ skills, setSkills,top }: Props) {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any>([]);
  const { currCandidate } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    // const input = query.toLocaleLowerCase();
    // const _suggestions = cybersecuritySkills.filter((obj) =>
    //   obj.skill.toLowerCase().includes(input)
    // );

    // setSuggestions(_suggestions);
    const callApi = async () => {
      try {
        if (query.length >= 2) {
          const { data } = await instance.get(
            `candidateSkills/search?query=${query}`
          );
          setSuggestions(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    callApi();
  }, [query]);
  //   console.log(suggestions);

  const handleSelect = (value: string) => {
    if (skills.includes(value)) {
      notifyInfo("Skill already added");
      return;
    }

    setSelected(value);
    setSkills((prev) => [...prev, value]);
    setQuery("");
  };

  const handleAddSkill = async () => {
    if (skills.includes(query)) {
      notifyInfo("Skill already added");
      return;
    }
    const isAdded = await addCandidateSkillDB(dispatch, query);
    if (isAdded) {
      setSkills((prev) => [...prev, query]);
      setQuery("");
    }
  };

  return (
    <div className="nice-select" style={{ border: "none", padding: "0" }}>
      <Combobox value={selected} onChange={handleSelect}>
        <div className="">
          <div className=" position-relative ">
            <Combobox.Input
              className=""
              placeholder="Add Skill"
              displayValue={() => ""}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query.length >= 3 && (
              <p
                onClick={handleAddSkill}
                title="Add this skill if not found in the list"
                className="skill-add btn-one position-absolute px-3 py-1"
                style={{
                  zIndex: 10,
                  top: top  ? "50%" : "12%",
                  right: "5%",
                  transform: "translateY(-50%)",
                }}
              >
                Add
              </p>
            )}
          </div>
          <Transition
            as={Fragment}
            leave=""
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="_my_nice_select_options _my_nice_select_options_extended">
              {suggestions.length === 0 && query !== "" ? (
                <div className="mx-4">Nothing found.</div>
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

export default AutocompleteSkill;
