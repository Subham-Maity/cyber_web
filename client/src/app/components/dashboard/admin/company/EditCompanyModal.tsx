"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import avatar from "@/assets/dashboard/images/avatar_04.jpg";
import DashboardHeader from "../../candidate/dashboard-header";
import TeamSizeSelect from "../team-size-select";
import LocationAutoComplete from "@/ui/locationAutoComplete";
import DropZone from "@/layouts/dropZone";
import AutocompletePosition from "@/ui/autoCompletePosistion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addCompany } from "@/redux/features/company/api";
import Loader from "@/ui/loader";
import SelectYear from "../../candidate/select-year";
import { IFunding } from "@/types/company";
import SelectRound from "../selectRound";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useAppSelector } from "@/redux/hook";
import "react-phone-number-input/style.css";
import AutocompleteBenefits from "@/ui/autoCompletebenefits";
import Finance from "../show-finance";
import { notifyInfo, notifySuccess } from "@/utils/toast";
import { resetFile, setFile } from "@/redux/features/globalSlice";
import {
  checkValidDescription,
  isFundingAmount,
  isPureString,
  isValidEmail,
  isValidUrl,
} from "@/utils/helper";
import { ICompany } from "@/types/company-type";
import { getAllCompany, updateCompany } from "@/redux/features/admin/api";

const EditCompanyModal = () => {
  const dispatch = useDispatch();
  const { loading, companyBeingEdited } = useSelector(
    (state: RootState) => state.company.companyList
  );
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  const { companyFA, pageFCom, totalCompany, totalNumOfPageFCom } =
    useAppSelector((state) => state.admin);
  const [currCompany, setCurrCompany] = useState<any>();
  useEffect(() => {
    const editCompany = companyFA.find(
      (company) => company._id === companyBeingEdited
    );
    setCurrCompany(editCompany);
    // console.log(companies,"Id company edit")
  }, [companyBeingEdited]);
  const [form, setForm] = useState({
    logo: "",
    name: currCompany?.name||"",
    email: currCompany?.email||"",
    // foundedDate: "",
    founderName: currCompany?.founderName||"",
    about: "",
    category: "",
  });
  const [foundedDate, setFoundedDate] = useState("");
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const { currEmployer } = useAppSelector((s) => s.employer);
  const { currAdmin } = useAppSelector((s) => s.admin);

  const [benefits, setBenefits] = useState<string[]>([]);
  const [funding, setFunding] = useState<IFunding[]>([]);
  const [fundingInput, setFundingInput] = useState({
    amount: "",
    fundedBy: "",
  });

  const [yearOfFunding, setYearOfFunding] = useState("");
  const [round, setRound] = useState("");
  const handleRemoveFunding = (index: number) => {
    setFunding((prev) => prev.filter((_, i) => i !== index));
  };

  const [validFunding, setValidFunding] = useState({
    amount: true,
    fundedBy: true,
    round: true,
    yearOfFunding: true,
  });

  const handleAddFunding = () => {
    if (
      !fundingInput.amount ||
      !fundingInput.fundedBy ||
      !round ||
      !yearOfFunding ||
      round === "select" ||
      yearOfFunding === "select"
    ) {
      setValidFunding({
        ...validFunding,
        amount: fundingInput.amount.length !== 0,
        fundedBy: fundingInput.fundedBy.length !== 0,
        round: round.length !== 0 && round !== "select",
        yearOfFunding: yearOfFunding.length !== 0 && yearOfFunding !== "select",
      });
      notifyInfo("Please complete all fields to add funding");
      return;
    }
    const fund = {
      ...fundingInput,
      round: round,
      yearOfFunding: yearOfFunding,
      foundedDate,
    };
    setFunding((prev) => [...prev, fund]);
    setFundingInput({
      amount: "",
      fundedBy: "",
    });
    setYearOfFunding("");
    setRound("");
  };

  const handleFundingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFundingInput({
      ...fundingInput,
      [name]: value,
    });
  };

  const [location, setLocation] = useState({
    locality: "",
  });
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation({
      ...location,
      [name]: value,
    });
  };
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [teamSize, setTeamSize] = useState("");
  // const [category, setCategory] = useState("");

  const [value, setValue] = useState("");
  const { file } = useAppSelector((s) => s.global);
  // useEffect(() => {
  //   console.log(file,"This is file from global state");
  // },[file])
  const handleCompanyLogo = () => {};
  const handleRemove = (skill: string) => {
    setBenefits((prev) => prev.filter((val) => val !== skill));
  };
  const [socialSites, setSocialSites] = useState({
    linkedIn: currCompany?.socialSites?.linkedIn || "",
    twitter: currCompany?.socialSites?.twitter || "",
    facebook: currCompany?.socialSites?.facebook || "",
    website: currCompany?.socialSites?.website || "",
  });

  const handleSocialSiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialSites({
      ...socialSites,
      [name]: value,
    });
  };
  const [validForm, setValidForm] = useState({
    // name: false,
    email: true,
    // foundedDate: "",
    founderName: true,
    about: true,
    category: true,
    phoneNumber: true,
    linkedIn: true,
    twitter: true,
    facebook: true,
    website: true,
    fundingAmount: true,
  });
  useEffect(() => {
    if (isPureString(form.founderName)) {
      setValidForm({ ...validForm, founderName: true });
    } else {
      setValidForm({ ...validForm, founderName: false });
    }
  }, [form.founderName]);
  useEffect(() => {
    if (isValidEmail(form.email)) {
      setValidForm({ ...validForm, email: true });
    } else {
      setValidForm({ ...validForm, email: false });
    }
  }, [form.email]);
  useEffect(() => {
    if (isPureString(form.category)) {
      setValidForm({ ...validForm, category: true });
    } else {
      setValidForm({ ...validForm, category: false });
    }
  }, [form.category]);
  useEffect(() => {
    if (value && isValidPhoneNumber(value.toString())) {
      setValidForm({ ...validForm, phoneNumber: true });
    } else {
      setValidForm({ ...validForm, phoneNumber: false });
    }
  }, [value]);

  useEffect(() => {
    if (checkValidDescription(form.about, 100)) {
      setValidForm({ ...validForm, about: true });
    } else {
      setValidForm({ ...validForm, about: false });
    }
  }, [form.about]);

  useEffect(() => {
    setValidForm({ ...validForm, linkedIn: isValidUrl(socialSites?.linkedIn) });
  }, [socialSites.linkedIn]);
  useEffect(() => {
    setValidForm({ ...validForm, website: isValidUrl(socialSites?.website) });
  }, [socialSites.website]);
  useEffect(() => {
    setValidForm({ ...validForm, twitter: isValidUrl(socialSites?.twitter) });
  }, [socialSites.twitter]);
  useEffect(() => {
    setValidForm({ ...validForm, facebook: isValidUrl(socialSites?.facebook) });
  }, [socialSites.facebook]);

  useEffect(() => {
    if (fundingInput.amount.length !== 0) {
      setValidFunding({ ...validFunding, amount: true });
    }
    setValidForm({
      ...validForm,
      fundingAmount: isFundingAmount(fundingInput.amount),
    });
  }, [fundingInput.amount]);
  useEffect(() => {
    if (fundingInput.fundedBy.length !== 0)
      setValidFunding({ ...validFunding, fundedBy: true });
  }, [fundingInput.fundedBy]);
  useEffect(() => {
    if (round.length !== 0) setValidFunding({ ...validFunding, round: true });
  }, [round]);
  useEffect(() => {
    if (yearOfFunding.length !== 0)
      setValidFunding({ ...validFunding, yearOfFunding: true });
  }, [yearOfFunding]);

  useEffect(() => {
    setForm({
      logo: currCompany?.logo || "",
      name: currCompany?.name || "",
      email: currCompany?.email || "",
      founderName: currCompany?.founderName || "",
      about: currCompany?.about || "",
      category: currCompany?.category || "",
    });

    setFoundedDate(currCompany?.foundedDate?.toString()?.substring(0,4) || "");
    console.log(currCompany?.foundedDate?.toString()?.substring(0,4),"Year")

    setBenefits(currCompany?.benefits || []);
    setFunding(currCompany?.funding || []);
    // console.log(currCompany?.funding,"Funding previous")

    setLocation({
      locality: currCompany?.location[0]?.locality || "",
    });

    setCity(currCompany?.location[0]?.city || "");
    setCountry(currCompany?.location[0]?.country || "");
    setTeamSize(currCompany?.teamSize || "");
    setValue(currCompany?.contactNumber || "");

    setSocialSites({
      linkedIn: currCompany?.socialSites?.linkedIn || "",
      twitter: currCompany?.socialSites?.twitter || "",
      facebook: currCompany?.socialSites?.facebook || "",
      website: currCompany?.socialSites?.website || "",
    });
  }, [currCompany]);

  const handleSubmit = async () => {
    // if(form.about && form.name && form.category && form.email && form.foundedDate && form.founderName && value && teamSize && socialSites.website && location.locality && city && country){
    //   notifyInfo("Please complete * marked fields.")
    //   return;
    // }
    if (!currAdmin && !currEmployer) {
      notifyInfo("please login to create a company");
      return;
    }

    if (!form.name) {
      notifyInfo("Please complete the 'Company Name' field.");
      return;
    }

    if (!form.email) {
      notifyInfo("Please complete the 'Email' field.");
      return;
    }

    if (!foundedDate) {
      notifyInfo("Please provide the 'Founded Year'.");
      return;
    }

    if (!form.founderName) {
      notifyInfo("Please complete the 'Founder Name' field.");
      return;
    }

    if (!teamSize) {
      notifyInfo("Please provide the 'Team Size'.");
      return;
    }
    if (!value) {
      notifyInfo("Please provide the 'Value'.");
      return;
    }

    if (!form.category) {
      notifyInfo("Please complete the 'Category' field.");
      return;
    }

    if (!form.about) {
      notifyInfo("Please complete the 'About' field.");
      return;
    }
    if (!socialSites.website) {
      notifyInfo("Please provide the 'Website' in the 'Social Sites' section.");
      return;
    }
    if (!benefits) {
      notifyInfo(
        "Please provide the 'Benefits' in the 'Benefits & Offerings' sections"
      );
      return;
    }

    if (!location.locality) {
      notifyInfo(
        "Please provide the 'Local Address' in the 'Location' section."
      );
      return;
    }

    if (!city) {
      notifyInfo("Please provide the 'City' in the 'Location' section.");
      return;
    }

    if (!country) {
      notifyInfo("Please provide the 'Country' in the 'Location' section.");
      return;
    }
    const ILocation = {
      ...location,
      city: city,
      country: country,
    };
    const createdBy = currAdmin ? currAdmin?._id : currEmployer?._id;
    const bodyObj = {
      ...form,
      contactNumber: value,
      location: [ILocation],
      teamSize,
      socialSites,
      // createdBy: currEmployer._id,
      createdBy,
      benefits,
      funding,
    };
    console.log(bodyObj);
    // return;

    await updateCompany(dispatch, currCompany?._id,bodyObj,file!);
    notifySuccess("Company updated successfully");
    // setForm({
    //   logo: "",
    //   name: "",
    //   email: "",
    //   founderName: "",
    //   // foundedDate: "",
    //   about: "",
    //   category: "",
    // });
    // setCity("");
    // setCountry("");
    // setTeamSize("");
    // setLocation({
    //   locality: "",
    // });
    // setFoundedDate("");
    // setSocialSites({ linkedIn: "", twitter: "", facebook: "", website: "" });
    // setBenefits([]);
    // setFunding([]);
    // setValue("");
    dispatch(resetFile());
    await getAllCompany(dispatch, { page: pageFCom, limit: 8 }, currUser!);
  };
  const handleFile = (file: File | null) => {
    dispatch(setFile(file));
  };
  return (
    <div
      className="modal popUpModal fade"
      id="editCompanyByEmployer"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container">
          <div className="filter-area-tab modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div>
              <div className="bg-white card-box border-20">
                <div className="user-avatar-setting d-flex align-items-center mb-30">
                  {/* company logo url */}
                  <Image
                    width={50}
                    height={50}
                    src={file ? URL.createObjectURL(file) : currCompany?.logo}
                    // src={
                    //   user?.avatar !== "none" || false
                    //     ? (user?.avatar as string)
                    //     : avatar
                    // }
                    alt="avatar"
                    className="lazy-img user-img"
                  />
                  {!file && (
                    <div className=" upload-btn position-relative tran3s ms-4 px-2  mx-3">
                      <DropZone setFile={handleFile} text={"Upload logo"} />
                    </div>
                  )}
                  {file && (
                    <div className=" d-flex flex-column ms-4 ">
                      <div className="d-flex justify-content-center   ">
                        {/* <button
                    onClick={handleCompanyLogo}
                    className="upload-btn position-relative tran3s ms-4 me-3"
                  >
                    {"Save"}
                  </button> */}
                        <div className=" mt-1 ">
                          <small>
                            Upload square image in .png, .jpeg, max 1mb sized
                          </small>
                        </div>
                      </div>
                      <p className="dash-title-three">{file?.name}</p>
                    </div>
                  )}
                </div>
                <div className="dash-input-wrapper mb-30">
                  <label htmlFor="name">Company Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="email">Email*</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="companyinc@gmail.com"
                      />
                      {!validForm.email && (
                        <p style={{ color: "red" }}>Enter valid email</p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="foundedDate">Founded Year*</label>
                      {/* <input
                name="foundedDate"
                value={foundedDate}
                onChange={handleInputChange}
                type="date"
                placeholder="DD-MM-yyyy"
              /> */}
                      <SelectYear
                        firstInput="Select Year"
                        setYear={setFoundedDate}
                        placeholder="Select Year"
                        default={{
                          value: `${foundedDate}`,
                          label: `${foundedDate}`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="founderName">Founder Name*</label>
                      <input
                        type="text"
                        name="founderName"
                        value={form.founderName}
                        onChange={handleInputChange}
                        placeholder="Shiva shah"
                      />
                      {!validForm.founderName && (
                        <p style={{ color: "red" }}>
                          Do not use symbols or numbers
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="">Company Size*</label>
                      {/* <TeamSizeSelect teamSize={teamSize} setTeamSize={setTeamSize} /> */}
                      <TeamSizeSelect
                        setSelected={setTeamSize}
                        defaultOption={{
                          value: `${teamSize}`,
                          label: `${teamSize}`,
                        }}
                        placeholder="Select Team Size"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="">Phone Number*</label>
                      <PhoneInput
                        placeholder="Enter contact number"
                        value={value}
                        onChange={(value: any) => setValue(value)}
                      />
                      {!validForm.phoneNumber && (
                        <p style={{ color: "red" }}>Enter Valid Phone Number</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="category">Category*</label>
                      <input
                        name="category"
                        value={form.category}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Account, Finance, Marketing"
                      />
                      {!validForm.category && (
                        <p style={{ color: "red" }}>Enter Valid Category</p>
                      )}
                      {/* <AutocompletePosition
                  selected={category}
                  setSelected={setCategory}
                  endPoint="companyCategory"
                /> */}
                    </div>
                  </div>
                </div>
                <div className="dash-input-wrapper">
                  <label htmlFor="about">About Company*</label>
                  <textarea
                    name="about"
                    value={form.about}
                    onChange={handleInputChange}
                    className="size-lg"
                    placeholder="Write something interesting about you...."
                  ></textarea>
                  <div className="alert-text">
                    Brief description for your company.
                  </div>
                  {!validForm.about && (
                    <p style={{ color: "red" }}>
                      About must include {form.about.replace(/\s/g, "").length}
                      /100 characters
                    </p>
                  )}
                </div>
                {/* <button
            type="submit"
            onClick={handleSubmit}
            className="dash-btn-two tran3s me-3"
          >
            Save
          </button> */}
              </div>
              {/* from for social links */}
              <div className="bg-white card-box border-20 mt-40">
                <h4 className="dash-title-three">Social Media</h4>
                <div className="d-flex flex-wrap gap-3 justify-content-between     ">
                  <div className="dash-input-wrapper mb-30 col-5">
                    <label htmlFor="lastName">Website*</label>
                    <div className="d-flex  align-items-center position-relative">
                      <input
                        name="website"
                        type="text"
                        placeholder="https://www.website.com"
                        value={socialSites?.website}
                        onChange={handleSocialSiteChange}
                      />
                    </div>
                    {!validForm.website && (
                      <p style={{ color: "red" }}>Enter Valid URL</p>
                    )}
                  </div>
                  <div className="dash-input-wrapper mb-30 col-5">
                    <label htmlFor="firstName">Linked In</label>
                    <div className="d-flex align-items-center position-relative">
                      <input
                        type="text"
                        name="linkedIn"
                        placeholder="https://www.LinkedIn.com"
                        value={socialSites?.linkedIn}
                        onChange={handleSocialSiteChange}
                      />
                    </div>
                    {!validForm.linkedIn && (
                      <p style={{ color: "red" }}>Enter Valid URL</p>
                    )}
                  </div>
                  <div className="dash-input-wrapper mb-30 col-5">
                    <label htmlFor="lastName">Twitter</label>
                    <div className="d-flex  align-items-center position-relative">
                      <input
                        name="twitter"
                        type="text"
                        placeholder="https://www.twitter.com"
                        value={socialSites?.twitter}
                        onChange={handleSocialSiteChange}
                      />
                    </div>
                    {!validForm.twitter && (
                      <p style={{ color: "red" }}>Enter Valid URL</p>
                    )}
                  </div>

                  <div className="dash-input-wrapper mb-30 col-5">
                    <label htmlFor="lastName">Facebook</label>
                    <div className="d-flex  align-items-center position-relative">
                      <input
                        name="facebook"
                        type="text"
                        placeholder="https://www.facebook.com"
                        value={socialSites?.facebook}
                        onChange={handleSocialSiteChange}
                      />
                    </div>
                    {!validForm.facebook && (
                      <p style={{ color: "red" }}>Enter Valid URL</p>
                    )}
                  </div>
                </div>
              </div>
              {/* form for finance */}
              <div className="bg-white card-box border-20 mt-40">
                <h4 className="dash-title-three">Funding && Finance</h4>

                {funding.length !== 0 && (
                  <div className="inner-card border-style mb-25 lg-mb-20">
                    <h3 className="title">Funding</h3>
                    <Finance
                      funding={funding}
                      handleRemoveFunding={handleRemoveFunding}
                    />
                  </div>
                )}

                <div className="accordion dash-accordion-one" id="accordionOne">
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne"
                      >
                        Add Funding
                      </button>
                    </div>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionOne"
                    >
                      <div className="accordion-body">
                        <div className="row">
                          <div className="col-lg-2">
                            <div className="dash-input-wrapper mb-30 md-mb-10">
                              <label htmlFor="amount">Amount*</label>
                            </div>
                          </div>
                          <div className="col-lg-10">
                            <div className="dash-input-wrapper mb-30">
                              <input
                                name="amount"
                                value={fundingInput.amount}
                                onChange={handleFundingChange}
                                type="text"
                                placeholder="345M"
                                style={{
                                  borderColor: !validFunding.amount
                                    ? "red"
                                    : "",
                                  borderRadius: !validFunding.amount
                                    ? "5px"
                                    : "",
                                }}
                              />
                              {!validForm.fundingAmount && (
                                <p style={{ color: "red" }}>
                                  Please Input number followed by M,B or T.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-2">
                            <div className="dash-input-wrapper mb-30 md-mb-10">
                              <label htmlFor="fundedBy">Funded By*</label>
                            </div>
                          </div>
                          <div className="col-lg-10">
                            <div className="dash-input-wrapper mb-30">
                              <input
                                name="fundedBy"
                                value={fundingInput.fundedBy}
                                onChange={handleFundingChange}
                                type="text"
                                placeholder="GGV capitals"
                                style={{
                                  borderColor: !validFunding.fundedBy
                                    ? "red"
                                    : "",
                                  borderRadius: !validFunding.fundedBy
                                    ? "5px"
                                    : "",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-2">
                            <div className="dash-input-wrapper mb-30 md-mb-10">
                              <label htmlFor="">Year of funding*</label>
                            </div>
                          </div>
                          <div className="col-lg-10">
                            <div className="row">
                              <div className="">
                                <SelectYear
                                  setYear={setYearOfFunding}
                                  firstInput="select"
                                  placeholder="Select Year"
                                />
                                {!validFunding.yearOfFunding && (
                                  <p style={{ color: "red" }}>
                                    please select year
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-2">
                            <div className="dash-input-wrapper mb-30 md-mb-10">
                              <label htmlFor="">Round*</label>
                            </div>
                          </div>
                          <div className="col-lg-10">
                            <div className="row">
                              <div className="">
                                <SelectRound
                                  firstInput="select"
                                  setRound={setRound}
                                />
                                {!validFunding.round && (
                                  <p style={{ color: "red" }}>
                                    please select round
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        {!fundingInput.amount ||
                        !fundingInput.fundedBy ||
                        !round ||
                        !yearOfFunding ||
                        round === "select" ||
                        yearOfFunding === "select" ? (
                          <button
                            type="button"
                            // data-bs-toggle="collapse"
                            // data-bs-target="#collapseOne"
                            // aria-expanded="false"
                            // aria-controls="collapseOne"
                            onClick={handleAddFunding}
                            className="dash-btn-two tran3s me-3 mb-15"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="false"
                            aria-controls="collapseOne"
                            onClick={handleAddFunding}
                            className="dash-btn-two tran3s me-3 mb-15"
                          >
                            Save
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* from for adding benefits of company */}
              <div className="bg-white card-box border-20 mt-40">
                <h4 className="dash-title-three ">Benefits && Offerings*</h4>
                <div className="dash-input-wrapper">
                  {benefits.length > 0 && (
                    <div className="skills-wrapper mb-3 ">
                      <ul className="style-none .skill-input-data d-flex flex-wrap align-items-center">
                        {benefits.map((val, index) => (
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
                      </ul>
                    </div>
                  )}
                  <div className="col-6">
                    <AutocompleteBenefits
                      benefits={benefits}
                      setBenefits={setBenefits}
                    />
                  </div>
                </div>
              </div>

              {/* form for location */}
              <div className="bg-white card-box border-20 mt-40">
                <h4 className="dash-title-three">Address & Location</h4>
                <div className="row">
                  <div className="col-12">
                    <div className="dash-input-wrapper mb-25">
                      <label htmlFor="locality">Local Address*</label>
                      <input
                        name="locality"
                        value={location.locality}
                        type="text"
                        onChange={handleLocationChange}
                        placeholder="Cowrasta, Chandana, Gazipur Sadar"
                      />
                    </div>
                  </div>

                  <div className="col-lg-3">
                    <div className="dash-input-wrapper mb-25">
                      <label htmlFor="city">City*</label>
                      <LocationAutoComplete
                        selected={city}
                        setSelected={setCity}
                        setCountry={setCountry}
                        type="cities"
                        label="city"
                      />
                    </div>
                  </div>

                  {/* <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">State*</label>
                <LocationAutoComplete
                  selected={state}
                  setSelected={setState}
                  type="regions"
                  label="state"
                />
              </div>
            </div> */}
                  {/* <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="zipcode">Zip Code*</label>
                <input
                  name="zipcode"
                  value={location.zipcode}
                  onChange={handleLocationChange}
                  type="text"
                  placeholder="1708"
                />
              </div>
            </div> */}
                  <div className="col-lg-3">
                    <div className="dash-input-wrapper mb-25">
                      <label htmlFor="country">Country*</label>
                      <input
                        name="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        type="text"
                        placeholder="country"
                      />
                    </div>
                  </div>
                  {/* <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="maplocation">Map Location*</label>
                <div className="position-relative">
                  <input
                    name="maplocation"
                    value={location.maplocation}
                    onChange={handleLocationChange}
                    type="text"
                    placeholder="XC23+6XC, Moiran, N105"
                  />
                  <button className="location-pin tran3s">
                    <Image src={icon} alt="icon" className="lazy-img m-auto" />
                  </button>
                </div>
                <div className="map-frame mt-30">
                  <div className="gmap_canvas h-100 w-100">
                    <iframe
                      className="gmap_iframe h-100 w-100"
                      src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=bass hill plaza medical centre&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div> */}
                  {/* <button
              type="submit"
              onClick={handleLocationSubmit}
              className="dash-btn-two tran3s me-3"
            >
              Save
            </button> */}
                </div>
              </div>

              <div className="button-group d-inline-flex align-items-center mt-30 card-box float-end">
                <button
                  disabled={loading}
                  type="submit"
                  onClick={handleSubmit}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  className=" d-flex dash-btn-two tran3s me-3 justify-content-center align-items-center"
                >
                  {loading ? <Loader /> : <span>Save</span>}
                </button>
                <button
                data-bs-dismiss="modal"
                aria-label="Close"
                className="dash-cancel-btn trans3s"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyModal;
