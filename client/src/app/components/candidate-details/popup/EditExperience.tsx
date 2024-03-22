"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IEducation, IExperience } from "@/types/user-type";
import { useEffect } from "react";
import EditEducationBody from "./EducationBody";
import { setCurrDashEducation, setCurrDashExperience } from "@/redux/features/candidate/dashboardSlice";
import EditExperienceBody from "./ExperienceBody";

const EditExperience = () => {
  const { currDashExperience, currCandidate } = useAppSelector(
    (s) => s.candidate.candidateDashboard
  );

  const dispatch = useAppDispatch();

  const [experienceProp, setExperienceProp] = useState<IExperience | undefined>(
    undefined
  );

  useEffect(() => {
    const updatedExperienceProp = currCandidate?.experience.find(
      (obj) => obj?._id === currDashExperience
    );

    setExperienceProp(updatedExperienceProp);
    // console.log(updatedEducationProp);
  }, [currDashExperience]);
  useEffect(() => {
    return () => {
      dispatch(setCurrDashExperience(""));
    };
  }, []);

  return (
    <div
      className={`modal fade`}
      id="ExperienceModal"
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
              {experienceProp && (
                <>
                  <EditExperienceBody experienceProp={experienceProp} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExperience;
