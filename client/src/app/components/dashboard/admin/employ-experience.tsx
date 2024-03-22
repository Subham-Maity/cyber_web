import NiceSelect from "@/ui/nice-select";
import React from "react";

interface obj {
  experience: string;
  location: string;
}

interface Props {
  selected: obj;
  setSelected: React.Dispatch<React.SetStateAction<obj>>;
}

const EmployExperience = ({ selected, setSelected }: Props) => {
  const handleExperience = (item: { value: string; label: string }) => {
    setSelected((prev) => ({
      ...prev,
      experience: item.value,
    }));
    // console.log(selected, item.value);
  };
  const handleLocation = (item: { value: string; label: string }) => {
    setSelected((prev) => ({
      ...prev,
      location: item.value,
    }));
    // console.log(selected, item.value);
  };

  return (
    <div className="row align-items-end">
      <div className="col-md-6">
        <div className="dash-input-wrapper mb-30">
          <label htmlFor="">Experience*</label>
          <NiceSelect
            options={[
              { value: "Intermediate", label: "Intermediate" },
              { value: "No-Experience", label: "No-Experience" },
              { value: "Expert", label: "Expert" },
            ]}
            defaultCurrent={0}
            onChange={(item) => handleExperience(item)}
            name="Experience"
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="dash-input-wrapper mb-30">
          <label htmlFor="">Location*</label>
          <NiceSelect
            options={[
              { value: "Washington DC", label: "Washington DC" },
              { value: "California, CA", label: "California, CA" },
              { value: "New York", label: "New York" },
              { value: "Miami", label: "Miami" },
            ]}
            defaultCurrent={0}
            onChange={(item) => handleLocation(item)}
            name="Experience"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployExperience;
