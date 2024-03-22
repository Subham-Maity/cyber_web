import { IEducation } from "@/types/user-type";
import React from "react";

interface Props {
  education?: IEducation[] | undefined;
}

const Education = ({ education }: Props) => {
  return (
    <div className="time-line-data position-relative pt-15">
      {education?.map((obj, index) => (
        <div className="info position-relative">
          <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">
            {index + 1}
          </div>
          <div className="text_1 fw-500">
            {" "}
            {obj.institute} {` (${obj.startYear}-${obj.endYear})`}
          </div>
          <h4>{obj.degree}</h4>
          <p>
            {obj.description} 
          </p>
        </div>
      ))}
    </div>
  );
};

export default Education;
