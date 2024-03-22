"use client";
import logo from "@/assets/images/logo/media_37.png";
import { getCompanyDetails } from "@/redux/features/company/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";
import { useEffect, useState } from "react";
import Funding from "./Funding";
import CompanyReviews from "./company-reviews";
import { setSubscriptionModel } from "@/redux/features/model/slice";
import SubscriptionModal from "../model/subscriptionModel";

const CompanyDetailsArea = ({ id, url }: { id: string; url: string }) => {
  const URL = `${process.env.NEXT_PUBLIC_HOME_ENDPOINT}${url}`;
  const dispatch = useAppDispatch();
  const { company } = useAppSelector((state) => state.company.companyList);

  const { subscriptionModel } = useAppSelector((state) => state.model);
  const [modalShown, setModalShown] = useState(false);
  const { currCandidate } = useAppSelector(
    (state) => state.candidate.candidateDashboard 
  );
  const { userRole } = useAppSelector((state) => state.persistedReducer.user);
  useEffect(() => {
    getCompanyDetails(dispatch, id);
    // const timeoutId = setTimeout(() => {
    //   dispatch(setSubscriptionModel(true));
    //   setModalShown(true);
    // }, 1000);
    // Clean up the timeout to avoid memory leaks
    // return () => clearTimeout(timeoutId);
  }, [id]);
  const handleGetDetails = () => {
    // getCompanyDetails(dispatch, id);

    dispatch(setSubscriptionModel(true));
    setModalShown(true);
  };
  let date = new Date();
  if (company) {
    date = new Date(company?.foundedDate);
  }
  const foundedDate = date.toLocaleDateString();

  return (
    <>
      {subscriptionModel && <SubscriptionModal />}
      {company && (
        <section className="company-details candidates-profile-details pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
          <div className="container">
            <div className="row">
              <div className="col-xxl-3 col-xl-4 order-xl-last">
                <div className="job-company-info ms-xl-5 ms-xxl-0 lg-mb-50">
                  <Image
                    src={company?.logo}
                    alt="logo"
                    className="lazy-img m-auto logo"
                    width={60}
                    height={60}
                    style={{ height: "auto" }}
                  />
                  <div className="text-md text-dark text-center mt-15 mb-20 lg-mb-10">
                    {company.name}
                  </div>
                  <div className="text-center">
                    <a
                      href={company?.socialSites?.website}
                      className="website-btn-two tran3s"
                      target="_blank"
                    >
                      Visit our website
                    </a>
                  </div>

                  <div className="border-top mt-35 lg-mt-20 pt-25">
                    <ul className="job-meta-data row style-none">
                      {(userRole === "candidate" || userRole === "admin") &&
                        currCandidate?.subscription.subscriptionType !==
                          "foundational" && (
                          <li className="col-12">
                            <span>Founder Name </span>
                            <div>{company.founderName}</div>
                          </li>
                        )}
                      {(userRole === "candidate" || userRole === "admin") &&
                        currCandidate?.subscription.subscriptionType !==
                          "foundational" && (
                          <li className="col-12">
                            <span>Location: </span>
                            <div>
                              {company.location[0].city},{" "}
                              {company.location[0].country}
                            </div>
                          </li>
                        )}
                      {(userRole === "candidate" || userRole === "admin") &&
                        currCandidate?.subscription.subscriptionType !==
                          "foundational" && (
                          <li className="col-12">
                            <span>Size:</span>
                            <div>{company.teamSize}</div>
                          </li>
                        )}
                      {(userRole === "candidate" || userRole === "admin") &&
                        currCandidate?.subscription.subscriptionType !==
                          "foundational" && (
                          <li className="col-12">
                            <span>Founded: </span>
                            <div>{foundedDate}</div>
                          </li>
                        )}

                      {/* {company?.benefits && company?.benefits?.length > 0 && (
                        <li className="col-12">
                        <span>Benefits:</span>
                        {company.benefits.map((val) => (
                          <div key={val}>{val}</div>
                          ))}
                          </li>
                        )} */}
                      <li className="col-12">
                        <span>Category: </span>
                        <div>{company.category}</div>
                      </li>
                      {(userRole === "candidate" || userRole === "admin") &&
                        currCandidate?.subscription.subscriptionType !==
                          "foundational" && (
                          <li className="col-12">
                            <span>Social: </span>
                            <div>
                              {company?.socialSites?.facebook && (
                                <a
                                  target="_blank"
                                  href={company?.socialSites?.facebook}
                                  className="me-3"
                                >
                                  <i className="bi bi-facebook"></i>
                                </a>
                              )}
                              {company?.socialSites?.website && (
                                <a
                                  target="_blank"
                                  href={company?.socialSites?.website}
                                  className="me-3"
                                >
                                  <i className="bi bi-globe"></i>
                                </a>
                              )}
                              {company?.socialSites?.twitter && (
                                <a
                                  target="_blank"
                                  href={company?.socialSites?.twitter}
                                  className="me-3"
                                >
                                  <i className="bi bi-twitter"></i>
                                </a>
                              )}
                              {company?.socialSites?.linkedIn && (
                                <a
                                  target="_blank"
                                  href={company?.socialSites?.linkedIn}
                                >
                                  <i className="bi bi-linkedin"></i>
                                </a>
                              )}
                            </div>
                          </li>
                        )}
                      {userRole === "candidate" &&
                        currCandidate?.subscription.subscriptionType ===
                          "foundational" && (
                          <li className="col-12">
                            <button
                              className="btn-two tran3s"
                              style={{ marginLeft: "30px" }}
                              onClick={handleGetDetails}
                            >
                              Get Details
                            </button>
                          </li>
                        )}
                    </ul>

                    {/* <a
                      href="#"
                      className="btn-ten fw-500 text-white w-100 text-center tran3s mt-25"
                    >
                      Send Message
                    </a> */}
                  </div>
                </div>
              </div>
              <div className="col-xxl-9 col-xl-8 order-xl-first">
                <div className="card-box details-post-data me-xxl-5 pe-xxl-4">
                  <h3>Overview</h3>
                  <p className="inner-card border-style mb-25 lg-mb-20">
                    {company?.about}
                  </p>
                  {/* <h3>Intro</h3> */}
                  {/* <div className="video-post d-flex align-items-center justify-content-center mb-50">
                  <a
                    className="fancybox rounded-circle video-icon tran3s text-center"
                    onClick={() => setIsVideoOpen(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi bi-play-fill"></i>
                  </a>
                  </div> */}
                  {company?.funding && company?.funding?.length > 0 && (
                    <>
                      <h3>Funding && Finnance</h3>
                      <div className="inner-card border-style mb-25 lg-mb-20">
                        <Funding funding={company.funding} />
                        {userRole === "candidate" &&
                          currCandidate?.subscription.subscriptionType ===
                            "foundational" && (
                            <button
                              className="btn-two tran3s "
                              style={{ marginLeft: "30px" }}
                              onClick={handleGetDetails}
                            >
                              Get Details
                            </button>
                          )}
                      </div>
                    </>
                  )}

                  {company?.benefits && company?.benefits?.length > 0 && (
                    <>
                      <h3>Benefits</h3>
                      <div className="inner-card border-style mb-25 lg-mb-20">
                        <ul className="list-type-two mb-15 job-tags">
                          {company?.benefits?.map((val, index) => {
                            return (
                              <li key={index}>
                                {userRole === "candidate" &&
                                currCandidate?.subscription.subscriptionType ===
                                  "foundational"
                                  ? `${val.substring(0, 3)}...`
                                  : val}
                              </li>
                            );
                          })}
                        </ul>
                        {userRole === "candidate" &&
                          currCandidate?.subscription.subscriptionType ===
                            "foundational" && (
                            <button
                              className="btn-two tran3s "
                              style={{ marginLeft: "30px" }}
                              onClick={handleGetDetails}
                            >
                              Get Details
                            </button>
                          )}
                      </div>
                    </>
                  )}

                  {/* <div className="position-relative">
                    <h3>Company Reviews</h3>
                    <CompanyReviews />                  
                  </div> */}

                  <div className="share-option mt-60">
                    <ul className="style-none d-flex align-items-center">
                      <li className="fw-500 me-2">Share: </li>

                      <li>
                        <a
                          target="_blank"
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${URL}`}
                        >
                          <i className="bi bi-linkedin"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          target="_blank"
                          href={`https://twitter.com/intent/tweet?text=${""}&url=${URL}`}
                        >
                          <i className="bi bi-twitter"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* video modal start */}
      {/* <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"-6ZbrfSRWKc"}
      /> */}
      {/* video modal end */}
    </>
  );
};

export default CompanyDetailsArea;
