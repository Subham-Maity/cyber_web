import NiceSelect from "@/ui/nice-select";
import React from "react";

type Option = {
  value: string;
  label: string;
  date?: string;
};
interface Props {
  defaultCurrent?: string;
  onChange:(item:Option) => void;
  options:Option[];
  name:string;
  placeholder:string;
}
const NiceSelectDefaultValue = ({
  defaultCurrent,
  onChange,
  options,
  name,
  placeholder,
}:Props) => {
  const handleChange = (item:Option) => {
    onChange(item);
  };
  let def = 0;
  if(defaultCurrent){
    let d = options.findIndex((options) => options.value === defaultCurrent);
    if(d!==-1){
      def = d;
    }
  }
  

  return (
    <div>
      <NiceSelect
        options={options}
        placeholder={placeholder}
        // defaultCurrent={0}
        // defaultValue={currJob?.joiningTime }
        onChange={(item) => handleChange(item)}
        name={name}
        defaultCurrent={def}
      />
    </div>
  );
};

export default NiceSelectDefaultValue;
