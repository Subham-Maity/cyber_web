import NiceSelect from "@/ui/nice-select";
import { it } from "node:test";
import React from "react";

interface Props {
  firstInput: string;
  setYear: React.Dispatch<React.SetStateAction<string>>;
  default?: { value: string; label: string };
  placeholder?: string;
  presentWork?: boolean;
}

const SelectYear = ({
  setYear,
  firstInput,
  default: defaultOption,
  placeholder,
  presentWork,
}: Props) => {
  const handleYear = (item: { value: string; label: string }) => {
    setYear(item.value);
  };
  let year = new Date().getFullYear();
  let years = Array.from({ length: 101 }, (_, i) => year - i);
  let options = years.map((year) => ({
    value: String(year),
    label: String(year),
  }));
  // options.unshift({ value: "Present", label: "Present" });
  options.unshift({ value: firstInput, label: firstInput });

  let def = 0;
  if (defaultOption) {
    // console.log(defaultOption);
    def = options.findIndex((option) => option.value === defaultOption.value);
    // console.log(def,"Default option");
  }

  return (
    <div className="dash-input-wrapper mb-30">
      <NiceSelect
        isScroll={true}
        options={options}
        defaultCurrent={def}
        onChange={(item) => handleYear(item)}
        name="Year"
        placeholder={placeholder}
        // disabled={presentWork}
      />
    </div>
  );
};

export default SelectYear;
