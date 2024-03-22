import { getTemplates, updateBeingUsedFor } from "@/redux/features/emailTemplate/api";
import { EmailTemplate, fetchTemplateUsedFor } from "@/redux/features/emailTemplate/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import NiceSelect from "@/ui/nice-select";
import { it } from "node:test";
import React, { useEffect, useState } from "react";

interface Props {
  firstInput?: string;
  //   setBeingUsedFor: React.Dispatch<React.SetStateAction<string>>;
  default?: string;
  placeholder?: string;
  template: EmailTemplate;
}

const SelectBeingUsedFor = ({
  //   setBeingUsedFor,
  firstInput,
  default: defaultOption,
  placeholder,
  template,

}: Props) => {
  const dispatch = useAppDispatch();

//   const { login, signup, paymentSuccess } = useAppSelector(
//     (state) => state.emailTemplate
//   );
  const { templates, page, totalNumOfPage, totalTemplate } = useAppSelector(
    (state) => state.emailTemplate
  );
  const handleBeingUsedFor = async (item: { value: string; label: string }) => {
    // setBeingUsedFor(item.value);
    await updateBeingUsedFor(dispatch, template._id!, item.value);
    getTemplates(dispatch, { page: page, limit: 8, templateType:template.templateType });
  };
  //   let year = new Date().getFullYear();
  //   let years = Array.from({ length: 101 }, (_, i) => year - i);
  //   let options = years.map((year) => ({
  //     value: String(year),
  //     label: String(year),
  //   }));
  
//   const [def, setDef] = useState<number>();
//   const [usedFor,setUsedFor] = useState(template.beingUsedFor);
//   //   options.unshift({ value: firstInput, label: firstInput });
//   useEffect(() => {
//     setUsedFor(template.beingUsedFor);

//    let d = options.findIndex((op) => op.value === template.beingUsedFor)
//    setDef(d);
   
//   }, [template,page]);
  let options = [
    { value: "login", label: "Login" },
    { value: "signup", label: "Signup" },
    { value: "paymentSuccess", label: "Payment Success" },
  ];
  //   let def = 0;

  return (
    <div className="dash-input-wrapper mb-30">
      <NiceSelect
        isScroll={true}
        options={options}
        defaultCurrent={undefined}
        onChange={(item) => handleBeingUsedFor(item)}
        name="Being Used For"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SelectBeingUsedFor;
