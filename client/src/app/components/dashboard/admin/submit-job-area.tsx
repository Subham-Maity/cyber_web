"use client";
import { addJobPost } from "@/redux/features/jobPost/api";
import { RootState } from "@/redux/store";
import AutocompletePosition from "@/ui/autoCompletePosistion";
import AutocompleteCategory from "@/ui/autoCompleteCategory";
import AutocompleteSkill from "@/ui/autoCompleteSkill";
import NiceSelect from "@/ui/nice-select";
import { MagicWand } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardHeader from "../candidate/dashboard-header";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Loader from "@/ui/loader";
import LocationAutoComplete from "@/ui/locationAutoComplete";
import MultipleChoiceQuestion from "@/ui/question";
import TinyMCEEditor from "@/ui/textEditor";
import { askToGpt } from "@/redux/features/jobPost/api";
import AutocompleteCompany from "@/ui/autoCompeteCompanyName";
import AutocompleteBenefits from "@/ui/autoCompletebenefits";
import { getAllLanguages } from "@/redux/features/languageProvider/api";
import { getAllCurrencies } from "@/redux/features/currencyProvider/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Currency } from "@/redux/features/currencyProvider/slice";
import AutocompleteCurrency from "@/ui/autoCompleteCurrency";
import {
  isBetween,
  isPureNumber,
  isPureString,
  isValidSalaryNumber,
} from "@/utils/helper";
import { notifyInfo } from "@/utils/toast";

type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubmitJobArea = ({ setIsOpenSidebar }: IProps) => {
  const dispatch = useAppDispatch();
  const { loading, gptLoading } = useSelector(
    (state: RootState) => state.jobPost
  );

  const { currAdmin } = useAppSelector((state) => state.admin);
  const [countAiClick, setCountAiClick] = useState({
    jobDescription: 0,
    test: 0,
  });
  const [loadingLocal, setLoadingLocal] = useState({
    description: false,
    question: false,
  });
  const [title, setTitle] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobType, setJobType] = useState<string[]>([]);
  const [workMode, setWorkMode] = useState<string[]>([]);
  const [experience, setExperience] = useState<string[]>([]);
  const [language, setLanguage] = useState("");
  const [currency, setCurrency] = useState<Currency | undefined>();
  const [location, setLocation] = useState<string[]>([]);
  const [salary, setSalary] = useState({
    minimum: "",
    maximum: "",
    isDisclosed: true,
    period: "",
    currency: {
      abbreviation: "",
      name: "",
      symbol: "",
    },
  });

  const [company, setCompany] = useState({
    name: "",
    companyId: "",
  });

  const updateSalaryProperty = (
    property: string,
    item: { value: Currency | string; label: string }
  ) => {
    setSalary({
      ...salary,
      [property]: item.value,
    });
  };

  const [primarySkills, setPrimarySkills] = useState<string[]>([]);
  const [secondarySkills, setSecondarySkills] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [descriptionWithAI, setDescriptionWithAI] = useState<string>("");
  const [questionWithAI, setQuestionWithAI] = useState<string[][]>([]);
  const [workHours, setWorkHours] = useState("");
  const [education, setEducation] = useState("");
  const [joiningTime, setJoiningTime] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
  // const [fetchedLanguages, setFetchedLanguages] = useState<string[]>(languages);

  const { languages } = useAppSelector((state: RootState) => state.language);
  const { currencies } = useAppSelector((state: RootState) => state.currency);
  useEffect(() => {
    getAllLanguages(dispatch);
    getAllCurrencies(dispatch);
  }, []);
  useEffect(() => {
    const item: any = { value: currency, label: currency };
    updateSalaryProperty("currency", item);
  }, [currency]);

  const handleSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSalary({
      ...salary,
      [name]: value,
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
  const handleExperience = (item: { value: string; label: string }) => {
    setExperience((prev) => [...prev, item.value]);
    // console.log(selected, item.value);
  };
  const handleLanguage = (item: { value: string; label: string }) => {
    setLanguage(item.value);
  };
  const handleRemove = (skill: string) => {
    setBenefits((prev) => prev.filter((val) => val !== skill));
  };

  const [validForm, setValidForm] = useState({
    companyId: true,
    title: true,
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
  //onchange handle function for deadlineDate
  // const handleDate = (e:React.ChangeEvent<HTMLInputElement>)=>{
  //   const deadlineDate=e.target.value;
  //   setDeadlineDate(deadlineDate);
  // }
  useEffect(() => {
    setValidForm({
      ...validForm,
      workHours: isPureNumber(workHours) && isBetween(workHours, 10, 48),
    });
  }, [workHours]);
  useEffect(() => {
    setValidForm({
      ...validForm,
      salaryNumber: isValidSalaryNumber(salary.minimum, salary.maximum),
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
  useEffect(() => {
    if (company.companyId !== "")
      setValidForm({ ...validForm, companyId: true });
  }, [company.companyId]);
  useEffect(() => {
    if (title !== "") {
      setValidForm({ ...validForm, title: true });
    }
  }, [title]);

  const bodyObj = {
    title: title,
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
    companyId: company?.companyId,
    companyName: company?.name,
    employerId: currAdmin?._id,
    testQuestions: questionWithAI ? questionWithAI : [],
    description,
    benefits: benefits,
    deadlineDate,
  };

  const handleSubmit = async () => {
    if (
      primarySkills.length === 0 ||
      secondarySkills.length === 0 ||
      jobType.length === 0 ||
      workMode.length === 0 ||
      experience.length === 0 ||
      location.length === 0 ||
      company.companyId === "" ||
      title === ""
    ) {
      setValidForm({
        ...validForm,
        priSkills: !(primarySkills.length === 0),
        secSkills: !(secondarySkills.length === 0),
        jobType: !(jobType.length === 0),
        workMode: !(workMode.length === 0),
        experience: experience.length !== 0,
        location: location.length !== 0,
        companyId: company.companyId !== "",
        title: title !== "",
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
      !bodyObj.workMode ||
      !bodyObj.companyId
    ) {
      notifyInfo("mandatory fields should be filled");
      return;
    }

    console.log(bodyObj);

    await addJobPost(dispatch, bodyObj);
    setTitle("");
    setJobCategory("");
    setJobType([]);
    setLocation([]);
    setExperience([]);
    setSalary({
      minimum: "",
      maximum: "",
      isDisclosed: true,
      currency: {
        abbreviation: "",
        name: "",
        symbol: "",
      },
      period: "",
    });
    setPrimarySkills([]);
    setSecondarySkills([]);
    setDescriptionWithAI("");
    setQuestionWithAI([]);
    setBenefits([]);
    setWorkHours("");
    setEducation("");
    setCompany({
      name: "",
      companyId: "",
    });
    // setDescription("");
    setDeadlineDate(null);
    setWorkMode([]);
    setLanguage("");
    setJoiningTime("");
  };

  const draftDescription = async () => {
    setLoadingLocal({ ...loadingLocal, description: true });
    const query = `Help me in writing to the point job description for a job post with given information .
                    job title:${bodyObj.title} job type:${
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
      setCountAiClick({ ...countAiClick, jobDescription: 1 });
    } catch (error) {
      console.log(error);
    }
    setLoadingLocal({ ...loadingLocal, description: false });
  };
  const draftQuestion = async () => {
    setLoadingLocal({ ...loadingLocal, question: true });
    // const query = `generate 4 easy to medium  question with answer in multiple choice of exact four option on the topic ${bodyObj.primarySkills.join(
    //   ","
    // )}. do not give any extra information or text just question and corresponding answer. give the response in a way that question, options and answer should be in same group or new line.`;

    const query = `Generate 4 easy to medium questions with answers in multiple choice format, each with exactly four options. The topic is ${bodyObj.primarySkills.join(
      ","
    )}. Each question, its options, and the corresponding answer should be grouped together and separated by two newline characters (\\n\\n). Do not include any extra information or text. Here is an example of the desired format:
        
1. Question text
A. Option 1
B. Option 2
C. Option 3
D. Option 4
Answer: B. Option 2

Please follow this format for all questions.`;
    try {
      const data = await askToGpt(dispatch, query);
      if (data?.choices?.[0].message?.content) {
        let questions = data.choices[0].message.content.split("\n\n");
        if (questions.length > 4) {
          notifyInfo("Not enough questions. Please generate again.");
          return;
        }
        questions = questions.map((question: string) => question.split("\n"));
        setQuestionWithAI(questions);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingLocal({ ...loadingLocal, question: false });
  };
  console.log(descriptionWithAI);

  return (
    <div className="dashboard-body job-details">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Post a New Job</h2>
        <div className="bg-white card-box border-20">
          <h4 className="dash-title-three">Job Details</h4>

          <div className="row ">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="lastName">Company*</label>
                <AutocompleteCompany
                  selected={company}
                  setSelected={setCompany}
                  endPoint="companyName"
                  employerId={currAdmin?._id}
                  showCreate={true}
                />
                {!validForm.companyId && (
                  <p style={{ color: "red" }}>Please Enter Valid Company</p>
                )}
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
                />
                {!validForm.title && (
                  <p style={{ color: "red" }}>Please Enter Valid Job Title</p>
                )}
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
                  <p style={{ color: "red" }}>Please input valid category</p>
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
                    { value: "Interneship", label: "Interneship" },
                    { value: "Hourly contract", label: "Hourly contract" },
                    { value: "Fixed price", label: "Fixed price" },
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
                    <button key={value}>{value}</button>
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
                    <button key={value}>{value}</button>
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
                <NiceSelect
                  options={[
                    { value: "select joining", label: "select joining" },
                    { value: "Immediate Joining", label: "Immediate Joining" },
                    { value: "Within 7 Days", label: "Within 7 Days" },
                    { value: "Within 15 Days", label: "Within 15 Days" },
                    { value: "Within 30 Days", label: "Within 30 Days" },
                    { value: "Within 1 Month", label: "Within 1 Month" },
                    {
                      value: "Flexible Joining Date",
                      label: "Flexible Joining Date",
                    },
                    { value: "To Be Discussed", label: "To Be Discussed" },
                  ]}
                  placeholder="select joining"
                  defaultCurrent={0}
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
                <NiceSelect
                  options={[
                    { value: "select period", label: "select period" },
                    { value: "monthly", label: "monthly" },
                    { value: "yearly", label: "yearly" },
                    { value: "weekly", label: "weekly" },
                    { value: "By-weekly", label: "By-weekly" },
                    { value: "hourly", label: "hourly" },
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => updateSalaryProperty("period", item)}
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
            />
            {!validForm.priSkills && (
              <p style={{ color: "red" }}>Primary skills cannot be empty</p>
            )}
            {/* <input type="text" placeholder="Add Skills" /> */}
            <div className="skill-input-data d-flex align-items-center flex-wrap">
              {primarySkills.map((value) => (
                <button key={value}>{value}</button>
              ))}
            </div>
          </div>
          {/* secondary skills */}
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Secondary Skills*</label>
            <AutocompleteSkill
              skills={secondarySkills}
              setSkills={setSecondarySkills}
            />
            {!validForm.secSkills && (
              <p style={{ color: "red" }}>Secondary skills cannot be empty</p>
            )}
            {/* <input type="text" placeholder="Add Skills" /> */}
            <div className="skill-input-data d-flex align-items-center flex-wrap">
              {secondarySkills.map((value) => (
                <button key={value}>{value}</button>
              ))}
            </div>
          </div>

          {/* employ experience start */}
          <div className="row ">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Experience*</label>
                <NiceSelect
                  options={[
                    { value: "Intermediate", label: "Intermediate" },
                    { value: "Fresher", label: "Fresher" },
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
                    <button key={value}>{value}</button>
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
                    <button key={value}>{value}</button>
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
                  minDate={new Date()}
                />
                {!validForm.deadlineDate && (
                  <p style={{ color: "red" }}>select a Valid deadline date</p>
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

          <h4 className="dash-title-three pt-50 lg-pt-30">Add Description</h4>
          <div className="dash-input-wrapper mb-30 ">
            {/* <label htmlFor="">Job Description*</label> */}
            <button
              // disabled={gptLoading}
              type={"button"}
              onClick={draftDescription}
              className="dash-btn-ai mb-3  tran3s me-3 d-flex align-content-center gap-2  justify-content-center   "
            >
              <span>
                {!loadingLocal.description ? (
                  countAiClick.jobDescription < 1 ? (
                    "Write a description With Ai"
                  ) : (
                    "Re-generate Job Description"
                  )
                ) : (
                  <Loader />
                )}
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
              <span>
                {!loadingLocal.question ? (
                  countAiClick.test < 1 ? (
                    "Generate Test"
                  ) : (
                    "Re-Generate Test"
                  )
                ) : (
                  <Loader />
                )}
              </span>
              <span className="">
                <MagicWand size={32} color="#244034" weight="light" />
              </span>
            </button>
            {questionWithAI && <MultipleChoiceQuestion text={questionWithAI} />}
          </div>
        </div>

        <div className="button-group d-inline-flex align-items-center mt-30">
          <button
            disabled={loading}
            type={"submit"}
            onClick={handleSubmit}
            className="dash-btn-two tran3s me-3"
          >
            {loading ? <Loader /> : "Save"}
          </button>
          {/* <a href="#" className="dash-cancel-btn tran3s">
            Cancel
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default SubmitJobArea;
