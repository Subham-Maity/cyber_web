"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IEducation, IExperience } from "@/types/user-type";
import { notifyError, notifyInfo } from "@/utils/toast";
import { useEffect, useState } from "react";
import SelectMonth from "../../dashboard/candidate/select-month";
import SelectYear from "../../dashboard/candidate/select-year";
import {
  getCurrCandidate,
  updateEducation,
  updateExperience,
} from "@/redux/features/candidate/api";
import { setCurrDashEducation } from "@/redux/features/candidate/dashboardSlice";
import { checkValidDateTimeLine, checkValidDescription } from "@/utils/helper";
// import { updateExistingEduSuccess } from "@/redux/features/candidate/dashboardSlice";

const EditExperienceBody = ({
  experienceProp,
}: {
  experienceProp: IExperience;
}) => {
  const dispatch = useAppDispatch();
  const { currCandidate, currDashExperience } = useAppSelector(
    (store) => store.candidate.candidateDashboard
  );
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  // const user = currCandidate;
  // useEffect(() => {
  //   // console.log(updatedexperienceProp);
  // }, [experienceProp]);

  // console.log(experienceProp._id);

  const [experience, setExperience] = useState({
    title: "",
    company: "",
    description: "",
  });
  // let start: string[] = [];
  // let end: string[] = [];
  const start = experienceProp?.startYear.split(" ");
  const end = experienceProp?.endYear.split(" ");
  const [startYear, setStartYear] = useState(
    experienceProp?.startYear.split(" ")[1]
  );
  const [startMonth, setStartMonth] = useState(
    experienceProp?.startYear.split(" ")[0]
  );
  const [endYear, setEndYear] = useState(experienceProp?.endYear.split(" ")[1]);
  const [endMonth, setEndMonth] = useState(
    experienceProp?.endYear.split(" ")[0]
  );
  const [checkValidDate, setCheckValidDate] = useState(true);
  const [allFieldsCheck, setAllFieldsCheck] = useState(false);
  const [validDescription, setValidDescription] = useState(true);
  const [presentWork, setPresentWork] = useState(experienceProp?.present);
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
      experience.title &&
      experience.company &&
      experience.description
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
    experience.title,
    experience.company,
    experience.description,
  ]);
  useEffect(() => {
    if (
      checkValidDescription(experience.description, 50) ||
      experience.description.trim().length === 0
    ) {
      setValidDescription(true);
    } else {
      setValidDescription(false);
    }
  }, [experience.description]);
  useEffect(() => {
    if (
      !startMonth ||
      !startYear ||
      !endMonth ||
      !endYear ||
      (startYear === "Start Year" &&
        startMonth === "Start Month" &&
        endYear === "End Year" &&
        endMonth === "End Month") ||
      checkValidDateTimeLine(
        startMonth + " " + startYear,
        endMonth + " " + endYear
      )
    ) {
      setCheckValidDate(true);
    } else {
      setCheckValidDate(false);
    }
  }, [startYear, startMonth, endMonth, endYear]);
  useEffect(() => {
    setExperience({
      title: experienceProp.title || "",
      company: experienceProp.company || "",
      description: experienceProp.description || "",
    });

    const start = experienceProp.startYear?.split(" ");
    const end = experienceProp.endYear?.split(" ");
    setPresentWork(experienceProp?.present)
    setStartYear(start[1] || "");
    setStartMonth(start[0] || "");
    setEndYear(experienceProp.endYear?.split(" ")[1]);
    setEndMonth(experienceProp.endYear?.split(" ")[0]);
    console.log( endYear,end[1],"Yo", endMonth,end[0]);
  }, [experienceProp]);
  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setExperience({
      ...experience,
      [name]: value,
    });
  };
  const handlePresentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPresentWork((prev) => !prev);
  };
  useEffect(() => {
    setEndMonth(presentWork ? "Present" : endMonth);
    setEndYear(presentWork ? "Present" : endYear);
  }, [presentWork]);
  // useEffect(() => {
  //   if (endYear === "Present" || endMonth === "Present") {
  //     setPresentWork(true);
  //   } else {
  //     setPresentWork(false);
  //   }
  // }, [endMonth, endYear]);

  const handleAddEducation = async () => {
    if (
      !experience.title ||
      !experience.description ||
      !experience.company ||
      !startYear ||
      startYear === "Start Year" ||
      !startMonth ||
      startMonth === "Start Month" ||
      !endYear ||
      endYear === "End Year" ||
      !endMonth ||
      endMonth === "End Month"
    ) {
      notifyInfo("Please complete fields marked with *");
      return;
    }
    if (!currCandidate) {
      notifyError("! unauthenticated user");
      return;
    }
    const bodyObj = {
      ...experience,
      startYear: startMonth + " " + startYear,
      endYear: endMonth + " " + endYear,
      present:presentWork
    };
    if (!checkValidDate) {
      notifyInfo("Start date cannot be greater than end date");
      return;
    }
    if (!validDescription) {
      notifyInfo("Please complete description");
      return;
    }
    console.log("bodyObj", bodyObj);
    //  await addEducation(dispatch, user._id, bodyObj);
    if (currCandidate) {
      console.log(experienceProp, "Experience Prop");
      await updateExperience(
        dispatch,
        currCandidate?._id,
        currDashExperience,
        bodyObj
      );
    } else {
      console.log("error");
    }
    setExperience({
      title: "",
      company: "",
      description: "",
    });
    setStartYear("");
    setEndYear("");
    await getCurrCandidate(dispatch, currUser as string);
  };
  console.log(startMonth, startYear, endYear, endMonth);

  return (
    <div className="accordion-body">
      {/* <p>{experienceProp._id}</p> */}
      <div className="row">
        <div className="col-lg-2">
          <div className="dash-input-wrapper mb-30 md-mb-10">
            <label htmlFor="title">Title*</label>
          </div>
        </div>
        <div className="col-lg-10">
          <div className="dash-input-wrapper mb-30">
            <input
              name="title"
              value={experience.title}
              onChange={handleEducationChange}
              type="text"
              placeholder="SDE"
              style={{
                borderColor: !experience.title ? "red" : "",
                borderRadius: !experience.title ? "5px" : "",
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2">
          <div className="dash-input-wrapper mb-30 md-mb-10">
            <label htmlFor="company">Company*</label>
          </div>
        </div>
        <div className="col-lg-10">
          <div className="dash-input-wrapper mb-30">
            <input
              name="company"
              value={experience.company}
              onChange={handleEducationChange}
              type="text"
              placeholder="Amazon"
              style={{
                borderColor: !experience.company ? "red" : "",
                borderRadius: !experience.company ? "5px" : "",
              }}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2">
          <div className="dash-input-wrapper mb-30 md-mb-10">
            <label htmlFor="">Start Date*</label>
          </div>
        </div>
        <div className="col-lg-10">
          <div className="row">
            <div className="col-sm-6">
              <SelectMonth
                default={{
                  value: start[0],
                  label: start[0],
                }}
                setMonth={setStartMonth}
                firstInput="Start Month"
                placeholder="Start Month"
              />
            </div>
            <div className="col-sm-6">
              <SelectYear
                default={{ value: start[1], label: start[1] }}
                setYear={setStartYear}
                firstInput="Start Year"
                placeholder="Start Year"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {!presentWork && (
          <>
            <div className="col-lg-2">
              <div className="dash-input-wrapper mb-30 md-mb-10">
                <label htmlFor="">End Date*</label>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="row">
                <div className="col-sm-6">
                  <SelectMonth
                    default={{ value: end[0], label: end[0] }}
                    setMonth={setEndMonth}
                    firstInput="End Month"
                    placeholder="End Month"
                  />
                </div>
                <div className="col-sm-6">
                  <SelectYear
                    default={{ value: end[1], label: end[1] }}
                    setYear={setEndYear}
                    firstInput="End Year"
                    placeholder="End Year"
                  />
                </div>

                {(!startMonth || !startYear || !endMonth || !endYear) && (
                  <p style={{ color: "red" }}>Enter Valid Date</p>
                )}
                {!checkValidDate && (
                  <p style={{ color: "red" }}>
                    Start date cannot be greater that end date
                  </p>
                )}
              </div>
            </div>
          </>
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
              value={experience.description}
              name="description"
              onChange={handleEducationChange}
              className="size-lg"
              placeholder="Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam et pulvinar tortor luctus."
              style={{
                borderColor: !experience.description ? "red" : "",
                borderRadius: !experience.description ? "5px" : "",
              }}
            ></textarea>
          </div>
        </div>
        {!validDescription && (
          <p style={{ color: "red" }}>
            description must include {experience.description.replace(/\s/g, '').length}/50
          </p>
        )}
      </div>
      {allFieldsCheck && checkValidDate && validDescription ? (
        <button
          onClick={handleAddEducation}
          type="button"
          // className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          className="dash-btn-two tran3s me-3 mb-15"
        >
          Save
        </button>
      ) : (
        <button
          onClick={handleAddEducation}
          type="button"
          // className="btn-close"
          // data-bs-dismiss="modal"
          // aria-label="Close"
          className="dash-btn-two tran3s me-3 mb-15"
        >
          Save
        </button>
      )}
    </div>
  );
};

export default EditExperienceBody;
