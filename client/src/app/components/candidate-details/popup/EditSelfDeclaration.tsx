"use client";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Value } from "sass";
import { notifyError, notifyInfo, notifySuccess } from "@/utils/toast";
import { updateCurrCandidate } from "@/redux/features/candidate/api";
import LocationAutoComplete from "@/ui/locationAutoComplete";
import NiceSelect from "@/ui/nice-select";

const EditSelfDeclaration = () => {
  const { currCandidate, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const dispatch = useAppDispatch();
  const user = currCandidate;

  //   const [gender, setGender] = useState(user?.location?.city);
  //   const [race, setRace] = useState(user?.location?.country);
  //   const [ethnicity, setEthnicity] = useState(user?.location?.country);
  const [selfDeclaration, setSelfDeclaration] = useState({
    gender: user?.selfDeclaration?.gender || undefined,
    race: user?.selfDeclaration?.race || undefined,
  });
  // useEffect(() => {
  //   setSelfDeclaration({
  //     gender: user?.selfDeclaration?.gender || undefined,
  //     race: user?.selfDeclaration?.race || undefined,
  //   });
  // }, [currCandidate]);
  const [allFieldsCheck, setAllFieldsCheck] = useState(false);
  useEffect(() => {
    if (selfDeclaration.gender && selfDeclaration.race) {
      setAllFieldsCheck(true);
    } else {
      setAllFieldsCheck(false);
    }
  }, [selfDeclaration]);
  const handleSelfDeclarationChange = (
    item: { value: string; label: string },
    name: string
  ) => {
    setSelfDeclaration({
      ...selfDeclaration,
      [name]: item.value,
    });
  };

  const handleSave = async () => {
    // validation
    if (!selfDeclaration.gender || !selfDeclaration.race) {
      notifyInfo("field with marked * can't be empty");
      return;
    }

    if (currCandidate) {
      const isUpdated = await updateCurrCandidate(dispatch, currCandidate._id, {
        selfDeclaration,
      });

      if (isUpdated) {
        notifySuccess("Self Declaration updated successfully");
      } else notifyError("something went wrong try again");
    }
    setSelfDeclaration({ gender: undefined, race: undefined });
  };
  console.log(selfDeclaration);

  return (
    <>
      <div
        className="modal fade"
        id="selfDeclarationModal"
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
                <div className="row">
                  <div className="col-12">
                    <div className="dash-input-wrapper mb-25">
                      <label htmlFor="city">Gender*</label>
                      <NiceSelect
                        options={[
                          { value: "Male", label: "Male" },
                          { value: "Female", label: "Female" },
                          { value: "Other", label: "Other" },
                          {
                            value: "Prefer not to reveal",
                            label: "Prefer not to reveal",
                          },
                        ]}
                        defaultCurrent={0}
                        onChange={(item) =>
                          handleSelfDeclarationChange(item, "gender")
                        }
                        name="gender"
                        placeholder="Gender"
                        cls="bg-white"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="dash-input-wrapper mb-25">
                      <label htmlFor="">Race*</label>
                      <NiceSelect
                        options={[
                          { value: "White", label: "White" },
                          {
                            value: "Black or African American",
                            label: "Black or African American",
                          },
                          {
                            value: "American Indian or Alaska Native",
                            label: "American Indian or Alaska Native",
                          },
                          { value: "Asian", label: "Asian" },
                          {
                            value: "Native Hawaiian or Other Pacific Islander",
                            label: "Native Hawaiian or Other Pacific Islander",
                          },
                        ]}
                        defaultCurrent={0}
                        onChange={(item) =>
                          handleSelfDeclarationChange(item, "race")
                        }
                        name="race"
                        placeholder="Race"
                        cls="bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="button-group d-inline-flex align-items-center mt-30">
                  {allFieldsCheck ? (
                    <button
                      onClick={handleSave}
                      className="dash-btn-two tran3s me-3"
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={handleSave}
                      className="dash-btn-two tran3s me-3"
                      type="button"
                      // data-bs-dismiss="modal"
                      // aria-label="Close"
                    >
                      Save
                    </button>
                  )}
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
    </>
  );
};

export default EditSelfDeclaration;
