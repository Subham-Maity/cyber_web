import NiceSelect from "@/ui/nice-select";
import React from "react";

interface Props {
  firstInput: string;
  setRound: React.Dispatch<React.SetStateAction<string>>;
}

const SelectRound = ({ setRound, firstInput }: Props) => {
  const handleRound = (item: { value: string; label: string }) => {
    setRound(item.value);
  };
  const options = [
    { label: "Seed Round", value: "Seed Round" },
    { label: "Series A", value: "Series A" },
    { label: "Series B", value: "Series B" },
    { label: "Series C", value: "Series C" },
    { label: "Mezzanine Financing", value: "Mezzanine Financing" },
    { label: "Initial Public Offering (IPO)", value: "IPO" },
    { label: "Late-Stage Rounds", value: "Late-Stage Rounds" },
    { label: "Secondary Offerings", value: "Secondary Offerings" },
    { label: "Crowdfunding", value: "Crowdfunding" },
    { label: "Convertible Notes", value: "Convertible Notes" },
  ];

  options.unshift({ value: firstInput, label: firstInput });

  return (
    <div className="dash-input-wrapper mb-30">
      <NiceSelect
        isScroll={true}
        options={options}
        defaultCurrent={0}
        onChange={(item) => handleRound(item)}
        name="Year"
        placeholder="select"
      />
    </div>
  );
};

export default SelectRound;
