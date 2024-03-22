"use client";
import { updateCurrCandidate } from "@/redux/features/candidate/api";
import AutocompleteSkill from "@/ui/autoCompleteSkill";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { notifyError, notifyInfo, notifySuccess } from "@/utils/toast";
import { isValidUrl } from "@/utils/helper";

const EditSocial = () => {
  const { currCandidate, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const dispatch = useAppDispatch();

  const [socialSites, setSocialSites] = useState({
    linkedIn: currCandidate?.socialSites.linkedIn || "",
    twitter: currCandidate?.socialSites.twitter || "",
    github: currCandidate?.socialSites.github || "",
    website: currCandidate?.socialSites.website || "",
  });
  useEffect(() => {
    setSocialSites({
      linkedIn: currCandidate?.socialSites.linkedIn || "",
      twitter: currCandidate?.socialSites.twitter || "",
      github: currCandidate?.socialSites.github || "",
      website: currCandidate?.socialSites.website || "",
    });
  }, [currCandidate]);
  // const [allFieldsCheck, setAllFieldsCheck] = useState(false);
  const [validLinkedIn, setValidLinkedIn] = useState(true);
  const [validGithub, setValidGithub] = useState(true);
  const [validTwitter, setValidTwitter] = useState(true);
  const [validWebsite, setValidWebsite] = useState(true);
  useEffect(() => {
    if (socialSites.linkedIn === "" || isValidUrl(socialSites.linkedIn)) {
      setValidLinkedIn(true);
    } else {
      setValidLinkedIn(false);
    }
  }, [socialSites.linkedIn]);
  useEffect(() => {
    if (socialSites.github === "" || isValidUrl(socialSites.github)) {
      setValidGithub(true);
    } else {
      setValidGithub(false);
    }
  }, [socialSites.github]);
  useEffect(() => {
    if (isValidUrl(socialSites.twitter) || socialSites.twitter === "") {
      setValidTwitter(true);
    } else {
      setValidTwitter(false);
    }
  }, [socialSites.twitter]);
  useEffect(() => {
    if (socialSites.website === "" || isValidUrl(socialSites.website)) {
      setValidWebsite(true);
    } else {
      setValidWebsite(false);
    }
  }, [socialSites.website]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSocialSites({
      ...socialSites,
      [name]: value,
    });
  };

  const handleSave = async () => {
    // validation
    if (
      (socialSites.linkedIn && !isValidUrl(socialSites.linkedIn)) ||
      (socialSites.twitter && !isValidUrl(socialSites.twitter)) ||
      (socialSites.github && !isValidUrl(socialSites.github)) ||
      (socialSites.website && !isValidUrl(socialSites.website))
    ) {
      notifyInfo("Please enter a valid url");
      return;
    }
    if (currCandidate) {
      const isUpdated = await updateCurrCandidate(dispatch, currCandidate._id, {
        socialSites,
      });

      if (isUpdated) {
        notifySuccess("Social sites updated successfully");
      } else notifyError("something went wrong try again");
    }
  };

  return (
    <>
      {
        <div
          className="modal fade"
          id="socialModal"
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
                  <div className="d-flex flex-wrap gap-3 justify-content-between     ">
                    <div className="dash-input-wrapper mb-30 w-100">
                      <label htmlFor="firstName">Linked In</label>
                      <div className="d-flex align-items-center position-relative">
                        <input
                          type="text"
                          name="linkedIn"
                          placeholder="https://www.LinkedIn.com"
                          value={socialSites.linkedIn}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    {!validLinkedIn && (
                      <p style={{ color: "red", marginTop: "-50px" }}>
                        Enter a valid url
                      </p>
                    )}
                    <div className="dash-input-wrapper mb-30 w-100">
                      <label htmlFor="lastName">Twitter</label>
                      <div className="d-flex  align-items-center position-relative">
                        <input
                          name="twitter"
                          type="text"
                          placeholder="https://www.twitter.com"
                          value={socialSites?.twitter}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    {!validTwitter && (
                      <p style={{ color: "red", marginTop: "-50px" }}>
                        Enter a valid url
                      </p>
                    )}
                    <div className="dash-input-wrapper mb-30 w-100">
                      <label htmlFor="">Github</label>
                      <div className="d-flex align-items-center position-relative">
                        <input
                          name="github"
                          type="text"
                          placeholder="https://www.github.com"
                          value={socialSites?.github}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    {!validGithub && (
                      <p style={{ color: "red", marginTop: "-50px" }}>
                        Enter a valid url
                      </p>
                    )}
                    <div className="dash-input-wrapper mb-30 w-100">
                      <label htmlFor="">WebSite</label>
                      <input
                        type="text"
                        name="website"
                        placeholder="https://www.example.com"
                        value={socialSites?.website}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  {!validWebsite && (
                    <p style={{ color: "red", marginTop: "-50px" }}>
                      Enter a valid url
                    </p>
                  )}
                  <div className="button-group d-inline-flex align-items-center mt-30">
                    {validLinkedIn &&
                    validTwitter &&
                    validGithub &&
                    validWebsite ? (
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
      }
    </>
  );
};

export default EditSocial;
