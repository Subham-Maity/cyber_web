"use client";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Value } from "sass";
import { notifyError, notifyInfo, notifySuccess } from "@/utils/toast";
import { updateCurrCandidate } from "@/redux/features/candidate/api";
import LocationAutoComplete from "@/ui/locationAutoComplete";

const EditLocation = () => {
  const { currCandidate, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const dispatch = useAppDispatch();
  const user = currCandidate;

  const [city, setCity] = useState(user?.location?.city);
  const [country, setCountry] = useState(user?.location?.country);
  const [allFieldsCheck, setAllFieldsCheck] = useState(false);
  useEffect(() => {
    setCity(user?.location?.city);
    setCountry(user?.location?.country);
  },[currCandidate])
  useEffect(()=>{
    if(city && country){
      setAllFieldsCheck(true);
    }
    else{
      setAllFieldsCheck(false);
    }
  },[city,country])
  const handleSave = async () => {
    const location = {
      city,
      country,
    };
    // validation
    if (!location.city || !location.country) {
      notifyInfo("field with marked * can't be empty");
      return;
    }

    if (currCandidate) {
      const isUpdated = await updateCurrCandidate(dispatch, currCandidate._id, {
        location,
      });

      if (isUpdated) {
        notifySuccess("Location updated successfully");
      } else notifyError("something went wrong try again");

    }
    setCity("");
    setCountry("");
  };
  console.log(city, country);

  return (
    <>
      <div
        className="modal fade"
        id="locationModal"
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
                  {allFieldsCheck ? 
                  <button
                    onClick={handleSave}
                    className="dash-btn-two tran3s me-3"
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Save
                  </button>
                  :
                  <button
                    onClick={handleSave}
                    className="dash-btn-two tran3s me-3"
                    type="button"
                    // data-bs-dismiss="modal"
                    // aria-label="Close"
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
    </>
  );
};

export default EditLocation;
