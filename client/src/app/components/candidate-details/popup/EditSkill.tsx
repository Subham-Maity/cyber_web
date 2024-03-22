"use client";
import { updateCurrCandidate } from "@/redux/features/candidate/api";
import AutocompleteSkill from "@/ui/autoCompleteSkill";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { notifyError, notifyInfo, notifySuccess } from "@/utils/toast";

const EditSkill = ({ skills }: { skills: string[] }) => {
  const dispatch = useAppDispatch();
  const { currCandidate } = useAppSelector(
    (s) => s.candidate.candidateDashboard
  );
  const user = currCandidate;
  const [_skills, setSkills] = useState<string[]>(user?.skills||[]);
  // const [lastUserSkills,setLastUserSkills] = useState<string[]>(user?.skills||[]);
  const handleRemove = (skill: string) => {
    setSkills((prev) => prev.filter((val) => val !== skill));
  };
  useEffect(() => {
    setSkills(user?.skills||[]);
  },[currCandidate])
  // useEffect(() => {
  //   if (!lastUserSkills || _skills !== lastUserSkills) {
  //     setSkills(user?.skills || []);
  //     setLastUserSkills(user?.skills || []);
  //   }
  // }, [skills]);
  const handleSave = async () => {
    if (currCandidate) {
      if(_skills.length === 0){
        notifyInfo("Skills should not be empty.");
        return;
      }
      const isUpdated = await updateCurrCandidate(dispatch, currCandidate._id, {
        skills: _skills,
      });
      if (isUpdated) {
        notifySuccess("Skills updated successfully");
      } else notifyError("something went wrong try again");
    }
  };
  return (
    <>
      {
        <div
          className="modal fade"
          id="skillModal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen modal-dialog-centered">
            <div className="container-fluid">
              <div className="user-data-form modal-content">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>

                <div className="form-wrapper dash-input-wrapper m-auto w-100 ">
                  <div>
                    <h3 className=" text-dark ">Primary skills</h3>
                    <div>
                      Tell recruiters what you know or what you are known for
                      e.g. Direct Marketing, Oracle, Java etc. We will send you
                      job recommendations based on these skills.
                    </div>
                  </div>
                  <div className="mt-3">
                    <h4>Skills</h4>
                    <div className="skills-wrapper">
                      <ul className="style-none .skill-input-data d-flex flex-wrap align-items-center">
                        {_skills.map((val, index) => (
                          <li key={index} className="is_tag">
                            <button>
                              {val}

                              <i
                                onClick={() => handleRemove(val)}
                                className="bi bi-x"
                              ></i>
                            </button>
                          </li>
                        ))}

                        {/* <li className="more_tag">
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#skillModal"
                          type="button"
                          className=" d-flex justify-content-center align-items-center "
                        ></button>
                      </li> */}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3">
                    <AutocompleteSkill skills={_skills} setSkills={setSkills} top={true}/>
                  </div>

                  <div className="button-group d-inline-flex align-items-center mt-30">
                   {_skills.length === 0? 
                   <button
                   onClick={handleSave}
                   className="dash-btn-two tran3s me-3"
                   type="button"
                  //  data-bs-dismiss="modal"
                  //  aria-label="Close"
                 >
                   Save
                 </button>
                   :
                   <button
                      onClick={handleSave}
                      className="dash-btn-two tran3s me-3"
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Save
                    </button>
                   } 
                    <button
                      className="dash-cancel-btn tran3s"
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default EditSkill;
