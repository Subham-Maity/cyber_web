import { useAppDispatch, useAppSelector } from "@/redux/hook";
import type { ICompany } from "@/types/company";
import type { IJobPost } from "@/types/jobPost-type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import QuestionModal from "../common/popup/testQuestion";
async function getData() {
  const response = await fetch("/data.json");
  return response.json();
}

import Skills from "../candidate-details/skills";
import GptSidebar from "../common/chat-gpt-sidebar";
import ChatWithGpt from "../common/chat-with-gpt";

import { setSubscriptionModel } from "@/redux/features/model/slice";
import SubscriptionModal from "../model/subscriptionModel";
import Experience from "../dashboard/candidate/resume/Experience";

const JobDetailsV1Area = ({
  job,
  url,
  company,
}: {
  job: IJobPost;
  url: string;
  company?: ICompany;
}) => {
  const URL = `${process.env.NEXT_PUBLIC_HOME_ENDPOINT}${url}`;
  console.log(company);

  const [sidebar, setSidebar] = useState(false);
  const date = new Date(job?.createdAt);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const readableString = date.toLocaleDateString(undefined, options);

  const date1 = new Date(company?.foundedDate ?? new Date());
  const options2: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const readableStrings = date1.toLocaleDateString(undefined, options2);

  const dispatch = useAppDispatch();
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  const { currCandidate } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );

  const { loading, allJobAppByCandidate } = useAppSelector(
    (state) => state.jobApplication
  );

  const { subscriptionModel } = useAppSelector((state) => state.model);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     dispatch(setSubscriptionModel(true));
  //   }, 2000);
  //   // Clean up the timeout to avoid memory leaks
  //   return () => clearTimeout(timeoutId);
  // }, []);

  // console.log(allJobAppByCandidate);
  const checkIsApplied = () => {
    const applicationsByCurrentCandidate = allJobAppByCandidate.filter(
      (application) => String(application.jobPost) === String(job._id)
    );
    console.log(allJobAppByCandidate);
    console.log({ jobId: job?._id });

    return applicationsByCurrentCandidate.length > 0;
  };
  let isApplied = false;
  isApplied = checkIsApplied();
  console.log(job.testQuestions, "test questions");
  const test = 58;

  const description = job?.description.replaceAll("\\n", "<br/>");
  const missingSKills = job?.primarySkills.filter((val) => {
    return !currCandidate?.skills.includes(val);
  });
  const secMissingSKills = job?.secondarySkills.filter((val) => {
    return !currCandidate?.skills.includes(val);
  });
  // missingSKills.push(...job.secondarySkills);
  return (
    <>
      {/* {subscriptionModel ? <SubscriptionModal /> : null} */}
      <section className="job-details pt-100 lg-pt-80 pb-130 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xxl-9 col-xl-8">
              <div className="details-post-data row hello me-xxl-5 pe-xxl-4">
                {currCandidate ? (
                <div className="d-sm-flex justify-content-between  ">
                  <div className="col-sm-6 ">
                    <div className="post-date">
                      {readableString} by
                      <a className="fw-500 ms-2  text-dark">{company?.name}</a>
                    </div>
                    <h3 className="post-title pe-3">{`${job?.title} (${job.jobCode})`}</h3>
                    <div className=" d-flex justify-items-center w-100 justify-content-between align-items-center   ">
                      <ul className="share-buttons d-flex flex-wrap style-none">
                        <li>
                          <a
                            target="_blank"
                            href={`https://twitter.com/intent/tweet?text=${""}&url=${URL}`}
                            // href={company?.socialSites?.twitter}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <i className="bi bi-twitter"></i>
                            <span>Twitter</span>
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${URL}`}
                            // href={company?.socialSites?.linkedIn}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <i className="bi bi-linkedin"></i>
                            <span>LinkedIn</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {job.matchScore !== -1 && 
                  <div className="gap-3 col-sm-6 mt-3 ">
                    {job.matchScore != undefined && (
                      <div className="job-match">
                        <span
                          className={` ${
                            job.matchScore >= 80
                              ? "text-success"
                              : job.matchScore >= 60
                              ? "text-primary"
                              : "text-warning"
                          } fw-bold `}
                        >
                          {job.matchScore} %
                        </span>{" "}
                        <span className=" fw-medium ">
                          {" "}
                          match with your profile.
                        </span>
                        <div>
                          <div>Your profile is missing these key skills:</div>
                          {missingSKills.length > 0 && (
                            <div className="">
                              <div className=" fw-medium mt-3 ">
                                Primary Skills:
                              </div>
                              <ul className="p-0  gap-2 mt-2 flex-wrap  d-flex shadow-none ">
                                {missingSKills.map((skill, index) => (
                                  <li
                                    className="website-btn d-flex justify-content-center gap-1 "
                                    key={index}
                                  >
                                    <span>
                                      <i className="bi bi-x-circle"></i>
                                    </span>
                                    {skill}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div>
                          {secMissingSKills.length > 0 && (
                            <div className="">
                              <div className="fw-medium mt-3">
                                Secondary Skills:
                              </div>
                              <ul className="p-0  gap-2 mt-2 flex-wrap  d-flex shadow-none ">
                                {secMissingSKills.map((skill, index) => (
                                  <li
                                    className="website-btn d-flex justify-content-center gap-1 "
                                    key={index}
                                    >
                                    <span>
                                      <i className="bi bi-x-circle"></i>
                                    </span>
                                    {skill}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  }
                </div>
                ):(
                  <div className="d-flex justify-content-between  ">
                  <div className="">
                    <div className="post-date">
                      {readableString} by
                      <a className="fw-500 ms-2  text-dark">{company?.name}</a>
                    </div>
                    <h3 className="post-title pe-3">{`${job?.title} (${job.jobCode})`}</h3>
                    <div className=" d-flex justify-items-center w-100 justify-content-between align-items-center   ">
                      <ul className="share-buttons d-flex flex-wrap style-none">
                        <li>
                          <a
                            target="_blank"
                            href={`https://twitter.com/intent/tweet?text=${""}&url=${URL}`}
                            // href={company?.socialSites?.twitter}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <i className="bi bi-twitter"></i>
                            <span>Twitter</span>
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${URL}`}
                            // href={company?.socialSites?.linkedIn}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <i className="bi bi-linkedin"></i>
                            <span>LinkedIn</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  </div>
                )}

                {/* {description?.map((text, index) => {
                const paragraph = text.split("\n");
                // console.log("temp", paragraph);
                return (
                  <div className="post-block border-style mt-50 lg-mt-30">
                    <div className="d-flex align-items-center">
                      <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                        1
                      </div>
                      <h4 className="block-title">{paragraph[0]}</h4>
                    </div>
                    <ul className="list-type-one style-none mb-15">
                      {paragraph.splice(1).map((val, index) => {
                        return <li>{val}</li>;
                      })}
                    </ul>
                  </div>
                );
              })} */}

                <div className="post-block border-style mt-30 mb-45">
                  <div
                    className="_description"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
                {/* <div className="post-block border-style mt-40 lg-mt-30">
                  <div className="d-flex align-items-center">
                    <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                      2
                    </div>
                    <h4 className="block-title">Responsibilities</h4>
                  </div>
                  <ul className="list-type-one style-none mb-15">
                    <li>
                      Collaborate daily with a multidisciplinary team of
                      Software Engineers, Researchers, Strategists, and Project
                      Managers.
                    </li>
                    <li>
                      Co-lead ideation sessions, workshops, demos, and
                      presentations with clients on-site
                    </li>
                    <li>
                      Push for and create inclusive, accessible design for all
                    </li>
                    <li>
                      Maintain quality of the design process and ensure that
                      when designs are translated into code they accurately
                      reflect the design specifications.
                    </li>
                    <li>
                      Sketch, wireframe, build IA, motion design, and run
                      usability tests
                    </li>
                    <li>
                      Design pixel perfect responsive UI’s and understand that
                      adopting common interface pattern is better for UX than
                      reinventing the wheel
                    </li>
                    <li>
                      Ensure content strategy and design are perfectly in-sync
                    </li>
                    <li>
                      Give and receive design critique to help constantly refine
                      and push our work
                    </li>
                  </ul>
                </div> */}
                {/* <div className="post-block border-style mt-40 lg-mt-30">
                  <div className="d-flex align-items-center">
                    <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                      3
                    </div>
                    <h4 className="block-title">Primary Skill:</h4>
                  </div>
                  <div className="candidates-profile-details">
                    <div className="inner-card p-0">
                      {/* skill area *
                      <Skills skills={job?.primarySkills} />
                      {/* skill area *
                    </div>
                  </div>
                </div> */}
                <div className="candidates-profile-details me-xxl-5 pe-xxl-4">
                  <div className="inner-card border-style mb-45 lg-mb-50">
                    <h3 className="title">Primary Skills</h3>
                    <Skills skills={job?.primarySkills} />
                  </div>
                  <div className="inner-card border-style mb-45 lg-mb-50">
                    <h3 className="title">Secondary Skills</h3>
                    <Skills skills={job?.secondarySkills} />
                  </div>
                  <div className="inner-card border-style mb-45 lg-mb-50">
                    <h3 className="title">Benefits</h3>
                    {job?.benefits?.map((val, index) => {
                      return <li key={index}>{val}</li>;
                    })}
                  </div>
                </div>
                {/* <div className="post-block border-style mt-40 lg-mt-30">
                  <div className="d-flex align-items-center">
                    <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                      4
                    </div>
                    <h4 className="block-title">Secondary Skill:</h4>
                  </div>
                  <div className="candidates-profile-details">
                    <div className="inner-card p-0">
                      {/* skill area *
                      <Skills skills={job?.secondarySkills} />
                      {/* skill area *
                    </div>
                  </div>
                </div> */}

                {/* <div className="post-block border-style mt-40 lg-mt-30">
                  <div className="d-flex align-items-center">
                    <div className="block-numb text-center fw-500 text-white rounded-circle me-2">
                      5
                    </div>
                    <h4 className="block-title">Benefits:</h4>
                  </div>
                  <ul className="list-type-two style-none mb-15">
                    {job?.benefits?.map((val, index) => {
                      return <li key={index}>{val}</li>;
                    })}
                    {/* <li>We are a remote-first company.</li>
                  <li>
                    100% company-paid health insurance premiums for you & your
                    dependents
                  </li>
                  <li>Vacation stipend</li>
                  <li>Unlimited paid vacation and paid company holidays</li>
                  <li>Monthly wellness/gym stipend</li> *
                  </ul>
                </div> */}
              </div>
            </div>
            {/* side section */}
            <div className="col-xxl-3 col-xl-4">
              <div className="job-company-info ms-xl-5 ms-xxl-0 lg-mt-50">
                <Image
                  // src={job_img_1}
                  src={company?.logo as string}
                  alt="logo"
                  className="lazy-img m-auto logo"
                  width={60}
                  height={60}
                />
                <div className="text-md text-dark text-center mt-15 mb-20 text-capitalize">
                  {company?.name}
                </div>

                <div className="border-top mt-40 pt-40">
                  <ul className="job-meta-data row style-none">
                    <li className="col-xl-7 col-md-4 col-sm-6">
                      <span>Salary</span>
                      <div>
                        {job?.salary?.currency?.symbol} {job?.salary.minimum}-{job?.salary.maximum} {job?.salary?.period}
                      </div>
                    </li>
                    <li className="col-xl-5 col-md-4 col-sm-6">
                      <span>Expertise</span>
                      {/* <div>{job.primarySkills.join(",")}</div> * */}
                      <div>
                        {job?.primarySkills
                          .slice(0, 3)
                          .map((primarySkills, index) => (
                            <span key={index}>
                              {primarySkills}
                              {index !== 2 && ","}
                              <br />
                            </span>
                          ))}
                      </div>
                    </li>
                    <li className="col-xl-7 col-md-4 col-sm-6">
                      <span>Location</span>
                      <div>
                        {job?.location.map((location, index) => (
                          <span key={index}>
                            {location}
                            {index !== job?.location.length - 1 && ","}
                            <br />
                          </span>
                        ))}
                      </div>
                    </li>
                    <li className="col-xl-5 col-md-4 col-sm-6">
                      <span>Job Type</span>
                      <div>
                        {job?.jobType.map((jobType, index) => (
                          <span key={index}>
                            {jobType}
                            {index !== job?.jobType.length - 1 && ","}
                            <br />
                          </span>
                        ))}
                      </div>
                    </li>
                    <li className="col-xl-7 col-md-4 col-sm-6">
                      <span>Date</span>
                      <div>{readableString} </div>
                    </li>
                    <li className="col-xl-5 col-md-4 col-sm-6">
                      <span>Experience</span>
                      <div>
                        {job?.preferredExperience.map((Experience, index) => (
                          <span key={index}>
                            {Experience}
                            {index !== job?.preferredExperience.length - 1 &&
                              ","}
                            <br />
                          </span>
                        ))}
                      </div>
                    </li>
                  </ul>
                  <div className="job-tags d-flex flex-wrap pt-15">
                    {job?.primarySkills &&
                      job?.primarySkills.map((t, i) => (
                        <a key={i} href="#">
                          {t}
                        </a>
                      ))}
                    {job?.secondarySkills &&
                      job?.secondarySkills.map((t, i) => (
                        <a key={i} href="#">
                          {t}
                        </a>
                      ))}
                  </div>
                  {job.matchScore !== -1 && 
                  <button
                  disabled={loading || isApplied}
                  className={`${
                    isApplied ? "btn-one-applied" : "btn-one"
                  }  w-100 mt-25 `}
                    data-bs-toggle="modal"
                    data-bs-target="#questionModal"
                  >
                    {isApplied ? "Applied" : "Apply Now"}
                  </button>
                }
                  {/* <button
                  type="button"
                    disabled={loading || isApplied}
                    onClick={handleApply}
                    className={`${
                      isApplied ? "btn-one-applied" : "btn-one"
                    }  w-100 mt-25 `}
                  >
                    {loading ? <Loader /> : }
                  </button> */}
                </div>
              </div>
              <div className="job-company-info ms-xl-5 ms-xxl-0 mt-30 lg-mt-50">
                {/* <Image
                src={job_img_1}
                alt="logo"
                className="lazy-img m-auto logo"
                width={60}
                height={60}
              />
             
              <a href="#" className="website-btn tran3s">
                Visit website
              </a> */}
                <Link
                  href={`company-details/${company?._id}`}
                  className="website-btn tran3s"
                >
                  Visit Company
                </Link>
                <div className="text-md text-dark text-center mt-15 mb-20 text-capitalize">
                  About Company
                </div>

                <div className="border-top ">
                  <ul className="job-meta-data row style-none">
                    <li className="col-xl-7 col-md-4 col-sm-6">
                      <span>Team size</span>
                      <div>{company?.teamSize} People</div>
                    </li>
                    <li className="col-xl-5 col-md-4 col-sm-6">
                      <span>Category</span>
                      <div>{company?.category}</div>
                    </li>
                    <li className="col-xl-7 col-md-4 col-sm-6">
                      <span>Founded Date</span>
                      <div>{readableStrings}</div>
                    </li>
                    {/* <li className="col-xl-5 col-md-4 col-sm-6">
                      <span>Experience</span>
                      <div>{job?.preferredExperience[0]}</div>
                    </li> */}
                  </ul>
                  <div className="job-tags d-flex flex-wrap pt-15">
                    {company?.benefits &&
                      company.benefits.map((t, i) => (
                        <a key={i} href="#">
                          {t}
                        </a>
                      ))}
                  </div>
                  {/* <a href="#" className="btn-one w-100 mt-25">
                  Apply Now
                </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div onClick={() => setSidebar(true)}>
        <ChatWithGpt />
      </div>
      {sidebar && <GptSidebar setSidebar={setSidebar} />}
      <QuestionModal question={job?.testQuestions} jobId={job?._id} />
    </>
  );
};

export default JobDetailsV1Area;
