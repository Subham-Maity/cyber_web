"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IEducation } from "@/types/user-type";
import { notifyError, notifyInfo } from "@/utils/toast";
import { useEffect, useState } from "react";
import SelectMonth from "../../dashboard/candidate/select-month";
import SelectYear from "../../dashboard/candidate/select-year";
import {
  getCurrCandidate,
  updateEducation,
} from "@/redux/features/candidate/api";
import { setCurrDashEducation } from "@/redux/features/candidate/dashboardSlice";
import { checkValidDateTimeLine, checkValidDescription } from "@/utils/helper";
// import { updateExistingEduSuccess } from "@/redux/features/candidate/dashboardSlice";

const EditEducationBody = ({
  educationProp,
}: {
  educationProp: IEducation;
}) => {
  const dispatch = useAppDispatch();
  const { currCandidate, currDashEducation } = useAppSelector(
    (store) => store.candidate.candidateDashboard
  );
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  // const user = currCandidate;
  // useEffect(() => {
  //   // console.log(updatedEducationProp);
  // }, [educationProp]);

  // console.log(educationProp._id);

  const [education, setEducation] = useState({
    degree: educationProp.degree || "",
    institute: educationProp.institute || "",
    description: educationProp.description || "",
  });
  // let start: string[] = [];
  // let end: string[] = [];
  const start = educationProp?.startYear.split(" ");
  const end = educationProp?.endYear.split(" ");
  const [startYear, setStartYear] = useState(
    educationProp?.startYear.split(" ")[1]
  );
  const [startMonth, setStartMonth] = useState(
    educationProp?.startYear.split(" ")[0]
  );
  const [endYear, setEndYear] = useState(educationProp?.endYear.split(" ")[1]);
  const [endMonth, setEndMonth] = useState(
    educationProp?.endYear.split(" ")[0]
  );
  const [checkValidDate, setCheckValidDate] = useState(true);
  const [allFieldsCheck, setAllFieldsCheck] = useState(false);
  const [validDescription, setValidDescription] = useState(true);
  const [presentWork, setPresentWork] = useState(educationProp?.present);
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
    if (
      checkValidDescription(education.description, 50) ||
      education.description.trim().length === 0
    ) {
      setValidDescription(true);
    } else {
      setValidDescription(false);
    }
  }, [education.description]);

  useEffect(() => {
    setEducation({
      degree: educationProp.degree || "",
      institute: educationProp.institute || "",
      description: educationProp.description || "",
    });

    const start = educationProp.startYear?.split(" ");
    const end = educationProp.endYear?.split(" ");
    setPresentWork(educationProp?.present);
    setStartYear(start[1] || "");
    setStartMonth(start[0] || "");
    setEndYear(end[1] || "");
    setEndMonth(end[0] || "");
    console.log(startMonth, startYear, endYear, endMonth);
    // console.log(startMonth, startYear, endYear, endMonth);
  }, [educationProp]);
  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEducation({
      ...education,
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
      notifyInfo("Please complete fields marked with *");
      return;
    }
    if (!validDescription) {
      notifyInfo("please complete description");
      return;
    }
    if (!currCandidate) {
      notifyError("! unauthenticated user");
      return;
    }
    const bodyObj = {
      ...education,
      startYear: startMonth + " " + startYear,
      endYear: endMonth + " " + endYear,
      present:presentWork
    };
    console.log("bodyObj", bodyObj);
    if (new Date(bodyObj.startYear) > new Date(bodyObj.endYear)) {
      notifyInfo("Start date cannot be greater than end date");
      return;
    }
    //  await addEducation(dispatch, user._id, bodyObj);
    if (currCandidate) {
      console.log(educationProp, "Education Prop");
      await updateEducation(
        dispatch,
        currCandidate?._id,
        currDashEducation,
        bodyObj
      );
    } else {
      console.log("error");
    }
    setEducation({
      degree: "",
      institute: "",
      description: "",
    });
    // setStartYear("");
    // setEndYear("");
    await getCurrCandidate(dispatch, currUser as string);
  };

  return (
    <div className="accordion-body">
      {/* <p>{educationProp._id}</p> */}
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
                borderColor: !education.degree ? "red" : "",
                borderRadius: !education.degree ? "5px" : "",
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
                borderColor: !education.institute ? "red" : "",
                borderRadius: !education.institute ? "5px" : "",
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
                  value: startMonth,
                  label: startMonth,
                }}
                setMonth={setStartMonth}
                firstInput="Start Month"
                placeholder="Start Month"
              />
            </div>
            <div className="col-sm-6">
              <SelectYear
                default={{ value: startYear, label: startYear }}
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
                    default={{ value: endMonth, label: endMonth }}
                    setMonth={setEndMonth}
                    firstInput="End Month"
                    placeholder="End Month"
                  />
                </div>
                <div className="col-sm-6">
                  <SelectYear
                    default={{ value: endYear, label: endYear }}
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
              value={education.description}
              name="description"
              onChange={handleEducationChange}
              className="size-lg"
              placeholder="Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam et pulvinar tortor luctus."
              style={{
                borderColor: !education.description ? "red" : "",
                borderRadius: !education.description ? "5px" : "",
              }}
            ></textarea>
          </div>
        </div>
        {!validDescription && (
          <p style={{ color: "red" }}>
            description must include {education.description.replace(/\s/g, '').length}/50
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

export default EditEducationBody;
