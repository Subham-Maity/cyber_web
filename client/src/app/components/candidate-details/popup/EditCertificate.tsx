"use client";
import React, { useEffect, useState } from "react";
import { updateCurrCandidate } from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { notifyError, notifyInfo, notifySuccess } from "@/utils/toast";

const EditCertificate = ({ certificates }: { certificates: string[] }) => {
  const dispatch = useAppDispatch();
  const { currCandidate } = useAppSelector(
    (s) => s.candidate.candidateDashboard
  );

  const [_certificates, setCertificates] = useState<string[]>(
    certificates || []
  );
  useEffect(() => {
    setCertificates(certificates);
  }, [currCandidate]);
  const [certificateInput, setCertificateInput] = useState("");

  const handleSave = async () => {
    // if (_certificates.length === 0) {
    //   notifyInfo("Cretificates cannot be empty");
    //   return;
    // }
    if (currCandidate) {
      const isUpdated = await updateCurrCandidate(dispatch, currCandidate._id, {
        certificate: _certificates,
      });
      if (isUpdated) {
        // setSaveVisible(false);
        notifySuccess("updated successfully");
      } else notifyError("something went wrong try again");
    }
  };

  const addCertificate = () => {
    if (certificateInput.trim() !== "") {
      // Update the state with the new certificate

      setCertificates([..._certificates, certificateInput]);
      // Clear the input field
      setCertificateInput("");
    } else {
      notifyInfo("Blank field cannot be added");
    }
  };

  const removeText = (certificates: string) => {
    setCertificates((prev) => prev.filter((val) => val != certificates));
  };

  return (
    <>
      {
        <div
          className="modal fade"
          id="certificationModal"
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
                    <h3 className=" text-dark ">
                      Certificates and Qualifications
                    </h3>
                    <div>
                      Tell recruiters what you have Achived, what courses you
                      have done.
                    </div>
                  </div>
                  <div className="mt-3">
                    <h4>Certificates</h4>
                    <div className="skills-wrapper">
                      <ul className="style-none .skill-input-data d-flex flex-wrap align-items-center">
                        {_certificates?.map((val, index) => (
                          <li key={index} className="is_tag">
                            <button>
                              {val}

                              <i
                                onClick={() => removeText(val)}
                                className="bi bi-x"
                              ></i>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="d-flex">
                      <div className="d-flex me-3 w-100">
                        <input
                          type="text"
                          value={certificateInput}
                          onChange={(e) => setCertificateInput(e.target.value)}
                          placeholder="Add a certificate"
                          className="mt-3 "
                        />
                      </div>
                      <div className="d-flex">
                        <button
                          className="mt-3 btn-one"
                          onClick={addCertificate}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="button-group d-inline-flex align-items-center mt-30">
                    {(_certificates?.length > 0 ||
                      certificates?.length > 0) && (
                      <button
                        onClick={() => {
                          handleSave();
                        }}
                        className="dash-btn-two tran3s me-3"
                        type="button"
                        data-bs-dismiss="modal"
                        aria-label="Close"
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
      }
    </>
  );
};

export default EditCertificate;
