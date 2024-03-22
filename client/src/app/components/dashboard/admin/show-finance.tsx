import { IFunding } from "@/types/company";
import React, { useEffect } from "react";

interface Props {
  funding: IFunding[];
  handleRemoveFunding: (index: number) => void;
}

const Finance = ({ funding, handleRemoveFunding }: Props) => {
  return (
    <div className="time-line-data position-relative pt-15">
      {funding?.map((obj, index) => (
        <div className="info position-relative">
          <div className="float-end">
            <button
              className="apply-btn text-center tran3s"
              onClick={() => handleRemoveFunding(index)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
          <div>
            <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">
              {index + 1}
            </div>
            <div className="text_1 fw-500">
              by {obj.fundedBy} in {obj.yearOfFunding}
            </div>
            <h4> Amount : {obj.amount}</h4>
            <p>round :{obj.round}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Finance;
