import React, { useEffect, useState } from "react";
import AutocompleteCompany from "@/ui/autoCompeteCompanyName";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import AutocompletePosition from "@/ui/autoCompletePosistion";
import AutocompleteCategory from "@/ui/autoCompleteCategory";
import NiceSelect from "@/ui/nice-select";
import { Currency } from "@/redux/features/currencyProvider/slice";
import AutocompleteCurrency from "@/ui/autoCompleteCurrency";
import { getAllLanguages } from "@/redux/features/languageProvider/api";
import { getAllCurrencies } from "@/redux/features/currencyProvider/api";
import AutocompleteSkill from "@/ui/autoCompleteSkill";
import LocationAutoComplete from "@/ui/locationAutoComplete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AutocompleteBenefits from "@/ui/autoCompletebenefits";
import TinyMCEEditor from "@/ui/textEditor";
import { MagicWand } from "@phosphor-icons/react";
import Loader from "@/ui/loader";
import {
  askToGpt,
  getAllJobPosts,
  getJobPostsForEmployer,
  updateJobPost,
} from "@/redux/features/jobPost/api";
import MultipleChoiceQuestion from "@/ui/question";
import { IJobPost } from "@/types/jobPost-type";
import NiceSelectDefaultValue from "../../dashboard/employ/NiceSelectDefaultValue";
import { notifyInfo } from "@/utils/toast";
import {
  isBetween,
  isPureNumber,
  isPureString,
  isValidSalaryNumber,
} from "@/utils/helper";
import { boolean } from "yup";

const EditJobPostModalForAdmin = () => {
  const { currEditJobPost } = useAppSelector((state) => state.employer);
  const filter = useAppSelector((state) => state.emplyerJobPostFilter);
  const {
    allJobPostAdmin,
    pageForAdmin,
    totalJobsForAdmin,
    totalPagesForJobpostAdmin,
    loading,
  } = useAppSelector((state) => state.jobPost);
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  const { currAdmin } = useAppSelector((state) => state.admin);
  const { jobPostsForEmployer } = useAppSelector((state) => state.jobPost);
  const { currentPageForJobPostEmployer } = useAppSelector(
    (state) => state.jobPost
  );
  const filterState = useAppSelector((state) => state.emplyerJobPostFilter);

  // const job = jobPostsForEmployer.find((job) => job._id === id);
  const [currJob, setCurrJob] = useState<IJobPost | undefined>();
  const dispatch = useAppDispatch();
  // const { currEmployer } = useAppSelector((state) => state.employer);
  const { languages } = useAppSelector((state) => state.language);
  const { currencies } = useAppSelector((state) => state.currency);
  const { gptLoading } = useAppSelector((state) => state.jobPost);
  useEffect(() => {
    const job = allJobPostAdmin.find((job) => job._id === currEditJobPost);
    setCurrJob(job);
  }, [currEditJobPost]);
  useEffect(() => {
    getAllLanguages(dispatch);
    getAllCurrencies(dispatch);
  }, []);

  const [title, setTitle] = useState(currJob?.title || "");
  const [jobCategory, setJobCategory] = useState(currJob?.jobCategory || "");
  const [jobType, setJobType] = useState<string[]>(currJob?.jobType || []);
  const [workMode, setWorkMode] = useState<string[]>(currJob?.workMode || []);
  const [experience, setExperience] = useState<string[]>(
    currJob?.preferredExperience || []
  );
  const [language, setLanguage] = useState(currJob?.preferredLanguage || "");
  const [currency, setCurrency] = useState<Currency | undefined>(
    currJob?.salary.currency || undefined
  );
  const [location, setLocation] = useState<string[]>(currJob?.location || []);
  const [salary, setSalary] = useState(
    currJob?.salary || {
      minimum: "",
      maximum: "",
      isDisclosed: true,
      period: "",
      currency: {
        abbreviation: "",
        name: "",
        symbol: "",
      },
    }
  );
  const [company, setCompany] = useState<any>({
    name: currJob?.companyName,
    companyId: currJob?.companyId,
  });
  const [primarySkills, setPrimarySkills] = useState<string[]>(
    currJob?.primarySkills || []
  );
  const [secondarySkills, setSecondarySkills] = useState<string[]>(
    currJob?.secondarySkills || []
  );
  const [benefits, setBenefits] = useState<string[]>(currJob?.benefits || []);
  const [descriptionWithAI, setDescriptionWithAI] = useState<string>(
    currJob?.description || ""
  );
  const [questionWithAI, setQuestionWithAI] = useState<any>(
    currJob?.testQuestions || ""
  );
  const [workHours, setWorkHours] = useState(currJob?.workHours || "");
  const [education, setEducation] = useState(
    currJob?.preferredQualification || ""
  );
  const [joiningTime, setJoiningTime] = useState(currJob?.joiningTime || "");
  const [description, setDescription] = useState(currJob?.description || "");
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(
    currJob?.deadlineDate ? new Date(currJob?.deadlineDate) : null
  );

  useEffect(() => {
    // console.log(job)
    setTitle(currJob?.title || "");
    setJobCategory(currJob?.jobCategory || "");
    setJobType(currJob?.jobType || []);
    setWorkMode(currJob?.workMode || []);
    setExperience(currJob?.preferredExperience || []);
    setLanguage(currJob?.preferredLanguage || "");
    setCurrency(currJob?.salary.currency || undefined);
    setLocation(currJob?.location || []);
    setSalary(
      currJob?.salary || {
        minimum: "",
        maximum: "",
        isDisclosed: true,
        period: "",
        currency: {
          abbreviation: "",
          name: "",
          symbol: "",
        },
      }
    );
    setCompany({ name: currJob?.companyName, companyId: currJob?.companyId });
    // console.log(company)
    setPrimarySkills(currJob?.primarySkills || []);
    setSecondarySkills(currJob?.secondarySkills || []);
    setBenefits(currJob?.benefits || []);
    setDescriptionWithAI(currJob?.description || "");
    setQuestionWithAI(currJob?.testQuestions || "");
    setWorkHours(currJob?.workHours || "");
    setEducation(currJob?.preferredQualification || "");
    setJoiningTime(currJob?.joiningTime || "");
    setDescription(currJob?.description || "");
    setDeadlineDate(
      currJob?.deadlineDate ? new Date(currJob?.deadlineDate) : null
    );
  }, [currJob]);

  const [validForm, setValidForm] = useState({
    workHours: true,
    salaryNumber: true,
    priSkills: true,
    secSkills: true,
    jobCategory: true,
    jobType: true,
    workMode: true,
    experience: true,
    location: true,
    deadlineDate: true,
  });

  useEffect(() => {
    setValidForm({
      ...validForm,
      workHours: isPureNumber(workHours) && isBetween(workHours, 10, 48),
    });
  }, [workHours]);
  useEffect(() => {
    setValidForm({
      ...validForm,
      salaryNumber: isValidSalaryNumber(
        salary.minimum as string,
        salary.maximum as string
      ),
    });
  }, [salary.minimum, salary.maximum]);
  useEffect(() => {
    if (primarySkills.length !== 0)
      setValidForm({ ...validForm, priSkills: true });
  }, [primarySkills]);
  useEffect(() => {
    if (secondarySkills.length !== 0)
      setValidForm({ ...validForm, secSkills: true });
  }, [secondarySkills]);
  useEffect(() => {
    setValidForm({ ...validForm, jobCategory: isPureString(jobCategory) });
  }, [jobCategory]);
  useEffect(() => {
    if (jobType.length !== 0) setValidForm({ ...validForm, jobType: true });
  }, [jobType]);
  useEffect(() => {
    if (workMode.length !== 0) setValidForm({ ...validForm, workMode: true });
  }, [workMode]);
  useEffect(() => {
    if (experience.length !== 0)
      setValidForm({ ...validForm, experience: true });
  }, [experience]);
  useEffect(() => {
    if (location.length !== 0) setValidForm({ ...validForm, location: true });
  }, [location]);

  const updateSalaryProperty = (
    property: string,
    item: { value: Currency | string; label: string }
  ) => {
    setSalary({
      ...salary,
      [property]: item.value,
    });
  };
  const handleJobType = (item: { value: string; label: string }) => {
    if (!jobType.includes(item.value)) {
      setJobType((prev) => [...prev, item.value]);
      console.log(item.value);
    }
    // setJobType("");
  };
  const handleWorkMode = (item: { value: string; label: string }) => {
    // Check if item.value is already present in workMode
    if (!workMode.includes(item.value)) {
      // If not present, add it to the array
      setWorkMode((prev) => [...prev, item.value]);
      console.log(item.value);
      // setJobType("");
    }
  };
  const handleJoining = (item: { value: string; label: string }) => {
    setJoiningTime(item.value);
  };
  const handleSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSalary({
      ...salary,
      [name]: value,
    });
  };
  const handleExperience = (item: { value: string; label: string }) => {
    setExperience((prev) => [...prev, item.value]);
    // console.log(selected, item.value);
  };
  const handleRemove = (skill: string) => {
    setBenefits((prev) => prev.filter((val) => val !== skill));
  };
  const handleRemoveJobType = (value: string) => {
    setJobType((prev) => prev.filter((val) => val !== value));
  };
  const handleRemoveWorkMode = (value: string) => {
    setWorkMode((prev) => prev.filter((val) => val !== value));
  };
  const handleRemovePrimarySkills = (value: string) => {
    setPrimarySkills((prev) => prev.filter((val) => val !== value));
  };
  const handleRemoveSecondarySkills = (value: string) => {
    setSecondarySkills((prev) => prev.filter((val) => val !== value));
  };
  const handleRemoveExperience = (value: string) => {
    setExperience((prev) => prev.filter((val) => val !== value));
  };
  const handleRemoveLocation = (value: string) => {
    setLocation((prev) => prev.filter((val) => val !== value));
  };

  const bodyObj = {
    // title: title,
    _id: currJob?._id,
    location: location,
    jobType: jobType,
    jobCategory: jobCategory,
    primarySkills,
    secondarySkills,
    salary: salary,
    preferredLanguage: language,
    preferredExperience: experience,
    workMode: workMode,
    joiningTime: joiningTime,
    preferredQualification: education,
    workHours: workHours,
    // companyId: company.companyId,
    // employerId: currEmployer?._id,
    testQuestions: questionWithAI ? questionWithAI : "",
    description,
    benefits: benefits,
    deadlineDate,
  };

  const draftDescription = async () => {
    const query = `Help me in writing to the point job description for a job post with given information .
                    job title:${currJob?.title} job type:${
      bodyObj.jobType
    } work mode:${bodyObj.workMode} primary skills:${bodyObj.primarySkills.join(
      " ,"
    )} 
                    secondary skill:${bodyObj.secondarySkills.join(
                      " ,"
                    )} preferred experience:${bodyObj.preferredExperience.join(
      " ,"
    )} 
                    location:${bodyObj.location.join(" ,")} 
                    job benefits: ${bodyObj.benefits.join(" ,")}`;
    console.log(query);
    try {
      const data = await askToGpt(dispatch, query);
      setDescriptionWithAI(data.choices[0].message.content);
    } catch (error) {
      console.log(error);
    }
  };
  const draftQuestion = async () => {
    const query = `generate 4 easy to medium  question with answer in multiple choice of exact four option on the topic ${bodyObj.primarySkills.join(
      ","
    )}. do not give any extra information or text just question and corresponding answer`;

    try {
      const data = await askToGpt(dispatch, query);
      setQuestionWithAI(data.choices[0].message.content);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(id)
  const handleSubmit = async () => {
    if (
      primarySkills.length === 0 ||
      secondarySkills.length === 0 ||
      jobType.length === 0 ||
      workMode.length === 0 ||
      experience.length === 0 ||
      location.length === 0
    ) {
      setValidForm({
        ...validForm,
        priSkills: !(primarySkills.length === 0),
        secSkills: !(secondarySkills.length === 0),
        jobType: !(jobType.length === 0),
        workMode: !(workMode.length === 0),
        experience: experience.length !== 0,
        location: location.length !== 0,
      });
      notifyInfo("check all fields again");
      return;
    }

    // console.log(bodyObj);
    if (
      !validForm.priSkills ||
      !validForm.secSkills ||
      !validForm.salaryNumber ||
      !validForm.workHours
    ) {
      notifyInfo("please correct input value");
      return;
    }
    if (
      !bodyObj.deadlineDate ||
      !bodyObj.description ||
      !bodyObj.jobCategory ||
      !bodyObj.jobType ||
      !bodyObj.joiningTime ||
      !bodyObj.location ||
      !bodyObj.preferredExperience ||
      !bodyObj.preferredLanguage ||
      !bodyObj.primarySkills ||
      !bodyObj.salary ||
      !bodyObj.secondarySkills ||
      !bodyObj.workHours ||
      !bodyObj.workMode
    ) {
      notifyInfo("mandatory fields should be filled");
      return;
    }
    await updateJobPost(dispatch, bodyObj);
    // await addJobPost(dispatch, bodyObj);
    // setTitle("");
    // setJobCategory("");
    // setJobType([]);
    // setLocation([]);
    // setExperience([]);
    // setSalary({
    //   minimum: "",
    //   maximum: "",
    //   isDisclosed: true,
    //   currency: "",
    //   period: "",
    // });
    // setPrimarySkills([]);
    // setSecondarySkills([]);
    // setDescriptionWithAI("");
    // setQuestionWithAI("");
    await getAllJobPosts(dispatch, pageForAdmin, filter,currUser!);
  };

  return (
    <div
      className="modal popUpModal fade"
      id="editJobPostByAdmin"
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
            <div className="position-relative">
              <div className="main-title fw-500 text-dark ps-4 pe-4 pt-15 pb-15 border-bottom">
                Edit Job
              </div>
              <div className="pt-25 pb-30 ps-4 pe-4">
                <div className="row ">
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="lastName">Company*</label>
                      <AutocompleteCompany
                        selected={company}
                        setSelected={setCompany}
                        endPoint="companyName"
                        employerId={currAdmin?._id}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="">Job Title*</label>
                      {/* <input type="text" placeholder="Ex: Product Designer" /> */}
                      <AutocompletePosition
                        selected={title}
                        setSelected={setTitle}
                        endPoint="jobTitle"
                        showAdd={true}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="">Job Category</label>
                      <AutocompleteCategory
                        selected={jobCategory}
                        setSelected={setJobCategory}
                        endPoint="jobCategory"
                      />
                      {!validForm.jobCategory && (
                        <p style={{ color: "red" }}>
                          Please input valid category
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="">Job Type</label>
                      <NiceSelect
                        options={[
                          { value: "Full time", label: "Full time" },
                          { value: "Part time", label: "Part time" },
                          {
                            value: "Hourly-Contract",
                            label: "Hourly-Contract",
                          },
                          { value: "Fixed-Price", label: "Fixed-Price" },
                        ]}
                        defaultCurrent={0}
                        onChange={(item) => handleJobType(item)}
                        name="Job Type"
                        placeholder="Job type"
                      />
                      {!validForm.jobType && (
                        <p style={{ color: "red" }}>Please Mention Job Type</p>
                      )}
                      <div className="skill-input-data d-flex align-items-center flex-wrap">
                        {jobType.map((value) => (
                          <button
                            key={value}
                            onClick={() => handleRemoveJobType(value)}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="">Work Mode</label>
                      <NiceSelect
                        options={[
                          { value: "Hybrid", label: "Hybrid" },
                          { value: "Remote", label: "Remote" },
                          { value: "On-Site", label: "On-Site" },
                          { value: "Flexible", label: "Flexible" },
                        ]}
                        defaultCurrent={0}
                        onChange={(item) => handleWorkMode(item)}
                        name="work mode"
                        placeholder="work mode"
                      />
                      {!validForm.workMode && (
                        <p style={{ color: "red" }}>select valid Work Mode</p>
                      )}
                      <div className="skill-input-data d-flex align-items-center flex-wrap">
                        {workMode.map((value) => (
                          <button
                            key={value}
                            onClick={() => handleRemoveWorkMode(value)}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="">Preferred Language</label>
                      <AutocompletePosition
                        selected={language}
                        setSelected={setLanguage}
                        endPoint=""
                        suggestionsProp={languages}
                        placeholder="Select Language"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="">Joining Time</label>
                      <NiceSelectDefaultValue
                        options={[
                          { value: "select joining", label: "select joining" },
                          {
                            value: "Immediate Joining",
                            label: "Immediate Joining",
                          },
                          { value: "Within 7 Days", label: "Within 7 Days" },
                          { value: "Within 15 Days", label: "Within 15 Days" },
                          { value: "Within 30 Days", label: "Within 30 Days" },
                          { value: "Within 1 Month", label: "Within 1 Month" },
                          {
                            value: "Flexible Joining Date",
                            label: "Flexible Joining Date",
                          },
                          {
                            value: "To Be Discussed",
                            label: "To Be Discussed",
                          },
                        ]}
                        placeholder="select joining"
                        // defaultCurrent={0}
                        defaultCurrent={currJob?.joiningTime}
                        // defaultValue={currJob?.joiningTime }
                        onChange={(item) => handleJoining(item)}
                        name="Job Type"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="">Work Hour per week</label>
                      <input
                        placeholder="Enter working hour"
                        name="workingHour"
                        value={workHours}
                        onChange={(e) => setWorkHours(e.target.value)}
                      />
                      {!validForm.workHours && (
                        <p style={{ color: "red" }}>
                          Please enter number between 10 and 48
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="salary">Salary*</label>
                      <NiceSelectDefaultValue
                        options={[
                          { value: "select period", label: "select period" },
                          { value: "monthly", label: "monthly" },
                          { value: "yearly", label: "yearly" },
                          { value: "weekly", label: "weekly" },
                          { value: "By-weekly", label: "By-weekly" },
                          { value: "hourly", label: "hourly" },
                        ]}
                        defaultCurrent={currJob?.salary?.period}
                        onChange={(item) =>
                          updateSalaryProperty("period", item)
                        }
                        name="period"
                        placeholder="select period"
                      />
                    </div>
                  </div>
                  <div className="col-md-3 companysalary-front">
                    <div className="dash-input-wrapper mb-30">
                      {/* <NiceSelect
                  options={[
                    { value: "select currency", label: "select currency" },
                    { value: "Canadian dollars", label: "Canadian dollars" },
                    { value: "US dollars", label: "US dollars" },
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => updateSalaryProperty("currency", item)}
                  name="currency"
                /> */}
                      <AutocompleteCurrency
                        selected={currency}
                        setSelected={setCurrency}
                        endPoint=""
                        suggestionsProp={currencies}
                        placeholder="Select Currency"
                      />
                    </div>
                  </div>
                  <div className="col-md-3 companysalary-front">
                    <div className="dash-input-wrapper mb-30">
                      <input
                        type="text"
                        name="minimum"
                        value={salary.minimum}
                        onChange={handleSalary}
                        placeholder="Min "
                      />
                    </div>
                  </div>
                  <div className="col-md-3 companysalary-front">
                    <div className="dash-input-wrapper mb-30">
                      <input
                        type="text"
                        name="maximum"
                        value={salary.maximum}
                        onChange={handleSalary}
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
                {!validForm.salaryNumber && (
                  <p style={{ color: "red" }}>Invalid minimum maximum values</p>
                )}
                <h4 className="dash-title-three pt-50 lg-pt-30">
                  Skills & Experience
                </h4>
                {/* primary skills */}
                <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Primary Skills*</label>
                  <AutocompleteSkill
                    skills={primarySkills}
                    setSkills={setPrimarySkills}
                    top={true}
                  />
                  {!validForm.priSkills && (
                    <p style={{ color: "red" }}>
                      Primary skills cannot be empty
                    </p>
                  )}
                  <div className="skill-input-data d-flex align-items-center flex-wrap">
                    {primarySkills.map((value) => (
                      <button
                        key={value}
                        onClick={() => handleRemovePrimarySkills(value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Secondary Skills*</label>
                  <AutocompleteSkill
                    skills={secondarySkills}
                    setSkills={setSecondarySkills}
                    top={true}
                  />
                  {!validForm.secSkills && (
                    <p style={{ color: "red" }}>
                      Secondary skills cannot be empty
                    </p>
                  )}
                  {/* <input type="text" placeholder="Add Skills" /> */}
                  <div className="skill-input-data d-flex align-items-center flex-wrap">
                    {secondarySkills.map((value) => (
                      <button
                        key={value}
                        onClick={() => handleRemoveSecondarySkills(value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="row ">
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="">Experience*</label>
                      <NiceSelect
                        options={[
                          { value: "Intermediate", label: "Intermediate" },
                          { value: "No-Experience", label: "No-Experience" },
                          { value: "Expert", label: "Expert" },
                        ]}
                        defaultCurrent={0}
                        onChange={(item) => handleExperience(item)}
                        name="Experience"
                        placeholder="Experience"
                      />
                      {!validForm.experience && (
                        <p style={{ color: "red" }}>
                          Select valid preferred experience
                        </p>
                      )}
                      <div className="skill-input-data d-flex align-items-center flex-wrap">
                        {experience.map((value) => (
                          <button
                            key={value}
                            onClick={() => handleRemoveExperience(value)}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="">Location*</label>
                      <LocationAutoComplete
                        setSelected={setLocation}
                        type="cities"
                        label="location"
                        isMultiple={true}
                      />
                      {!validForm.location && (
                        <p style={{ color: "red" }}>
                          Please enter preferred Location
                        </p>
                      )}
                      <div
                        style={{ marginTop: "10px" }}
                        className="skill-input-data d-flex align-items-center flex-wrap "
                      >
                        {location.map((value) => (
                          <button
                            key={value}
                            onClick={() => handleRemoveLocation(value)}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="">Required qualification</label>
                      <input
                        placeholder="Enter preferred education"
                        name="education"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                      />
                    </div>
                  </div>
                  {/*Application Deadline */}
                  <div className="col-md-6">
                    <div className="dash-input-wrapper mb-30">
                      <label htmlFor="">Application deadline</label>
                      <DatePicker
                        className="w-full block"
                        placeholderText="DD/MM/YYYY"
                        name="deadlineDate"
                        selected={deadlineDate}
                        onChange={(date: Date | null) => setDeadlineDate(date)}
                        dateFormat="dd/MM/yyyy"
                      />
                      {!validForm.deadlineDate && (
                        <p style={{ color: "red" }}>
                          select a Valid deadline date
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <h4 className="dash-title-three ">Benefits && Offerings</h4>
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
                      isJobBenefit={true}
                    />
                  </div>
                </div>

                <h4 className="dash-title-three pt-50 lg-pt-30">
                  Add Description
                </h4>
                <div className="dash-input-wrapper mb-30 ">
                  {/* <label htmlFor="">Job Description*</label> */}
                  <button
                    // disabled={gptLoading}
                    type={"button"}
                    onClick={draftDescription}
                    className="dash-btn-ai mb-3  tran3s me-3 d-flex align-content-center gap-2  justify-content-center   "
                  >
                    <span>
                      {true ? "Write a description With Ai" : <Loader />}
                    </span>
                    <span className="">
                      <MagicWand size={32} color="#244034" weight="light" />
                    </span>
                  </button>
                  <TinyMCEEditor
                    text={descriptionWithAI ? descriptionWithAI : ""}
                    setText={setDescription}
                  />
                </div>
                <h4 className="dash-title-three pt-50 lg-pt-30">
                  Add Test for Candidate{" "}
                </h4>
                <div className="dash-input-wrapper mb-30 ">
                  {/* <label htmlFor="">*</label> */}
                  <button
                    // disabled={gptLoading}
                    type={"button"}
                    onClick={draftQuestion}
                    className="dash-btn-ai mb-3  tran3s me-3 d-flex align-content-center gap-2  justify-content-center "
                  >
                    <span>{true ? "Generate Test" : <Loader />}</span>
                    <span className="">
                      <MagicWand size={32} color="#244034" weight="light" />
                    </span>
                  </button>
                  {questionWithAI && (
                    <MultipleChoiceQuestion text={questionWithAI} />
                  )}
                </div>
                <div className="button-group d-inline-flex align-items-center mt-30">
                  <button
                    disabled={loading}
                    type={"submit"}
                    onClick={handleSubmit}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className="dash-btn-two tran3s me-3"
                    // data-bs-dismiss="modal"
                    // aria-label="Close"
                  >
                    {loading ? <Loader /> : "Save"}
                  </button>
                  {/* <a href="#" className="dash-cancel-btn tran3s">
            Cancel
          </a> */}
                </div>
                {/* <div className="row">
                  <div className="col-lg-4 col-sm-6">
                    <FilterJobType />
                  </div>
                  <div className="col-lg-4 col-sm-6">
                    <FilterExperience />
                  </div>
                  <div className="col-lg-4">
                    <div className="filter-block d-xl-flex pb-25">
                      <div className="filter-title fw-500 text-dark mt-1">
                        Salary Range :
                      </div>
                      <div className="main-body ps-xl-4 flex-fill">
                        <SalaryRangeSlider
                          maxPrice={maxPrice}
                          priceValue={priceValue}
                          setPriceValue={setPriceValue}
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJobPostModalForAdmin;
