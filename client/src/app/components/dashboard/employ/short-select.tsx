"use client";
import React from "react";
import NiceSelect from "@/ui/nice-select";

const EmployShortSelect = () => {
  // handleShort
  const handleShort = (item: { value: string; label: string }) => {};
  return (
    <NiceSelect
      options={[
        { value: "Received", label: "Received" },
        { value: "Under Review", label: "Under Review" },
        { value: "Shortlisted", label: "Shortlisted" },
        { value: "Not Selected", label: "Not Selected" },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleShort(item)}
      name="Short by"
    />
  );
};

export default EmployShortSelect;
