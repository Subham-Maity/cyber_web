"use client";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Value } from "sass";
import { notifyError, notifyInfo, notifySuccess } from "@/utils/toast";
import { updateCurrCandidate } from "@/redux/features/candidate/api";
import LocationAutoComplete from "@/ui/locationAutoComplete";
import { updateCurrEmployer } from "@/redux/features/employer/api";

const EditLocation = () => {
  const { currEmployer, loading } = useAppSelector((state) => state.employer);
  const dispatch = useAppDispatch();
  const user = currEmployer;

  const [city, setCity] = useState(user?.location?.city || "");
  const [country, setCountry] = useState(user?.location?.country || "");

  const handleSave = async () => {
    const location = {
      city,
      country,
    };
    // validation
    if (!location.city || !location.country) {
      notifyInfo("field with marked * can't be empty");
    }

    if (currEmployer) {
      const isUpdated = await updateCurrEmployer(dispatch, currEmployer._id, {
        location,
      });

      if (isUpdated) {
        notifySuccess("Location updated updated successfully");
      } else notifyError("something went wrong try again");
    }
  };
  console.log(city, country);

  return (
    <>
      <div
        className="modal fade"
        id="empLocationModal"
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
                      <label htmlFor="city">City*</label>
                      <LocationAutoComplete
                        selected={city}
                        setSelected={setCity}
                        setCountry={setCountry}
                        type="cities"
                        label="City"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="dash-input-wrapper mb-25">
                      <label htmlFor="">Country*</label>
                      <LocationAutoComplete
                        selected={country}
                        setSelected={setCountry}
                        type="regions"
                        label="Country"
                      />
                    </div>
                  </div>
                </div>
                <div className="button-group d-inline-flex align-items-center mt-30">
                  <button
                    onClick={handleSave}
                    className="dash-btn-two tran3s me-3"
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Save
                  </button>
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

export default EditLocation;
