"use client";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Value } from "sass";
import { notifyError, notifyInfo, notifySuccess } from "@/utils/toast";
import { updateCurrCandidate } from "@/redux/features/candidate/api";
import AutocompleteCompany from "@/ui/autoCompeteCompanyName";
import SelectGender from "@/ui/select-gender";
import { updateCurrEmployer } from "@/redux/features/employer/api";
import { checkValidDescription, isPureString } from "@/utils/helper";
const EditProfile = () => {
  const { currEmployer, loading } = useAppSelector((state) => state.employer);
  const dispatch = useAppDispatch();
  const user = currEmployer;

  const [value, setValue] = useState(user?.phoneNumber);

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    bio: user?.bio || "",
    phoneNumber: user?.phoneNumber || "",
  });
  const [company, setCompany] = useState({
    name: user?.company?.name || "",
    companyId: user?.company?.companyId || "",
  });
  const [gender, setGender] = useState(user?.gender || "");

  const [checkForm,setCheckForm] = useState({
    firstName:true,
    lastName:true,
    bio:true,
    phoneNumber:true,
    gender:true,
    company:{
      name:true,
      campanyId:true,
    }
  })
  const [allFieldsCheck, setAllFieldsCheck] = useState(false);

  useEffect(() => {
    setCheckForm({...checkForm,firstName:isPureString(form.firstName||"")});
  },[form.firstName])
  useEffect(() => {
    setCheckForm({...checkForm,lastName:isPureString(form.lastName || "")});
  },[form.lastName]) 
  useEffect(() => {
    setCheckForm({...checkForm,bio:checkValidDescription(form.bio, 200)});
  },[form.bio])
  useEffect(() => {
    setCheckForm({...checkForm,phoneNumber:isValidPhoneNumber(value || "")});
  },[value])
  useEffect(() => {
    setCheckForm({...checkForm,gender:(gender===""||gender==="select gender")?false:true})
  },[gender])
  useEffect(() => {
    setCheckForm((prevCheckForm) => ({
      ...prevCheckForm,
      company: {
        ...prevCheckForm.company,
        name: (company.name !== "")?true:false, // Fix the logical error
      },
    }));
  }, [company.name]); 

  useEffect(() => {
    if(form.firstName && form.lastName && form.bio && value && company.name && gender){
      setAllFieldsCheck(true);
    }
  },[form.firstName,form.lastName,form.bio,value,gender,company.name])
  
    
  const handleSave = async () => {
    // validation
    if (
      !form.firstName ||
      !form.lastName ||
      !form.bio ||
      !value ||
      !company.name ||
      !gender ||
      gender === "select gender"
    ) {
      notifyInfo("Felid with * can't be empty");
      return;
    }
    if (!isValidPhoneNumber(value)) {
      notifyInfo("Enter a valid phone number");
      return;
    }

    if (currEmployer) {
      const isUpdated = await updateCurrEmployer(dispatch, currEmployer._id, {
        ...form,
        company,
        gender,
        phoneNumber: value,
      });

      if (isUpdated) {
        notifySuccess("Profile updated successfully");
      } else notifyError("something went wrong, try again");
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

  // console.log("selected", company);

  return (
    <>
      <div
        className="modal fade"
        id="empProfileModal"
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
                  <div className="dash-input-wrapper mb-30">
                    <label htmlFor="firstName">First Name*</label>
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleInputChange}
                      value={form.firstName}
                      placeholder="James"
                      style={{ borderColor: !form.firstName?"red":"", borderRadius: !form.firstName?"5px":"" }}
                    />
                    {!checkForm.firstName && (
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
                    {!checkForm.lastName && (
                      <p style={{ color: "red" }}>
                        Do not include symbol or number
                      </p>
                    )}
                  </div>

                  <div className="dash-input-wrapper mb-30" >
                    <label htmlFor="">Phone Number*</label>
                    {/* <input
                      type="text"
                      name="phoneNumber"
                      onChange={handleInputChange}
                      value={form.phoneNumber}
                      placeholder="+880 01723801729"
                    /> */}
                    <PhoneInput
                      d
                      placeholder="Enter phone number"
                      value={value}
                      onChange={(value: any) => setValue(value)}
                      
                    />
                    {!checkForm.phoneNumber && (
                      <p style={{ color: "red" }}>Enter Valid Phone Number</p>
                    )}
                    {/* <input type="text" placeholder="Brower" /> */}
                  </div>
                  <div className="dash-input-wrapper mb-30" >
                    <label htmlFor="lastName">Company Name*</label>
                    <AutocompleteCompany
                      selected={company}
                      setSelected={setCompany}
                      endPoint="companyName"
                      showCreate={true}
                      top={true}
                    />
                  </div>
                  <div className="dash-input-wrapper mb-30">
                    <label htmlFor="lastName">Gender*</label>
                    <SelectGender
                      default={{ value: gender, label: gender }}
                      firstInput={!user?.gender ? "select gender" : ""}
                      setMonth={setGender}
                    />
                  </div>
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
                  {!checkForm.bio && (
                    <p style={{ color: "red" }}>
                      Description must have {form.bio.trim().replace(/\s+/g, "").length}/200
                      characters
                    </p>
                  )}
                </div>
                <div className="button-group d-inline-flex align-items-center mt-30">
                  {!allFieldsCheck || !checkForm.firstName || !checkForm.lastName || !checkForm.bio || !checkForm.company.name || !checkForm.phoneNumber || !checkForm.gender ? (
                    <button
                    onClick={handleSave}
                    className="dash-btn-two tran3s me-3"
                    type="button"
                    // data-bs-dismiss="modal"
                    // aria-label="Close"
                  >
                    Save
                  </button>
                  ):(

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
