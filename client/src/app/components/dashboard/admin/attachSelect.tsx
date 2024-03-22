import React from "react";
import NiceSelect from "@/ui/nice-select";

interface Props {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const AttachSelect = ({ setSelected }: Props) => {
  const handleState = (item: { value: string; label: string }) => {
    setSelected(item.value);
  };
  return (
    <NiceSelect
      options={[
        { value: "Select Schema", label: "Select Schema" },
        { value: "CandidateSubModel", label: "Candidate Subscription Model" },
        { value: "EmployerSubModel", label: "Employer Subscription Model" },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleState(item)}
      name="State"
    />
  );
};

export default AttachSelect;
