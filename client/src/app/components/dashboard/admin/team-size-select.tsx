import React from "react";
import NiceSelect from "@/ui/nice-select";

interface Props {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  defaultOption?: { value: string; label: string };
  placeholder?: string;
}

const TeamSizeSelect = ({ setSelected, defaultOption, placeholder }: Props) => {
  let options = [
    { value: "Individual", label: "Individual" },
    { value: "1-10", label: "1-10" },
    { value: "11-50", label: "11-50" },
    { value: "51-100", label: "51-100" },
    { value: "101-500", label: "101-500" },
    { value: "501-1,000", label: "501-1,000" },
    { value: "1,001-5,000", label: "1,001-5,000" },
    { value: "5,001-10,000", label: "5,001-10,000" },
    { value: "10,000+", label: "10,000+" },
  ];
  let def = 0;
  if (defaultOption) {
    // console.log(defaultOption);
    def = options.findIndex((option) => option.value === defaultOption.value);
    // console.log(def,"Default option");
  }
  const handleState = (item: { value: string; label: string }) => {
    setSelected(item.value);
  };
  return (
    <NiceSelect
      options={options}
      defaultCurrent={def}
      onChange={(item) => handleState(item)}
      name="State"
      placeholder={placeholder}
    />
  );
};

export default TeamSizeSelect;
