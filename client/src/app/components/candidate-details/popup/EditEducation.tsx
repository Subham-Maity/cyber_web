"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IEducation } from "@/types/user-type";
import { useEffect } from "react";
import EditEducationBody from "./EducationBody";
import { setCurrDashEducation } from "@/redux/features/candidate/dashboardSlice";

const EditEducation = () => {
  const { currDashEducation, currCandidate } = useAppSelector(
    (s) => s.candidate.candidateDashboard
  );

  const dispatch = useAppDispatch();

  const [educationProp, setEducationProp] = useState<IEducation | undefined>(
    undefined
  );

  useEffect(() => {
    const updatedEducationProp = currCandidate?.education.find(
      (obj) => obj?._id === currDashEducation
    );

    setEducationProp(updatedEducationProp);
    // console.log(updatedEducationProp);
  }, [currDashEducation]);
  useEffect(() => {
    return () => {
      dispatch(setCurrDashEducation(""));
    };
  }, []);

  return (
    <div
      className={`modal fade`}
      id="EducationModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container">
          <div className="user-data-form modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>

            <div className="form-wrapper m-auto w-100 ">
              {educationProp && (
                <>
                  <EditEducationBody educationProp={educationProp} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEducation;
