"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import ShowEducation from "../../../candidate-details/DashEducation";
import SelectYear from "../select-year";
import { addEducation } from "@/redux/features/candidate/api";
import { notifyError, notifyInfo } from "@/utils/toast";
import SelectMonth from "../select-month";
import EditEducation from "@/app/components/candidate-details/popup/EditEducation";
import { checkValidDateTimeLine, checkValidDescription } from "@/utils/helper";

const Education = () => {
  const { currCandidate, loading, currDashEducation } = useAppSelector(
    (store) => store.candidate.candidateDashboard
  );
  const dispatch = useAppDispatch();
  const user = currCandidate;
  const [education, setEducation] = useState({
    degree: "",
    institute: "",
    description: "",
  });
  // useEffect(() => {

  // },[currCandidate])

  const [startYear, setStartYear] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [checkValidDate, setCheckValidDate] = useState(true);
  const [allFieldsCheck, setAllFieldsCheck] = useState(false);
  const [validDescription, setValidDescription] = useState(true);
  const [presentWork, setPresentWork] = useState(false);
  const [validCheckForm, setValidCheckForm] = useState({
    degree: true,
    institute: true,
    description: true,
    validDate: true,
  });
  useEffect(() => {
    if (education.degree.length !== 0) {
      setValidCheckForm({ ...validCheckForm, degree: true });
    }
  }, [education.degree]);
  useEffect(() => {
    if (education.institute.length !== 0) {
      setValidCheckForm({ ...validCheckForm, institute: true });
    }
  }, [education.institute]);
  useEffect(() => {
    if (
      startYear &&
      endYear &&
      startMonth &&
      endMonth &&
      startYear !== "Start Year" &&
      startMonth !== "Start Month" &&
      endYear !== "End Year" &&
      endMonth !== "End Month" &&
      education.degree &&
      education.institute &&
      education.description
    ) {
      setAllFieldsCheck(true);
    } else {
      setAllFieldsCheck(false);
    }
  }, [
    startYear,
    endYear,
    startMonth,
    endMonth,
    education.degree,
    education.institute,
    education.description,
  ]);
  useEffect(() => {
    if (
      startMonth &&
      endMonth &&
      endYear &&
      startYear &&
      startYear !== "Start Year" &&
      startMonth !== "Start Month" &&
      endYear !== "End Year" &&
      endMonth !== "End Month"
    ) {
      setValidCheckForm({ ...validCheckForm, validDate: true });
      if (
        checkValidDateTimeLine(
          startMonth + " " + startYear,
          endMonth + " " + endYear
        )
      ) {
        setCheckValidDate(true);
      } else {
        setCheckValidDate(false);
      }
    }
  }, [startYear, startMonth, endMonth, endYear]);
  useEffect(() => {
    if (education.description.length !== 0) {
      setValidCheckForm({ ...validCheckForm, description: true });
      if (checkValidDescription(education.description, 50)) {
        setValidDescription(true);
      } else {
        setValidDescription(false);
      }
    }
  }, [education.description]);
  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEducation({
      ...education,
      [name]: value,
    });
    if (
      !education.degree ||
      !education.description ||
      !education.institute ||
      !startYear ||
      startYear === "Start Year" ||
      !startMonth ||
      startMonth === "Start Month" ||
      !endYear ||
      endYear === "End Year" ||
      !endMonth ||
      endMonth === "End Month"
    ) {
      return;
    }
    // setAllFieldsCheck(true);
    // console.log(allFieldsCheck, "Validator");
  };
  const handlePresentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPresentWork((prev) => !prev);
  };
  useEffect(() => {
    setEndMonth(presentWork ? "Present" : "");
    setEndYear(presentWork ? "Present" : "");
  }, [presentWork]);
  useEffect(() => {
    if (endMonth === "Present" || endYear === "Present") {
      setPresentWork(true);
    } else {
      setPresentWork(false);
    }
  }, [endMonth, endYear]);

  const handleAddEducation = async () => {
    if (
      !education.degree ||
      !education.description ||
      !education.institute ||
      !startYear ||
      startYear === "Start Year" ||
      !startMonth ||
      startMonth === "Start Month" ||
      !endYear ||
      endYear === "End Year" ||
      !endMonth ||
      endMonth === "End Month"
    ) {
      setValidCheckForm({
        ...validCheckForm,
        degree: education.degree.length !== 0,
        institute: education.institute.length !== 0,
        description: education.description.replace(/\s/g, "").length!==0,
        validDate:
        !(!startYear ||
        startYear === "Start Year" ||
        !startMonth ||
        startMonth === "Start Month" ||
        !endYear ||
        endYear === "End Year" ||
        !endMonth ||
        endMonth === "End Month"),
          
      });
      notifyInfo("Please complete fields marked with *");
      return;
    }
    if (!validDescription) {
      notifyInfo("please complete description");
      return;
    }

    if (!user) {
      notifyError("! unauthenticated user");
      return;
    }
    const bodyObj = {
      ...education,
      startYear: startMonth + " " + startYear,
      endYear: endMonth + " " + endYear,
      present: presentWork,
    };
    if (new Date(bodyObj.startYear) > new Date(bodyObj.endYear)) {
      notifyInfo("Start date cannot be greater than end date");
      return;
    }
    console.log(bodyObj);
    await addEducation(dispatch, user._id, bodyObj);
    setEducation({
      degree: "",
      institute: "",
      description: "",
    });
    setStartYear("");
    setEndYear("");
    setStartMonth("");
    setEndMonth("");
    // setAllFieldsCheck(false);
  };

  return (
    <>
      <div className="bg-white card-box border-20 mt-40">
        <div>
          {user?.education.length !== 0 && (
            <div className="inner-card border-style mb-25 lg-mb-20">
              <h3 className="title">Education</h3>
              <ShowEducation />
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
                  Add Education
                  <span className="fw-bold fs-5 mt-1  ">
                    <i className="bi bi-plus"></i>
                  </span>
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
                        <label htmlFor="degree">Degree*</label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="dash-input-wrapper mb-30">
                        <input
                          name="degree"
                          value={education.degree}
                          onChange={handleEducationChange}
                          type="text"
                          placeholder="Bachelor's"
                          style={{
                            borderColor: !validCheckForm.degree ? "red" : "",
                            borderRadius: !validCheckForm.degree ? "5px" : "",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="institute">Institute*</label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="dash-input-wrapper mb-30">
                        <input
                          name="institute"
                          value={education.institute}
                          onChange={handleEducationChange}
                          type="text"
                          placeholder="Oxford"
                          style={{
                            borderColor: !validCheckForm.institute ? "red" : "",
                            borderRadius: !validCheckForm.institute ? "5px" : "",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="">Duration*</label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="row">
                        <div className="col-sm-3">
                          <SelectMonth
                            default={{ value: startMonth, label: startMonth }}
                            setMonth={setStartMonth}
                            firstInput="Start Month"
                            placeholder="Start Month"
                            // default={{value:startMonth,label:startMonth}}
                          />
                        </div>
                        <div className="col-sm-3">
                          <SelectYear
                            default={{ value: startYear, label: startYear }}
                            setYear={setStartYear}
                            firstInput="Start Year"
                            placeholder="Start Year"
                            // default={{value:startYear,label:startYear}}
                          />
                        </div>

                        {!presentWork && (
                          <div className="col-sm-3">
                            <SelectMonth
                              default={{ value: endMonth, label: endMonth }}
                              setMonth={setEndMonth}
                              firstInput="End Month"
                              placeholder="End Month"
                            />
                          </div>
                        )}
                        {!presentWork && (
                          <div className="col-sm-3">
                            <SelectYear
                              default={{ value: endYear, label: endYear }}
                              setYear={setEndYear}
                              firstInput="End Year"
                              placeholder="End Year"
                            />
                          </div>
                        )}
                        <div
                          style={{
                            alignItems: "center",
                            display: "flex",
                            paddingBottom: "5px",
                          }}
                        >
                          <label htmlFor="ckeckBox">Present:</label>
                          <input
                            style={{ marginLeft: "2px", marginTop: "3px" }}
                            type="checkbox"
                            checked={presentWork}
                            onChange={handlePresentChange}
                          />
                        </div>
                        {!validCheckForm.validDate && (
                          <p style={{ color: "red" }}>Enter Valid Date</p>
                        )}
                        {!checkValidDate && (
                          <p style={{ color: "red" }}>
                            Start date cannot be greater that end date
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-15 md-mb-7">
                        <label htmlFor="description">Description*</label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="dash-input-wrapper mb-30">
                        <textarea
                          value={education.description}
                          name="description"
                          onChange={handleEducationChange}
                          className="size-lg"
                          placeholder="Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam et pulvinar tortor luctus."
                          style={{
                            borderColor: !validCheckForm.description ? "red" : "",
                            borderRadius: !validCheckForm.description ? "5px" : "",
                          }}
                        ></textarea>
                      </div>
                    </div>
                    {!validDescription && (
                      <p style={{ color: "red" }}>
                        description must include{" "}
                        {education.description.replace(/\s/g, "").length}/50
                      </p>
                    )}
                  </div>
                  {allFieldsCheck && checkValidDate && validDescription ? (
                    <button
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                      onClick={handleAddEducation}
                      className="dash-btn-two tran3s me-3 mb-15"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      type="button"
                      // data-bs-toggle="collapse"
                      // data-bs-target="#collapseOne"
                      // aria-expanded="false"
                      // aria-controls="collapseOne"
                      onClick={handleAddEducation}
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
      </div>
      {<EditEducation />}
    </>
  );
};

export default Education;
