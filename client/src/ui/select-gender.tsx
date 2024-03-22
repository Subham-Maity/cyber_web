import NiceSelect from "@/ui/nice-select";
import React from "react";

interface Props {
  firstInput: string;
  setMonth: React.Dispatch<React.SetStateAction<string>>;
  default?: { value: string; label: string };
}

const SelectGender = ({
  default: defaultOption,
  setMonth,
  firstInput,
}: Props) => {
  const handleYear = (item: { value: string; label: string }) => {
    setMonth(item.value);
  };

  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];

  options.unshift({ value: firstInput, label: firstInput });
  let def = 0;
  if (defaultOption) {
    console.log(defaultOption);
    const index = options.findIndex(
      (option) => option.value === defaultOption.value
    );
    if (index !== -1) {
      def = index;
    }
  }

  return (
    <div className="dash-input-wrapper mb-30">
      <NiceSelect
        isScroll={true}
        options={options}
        defaultCurrent={def}
        onChange={(item) => handleYear(item)}
        name="Year"
        placeholder="Select"
      />
    </div>
  );
};

export default SelectGender;
