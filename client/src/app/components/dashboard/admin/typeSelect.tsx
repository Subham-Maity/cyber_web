import React from "react";
import NiceSelect from "@/ui/nice-select";

interface Props {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const TypeSelect = ({ setSelected }: Props) => {
  const handleState = (item: { value: string; label: string }) => {
    setSelected(item.value);
  };
  return (
    <NiceSelect
      options={[
        { value: "Select Type", label: "Select Type" },
        { value: "String", label: "String" },
        { value: "Number", label: "Number" },
        { value: "Date", label: "Date" },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleState(item)}
      name="State"
    />
  );
};

export default TypeSelect;
