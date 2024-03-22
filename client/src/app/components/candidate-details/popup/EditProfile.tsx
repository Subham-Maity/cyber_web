"use client";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { notifyError, notifyInfo, notifySuccess } from "@/utils/toast";
import { updateCurrCandidate } from "@/redux/features/candidate/api";
import { checkValidDescription, isPureString } from "@/utils/helper";

const EditProfile = () => {
  const { currCandidate, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const dispatch = useAppDispatch();
  const user = currCandidate;

  const [value, setValue] = useState(user?.phoneNumber);
  const [phoneValidState, setPhoneValidState] = useState(true);
  const [firstNameValidState, setFirstNameValidState] = useState(true);
  const [lastNameValidState, setLastNameValidState] = useState(true);
  const [experienceInYearsValidState, setExperienceInYearsValidState] =
    useState(true);
  // const [firstNameCheck,setFirstNameCheck] = useState(false);
  const [allFieldsCheck, setAllFieldsCheck] = useState(false);
  const [validDescription, setValidDescription] = useState(true);
 

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    bio: user?.bio || "",
    phoneNumber: user?.phoneNumber || "",
    experienceInYears: user?.experienceInYears || "",
  });
  useEffect(() => {
    setValue(user?.phoneNumber)
    setForm({
      firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    bio: user?.bio || "",
    phoneNumber: user?.phoneNumber || "",
    experienceInYears: user?.experienceInYears || "",
    })
  },[currCandidate])

  useEffect(() => {
    if (
      form.firstName &&
      form.lastName &&
      form.experienceInYears &&
      form.bio &&
      value
    ) {
      setAllFieldsCheck(true);
    } else {
      setAllFieldsCheck(false);
    }
    // console.log(form.firstName,formCheck.firstName,"Hello");
  }, [value, form.firstName, form.lastName, form.experienceInYears, form.bio]);
  useEffect(() => {
    // Phone validation
    if (!isValidPhoneNumber(value || "")) {
      setPhoneValidState(false);
    } else {
      setPhoneValidState(true);
    }
  
    // First name validation
    if (!isPureString(form.firstName || "")) {
      setFirstNameValidState(false);
    } else {
      setFirstNameValidState(true);
    }
  
    // Last name validation
    if (!isPureString(form.lastName || "")) {
      setLastNameValidState(false);
    } else {
      setLastNameValidState(true);
    }
  
    // Experience in years validation
    if (parseInt(form.experienceInYears as string) >= 0 && parseInt(form.experienceInYears as string)<= 70) {
      setExperienceInYearsValidState(true);
    } else {
      setExperienceInYearsValidState(false);
    }
  
    // Bio validation
    if (checkValidDescription(form.bio, 200)) {
      setValidDescription(true);
    } else {
      setValidDescription(false);
    }
  }, [value, form.firstName, form.lastName, form.experienceInYears, form.bio]);
  

  const handleSave = async () => {
    // validation
    if (!firstNameValidState || !lastNameValidState || !phoneValidState) {
      notifyInfo("please check input fields again");
      return;
    }
    if (
      !form.firstName ||
      !form.lastName ||
      !form.bio ||
      !value ||
      !form.experienceInYears
    ) {
      
      notifyInfo("Field with * can't be empty");
      return;
    }
    if (!isValidPhoneNumber(value)) {
      notifyInfo("Enter a valid phone number");
      return;
    }
    if (!experienceInYearsValidState) {
      notifyInfo("Please enter experience between 0 and 70");
      return;
    }
    if (!validDescription) {
      notifyInfo("Please enter 200 character long description");
      return;
    }

    if (currCandidate) {
      const isUpdated = await updateCurrCandidate(dispatch, currCandidate._id, {
        ...form,
        phoneNumber: value,
      });

      if (isUpdated) {
        notifySuccess("Profile updated successfully");
      } else notifyError("something went wrong try again");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <div
        className="modal fade"
        id="profileModal"
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
                  <div className="dash-input-wrapper mb-30 ">
                    <label htmlFor="firstName">First Name*</label>
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleInputChange}
                      value={form.firstName}
                      placeholder="James"
                      style={{ borderColor: !form.firstName?"red":"", borderRadius: !form.firstName?"5px":"" }}
                      // style={{borderColor:formCheck.firstName?"red":"",border:"1px"}}
                    />
                    {!firstNameValidState && (
                      <p style={{ color: "red" }}>
                        Do not include symbol or number
                      </p>
                    )}
                  </div>
                  <div className="dash-input-wrapper mb-30">
                    <label htmlFor="lastName">Last Name*</label>
                    <input
                      type="text"
                      name="lastName"
                      onChange={handleInputChange}
                      value={form.lastName}
                      placeholder="brown"
                      style={{ borderColor: !form.lastName?"red":"", borderRadius: !form.lastName?"5px":"" }}
                    />
                    {!lastNameValidState && (
                      <p style={{ color: "red" }}>
                        Do not include symbol or number
                      </p>
                    )}
                  </div>

                  <div className="dash-input-wrapper mb-30">
                    <label htmlFor="">Phone Number*</label>
                    {/* <input
                      type="text"
                      name="phoneNumber"
                      onChange={handleInputChange}
                      value={form.phoneNumber}
                      placeholder="+880 01723801729"
                    /> */}
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={value}
                      onChange={(value: any) => setValue(value)}
                      // style={{ borderColor: !value?"red":"", borderRadius: !value?"5px":"" }}
                    />
                    {!phoneValidState && (
                      <p style={{ color: "red" }}>Enter Valid Phone Number</p>
                    )}
                    {/* <input type="text" placeholder="Brower" /> */}
                  </div>
                  <div className="dash-input-wrapper mb-30">
                    <label htmlFor="experience in years">Years of experience*</label>
                    <input
                      type="number"
                      name="experienceInYears"
                      onChange={handleInputChange}
                      value={form.experienceInYears}
                      placeholder="Enter your experience in years"
                      style={{ borderColor: form.experienceInYears===""?"red":"", borderRadius: form.experienceInYears===""?"5px":"" }}
                    />
                  </div>
                  {!experienceInYearsValidState && (
                    <p style={{ color: "red" }}>
                      Please enter experience between 0 and 70
                    </p>
                  )}
                  <div className="dash-input-wrapper">
                    <label htmlFor="bio">Bio*</label>
                    <textarea
                      className="size-lg"
                      placeholder="Write something interesting about you...."
                      value={form.bio}
                      name="bio"
                      onChange={handleInputChange}
                      style={{ borderColor: !form.bio?"red":"", borderRadius: !form.bio?"5px":"" }}
                    ></textarea>
                  </div>
                  {!validDescription && (
                    <p style={{ color: "red" }}>
                      Description must have {form.bio.trim().replace(/\s+/g, "").length}/200
                      characters
                    </p>
                  )}
                </div>
                <div className="button-group d-inline-flex align-items-center mt-30">
                  {!allFieldsCheck ||
                  !firstNameValidState ||
                  !lastNameValidState ||
                  !phoneValidState ||
                  !experienceInYearsValidState ||
                  !validDescription ? (
                    <button
                      onClick={handleSave}
                      className="dash-btn-two tran3s me-3"
                      type="button"
                      // data-bs-dismiss="modal"
                      // aria-label="Close"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={handleSave}
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
    </>
  );
};

export default EditProfile;
