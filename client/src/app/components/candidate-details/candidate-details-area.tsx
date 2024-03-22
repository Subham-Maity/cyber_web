"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import CandidateProfileSlider from "./candidate-profile-slider";
import avatar from "@/assets/images/candidates/img_01.jpg";
import Skills from "./skills";
import WorkExperience from "./DashWorkEx";
import CandidateBio from "./bio";
import EmailSendForm from "../forms/email-send-form";
import Education from "./Education";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { getCandidateDetails } from "@/redux/features/candidate/api";
import RequestModal from "./popup/request";
import ResumeDownloadButton from "@/ui/downloadBtn";
import { setSubscriptionModelEmployer } from "@/redux/features/model/slice";
import SubscriptionModalForEmployer from "../model/subscriptionModelEmployer";

const CandidateDetailsArea = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { candidate } = useAppSelector(
    (state) => state.candidate.candidateList
  );
  const { userRole } = useAppSelector((state) => state.persistedReducer.user);
  const { currEmployer } = useAppSelector((state) => state.employer);
  useEffect(() => {
    getCandidateDetails(dispatch, id);
  }, [id]);

  const {subscriptionModelEmployer} = useAppSelector((state) => state.model)
  const handleGetDetails = () => {
    // getCompanyDetails(dispatch, id);

    dispatch(setSubscriptionModelEmployer(true));
    // setModalShown(true);
  };
  return (
    <>
      {candidate && (
        <>
          <section className="candidates-profile pt-100 lg-pt-70 pb-50 lg-pb-80">
            <div className="container">
              <div className="row">
                <div className="col-xxl-9 col-lg-8">
                  <div className="candidates-profile-details me-xxl-5 pe-xxl-4">
                    <div className="inner-card border-style mb-45 lg-mb-40">
                      <h3 className="title">Overview</h3>
                      {/* <p>
                    Hello my name is Ariana Gande Connor and I’m a Financial
                    Supervisor from Netherlands, Rotterdam. In pharetra orci
                    dignissim, blandit mi semper, ultricies diam. Suspendisse
                    malesuada suscipit nunc non volutpat. Sed porta nulla id
                    orci laoreet tempor non consequat enim. Sed vitae aliquam
                    velit. Aliquam Integer vehicula rhoncus molestie. Morbi
                    ornare ipsum sed sem condimentum, et pulvinar tortor luctus.
                    Suspendisse condimentum lorem ut elementum aliquam.{" "}
                   </p> */}
                      <br />
                      <p>{candidate.bio}</p>
                    </div>

                    <div className="inner-card border-style mb-45 lg-mb-50">
                      <h3 className="title">Education</h3>
                      <Education education={candidate.education} />
                    </div>
                    <div className="inner-card border-style mb-45 lg-mb-50">
                      <h3 className="title">Skills</h3>
                      {/* skill area */}
                      <Skills skills={candidate.skills} />
                      {/* skill area */}
                    </div>
                    {candidate.experience.length > 0 && (
                      <div className="inner-card border-style mb-45 lg-mb-50">
                        <h3 className="title">Work Experience</h3>
                        {/* WorkExperience */}
                        <WorkExperience experience={candidate.experience} />
                        {/* WorkExperience */}
                      </div>
                    )}
                    {/* Candidate Profile Slider */}
                    {/* <h3 className="title">Portfolio</h3>
                <CandidateProfileSlider /> */}
                    {/* Candidate Profile Slider */}
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-4">
                  <div className="cadidate-profile-sidebar ms-xl-5 ms-xxl-0 md-mt-60">
                    <div className="cadidate-bio bg-wrapper bg-color mb-60 md-mb-40">
                      <div className="pt-25">
                        <div className="cadidate-avatar m-auto">
                          <Image
                            src={candidate?.avatar}
                            alt="avatar"
                            className="lazy-img rounded-circle w-100"
                            width={60}
                            height={60}
                            style={{ height: "auto" }}
                          />
                        </div>
                      </div>
                      <h3 className="cadidate-name text-center">
                        {candidate.firstName} {candidate.lastName}{" "}
                      </h3>
                      <div className="text-center pb-25">
                        {/* <a href="#" className="invite-btn fw-500">
                      Invite
                    </a> */}
                      </div>
                      {/* CandidateBio */}
                      <CandidateBio candidate={candidate} />
                      {/* CandidateBio */}
                      {/* <a
                      href="#"
                      className="btn-ten fw-500 text-white w-100 text-center tran3s mt-15"
                    >
                      Download CV
                    </a> */}
                      {/* {candidate.resumes.length > 0 && (
                        <ResumeDownloadButton
                          text={"Download CV"}
                          style="btn-ten fw-500 text-white w-100 text-center tran3s mt-15"
                          fileName={candidate.resumes[0]?.name}
                          s3Key={candidate.resumes[0].s3Key}
                        />
                      )} */}
                      {/* {(userRole === "employer" &&
                        currEmployer?.subscription?.offering
                          ?.isRequestApplicable === true) ||
                        (userRole === "admin") && (
                          <button
                            className="btn-ten fw-500 text-white w-100 text-center tran3s mt-15"
                            data-bs-toggle="modal"
                            data-bs-target="#requestModal"
                          >
                            {false ? "Applied" : "Send request"}
                          </button>
                        )}
                      {userRole === "employer" &&
                        currEmployer?.subscription?.offering
                          ?.isRequestApplicable === false && (
                          <button
                            className="btn-ten fw-500 text-white w-100 text-center tran3s mt-15"
                            // data-bs-toggle="modal"
                            // data-bs-target="#requestModal"
                            onClick={handleGetDetails}
                          >
                            {false ? "Applied" : "Send request"}
                          </button>
                        )} */}
                        { userRole === "employer" &&
                         currEmployer?.subscription?.offering?.isRequestApplicable === false ?(
                           <button
                             className="btn-ten fw-500 text-white w-100 text-center tran3s mt-15"
                             onClick={handleGetDetails}
                           >
                             {false ? "Applied" : "Send request"}
                           </button>
                      ) : (
                        // userRole === "employer" || userRole === "admin" && (
                          <button
                            className="btn-ten fw-500 text-white w-100 text-center tran3s mt-15"
                            data-bs-toggle="modal"
                            data-bs-target="#requestModal"
                          >
                            Send Request
                          </button>
                       
                        // )
                      )}
                    </div>

                    {/* <h4 className="sidebar-title">Email James Brower.</h4>
                    <div className="email-form bg-wrapper bg-color">
                      <p>
                        Your email address & profile will be shown to the
                        recipient.
                      </p>
                      <EmailSendForm />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <RequestModal candidateId={candidate._id} />
          {subscriptionModelEmployer && <SubscriptionModalForEmployer />}
        </>
      )}
    </>
  );
};

export default CandidateDetailsArea;
