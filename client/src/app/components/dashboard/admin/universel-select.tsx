import React from "react";
import NiceSelect from "@/ui/nice-select";

interface Props {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  options: { value: string; label: string }[];
}

const UniversalSelect = ({ setSelected, options }: Props) => {
  const handleState = (item: { value: string; label: string }) => {
    setSelected(item.value);
  };
  return (
    <NiceSelect
      options={options}
      defaultCurrent={0}
      onChange={(item) => handleState(item)}
      name="State"
    />
  );
};

export default UniversalSelect;
