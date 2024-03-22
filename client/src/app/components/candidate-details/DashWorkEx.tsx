import { IExperience } from "@/types/user-type";
import React from "react";

interface Props {
    experience?: IExperience[] | undefined;
  }
const WorkExperience = ({ experience }: Props) => {
  return (
    <div className="time-line-data position-relative pt-15">
      {experience?.map((obj, index) => (
        <div className="info position-relative">
          <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">
            {index + 1}
          </div>
          <div className="text_1 fw-500">
            {obj.startYear}-{obj.endYear}
          </div>
          <h4>
            {obj.title} ({obj.company})
          </h4>
          <p>
            {obj.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WorkExperience;