import React from "react";
import Image from "next/image";
import Link from "next/link";
import team_img_1 from "@/assets/images/assets/img_42.png";
import {
  removeSavedCompany,
  saveCompany,
} from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ICompany } from "@/types/company";
import LoginModal from "../common/popup/login-modal";
import { useRouter } from "next/navigation";
import { notifyWarn } from "@/utils/toast";
// item.isFav;
import ProfileCompleteModal from "../model/completeProfile";
import { setProfileCompleteModel, setSubscriptionModel } from "@/redux/features/model/slice";
import SubscriptionModal from "../model/subscriptionModel";

const CompanyListItem = ({ item }: { item: ICompany }) => {
  const { savedCompanyPage, loading, totalSavedCompany } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const { isAuthenticated, currUser, userRole } = useAppSelector(
    (state) => state.persistedReducer.user
  );
  const { currAdmin } = useAppSelector((state) => state.admin);
  const { profileCompleteModel, subscriptionModel } = useAppSelector(
    (state) => state.model
  );
  const { currCandidate } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );

  const Router = useRouter();

  const dispatch = useAppDispatch();
  const isActive = (isAuthenticated && item?.isSaved) || false;
  const handleSaveCompany = (companyId: string) => {
    if (!isActive) {
      if (currCandidate?.isProfileCompleted === true) {
        if (totalSavedCompany >= 10) {
          notifyWarn("You can save upto 10 companies");
          return;
        }
        saveCompany(dispatch, {
          companyId,
          candidateId: currUser,
          page: savedCompanyPage,
        });
      } else {
        dispatch(setProfileCompleteModel(true));
      }
    } else {
      removeSavedCompany(dispatch, {
        companyId,
        candidateId: currUser,
        page: savedCompanyPage,
      });
    }
  };
  const handleViewClick = () => {
    if (currCandidate?.isProfileCompleted === true || currAdmin) {
      Router.push(`/company-details/${item._id}`);
    } else {
      dispatch(setProfileCompleteModel(true));
    }
  };
  const handleGetDetails = () => {
    // getCompanyDetails(dispatch, id);

    dispatch(setSubscriptionModel(true));
    // setModalShown(true);
  };
  const handleSubscribePopup = () => {};
  return (
    <>
      <div
        className={`company-list-layout ${isActive ? "favourite" : ""} mb-20`}
      >
        {isAuthenticated ? (
          <div className="row justify-content-between align-items-center ">
            <div className="col-xl-5">
              <div className="d-flex align-items-xl-center">
                <div
                  onClick={() => handleViewClick()}
                  className="company-logo rounded-circle cursor-pointer"
                >
                  <Image
                    // src={item.logo}
                    src={item.logo ? item.logo : team_img_1}
                    width={70}
                    height={70}
                    alt="image"
                    className="lazy-img rounded-circle w-100 "
                    // style={{ height: "auto" }}
                  />
                </div>
                <div className="company-data">
                  <h5 className="m0">
                    <div
                      onClick={() => handleViewClick()}
                      className="company-name tran3s cursor-pointer"
                    >
                      {item.name}
                    </div>
                  </h5>
                  <p>
                    {item.location?.[0].city},{item.location?.[0].country}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-8">
              <div className="d-flex align-items-center ps-xxl-5 lg-mt-20">
                {/* <div className="d-flex align-items-center">
              <Image
                src={team_img_1}
                alt="team_img"
                className="lazy-img rounded-circle team-img"
              />
              <Image
                src={team_img_2}
                alt="team_img"
                className="lazy-img rounded-circle team-img"
              />
              <Image
                src={team_img_3}
                alt="team_img"
                className="lazy-img rounded-circle team-img"
              />
              <div className="team-text">
                <span className="text-md fw-500 text-dark d-block">14+ </span>{" "}
                Team Size
              </div>
            </div> */}
              </div>
            </div>
            <div className="col-xl-3 col-md-4">
              <div className="btn-group d-flex align-items-center justify-content-md-end lg-mt-20">
                <div
                  className="open-job-btn text-center fw-500 tran3s me-2 cursor-pointer"
                  onClick={() => handleViewClick()}
                >
                  {/* {item.vacancy} open job */}
                  {item.jobOpenings} open job
                </div>
                {userRole==="candidate" && currCandidate?.subscription.offering.isSaveApplicable === true ? 
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleSaveCompany(item._id)}
                  className={`save-btn text-center rounded-circle tran3s me-3 cursor-pointer ${
                    isActive ? "active" : ""
                  }`}
                  title={`${isActive ? "Remove Company" : "Save Company"}`}
                  style={{ display: currCandidate ? "block" : "none" }}
                >
                  <i className="bi bi-bookmark-dash"></i>
                </button>
                :
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleGetDetails}
                  // onClick={() => handleSaveCompany(item._id)}
                  className={`save-btn text-center rounded-circle tran3s me-3 cursor-pointer ${
                    isActive ? "active" : ""
                  }`}
                  title={`${isActive ? "Remove Company" : "Save Company"}`}
                  style={{ display: currCandidate ? "block" : "none" }}
                >
                  <i className="bi bi-bookmark-dash"></i>
                </button>
                }
              </div>
            </div>
          </div>
        ) : (
          <div
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
            // type="button"
            // className="apply-btn text-center tran3s"
            onClick={handleSubscribePopup}
          >
            <div className="row justify-content-between align-items-center ">
              <div className="col-xl-5">
                <div className="d-flex align-items-xl-center">
                  <div
                    // onClick = {() => handleViewClick()}
                    className="company-logo rounded-circle cursor-pointer"
                  >
                    <Image
                      // src={item.logo}
                      src={item.logo ? item.logo : team_img_1}
                      width={70}
                      height={70}
                      alt="image"
                      className="lazy-img rounded-circle w-100 "
                      // style={{ height: "auto" }}
                    />
                  </div>
                  <div className="company-data">
                    <h5 className="m0">
                      <div
                        // onClick = {() => handleViewClick()}
                        className="company-name tran3s cursor-pointer"
                      >
                        {item.name}
                      </div>
                    </h5>
                    <p>
                      {item.location?.[0].city} {item.location?.[0].country}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-8">
                <div className="d-flex align-items-center ps-xxl-5 lg-mt-20">
                  {/* <div className="d-flex align-items-center">
              <Image
                src={team_img_1}
                alt="team_img"
                className="lazy-img rounded-circle team-img"
              />
              <Image
                src={team_img_2}
                alt="team_img"
                className="lazy-img rounded-circle team-img"
              />
              <Image
                src={team_img_3}
                alt="team_img"
                className="lazy-img rounded-circle team-img"
              />
              <div className="team-text">
                <span className="text-md fw-500 text-dark d-block">14+ </span>{" "}
                Team Size
              </div>
            </div> */}
                </div>
              </div>
              <div className="col-xl-3 col-md-4">
                <div className="btn-group d-flex align-items-center justify-content-md-end lg-mt-20">
                  <div className="open-job-btn text-center fw-500 tran3s me-2 cursor-pointer">
                    {/* {item.vacancy} open job */}
                    {item.jobOpenings} open job
                  </div>

                  <button
                    type="button"
                    disabled={loading}
                    // onClick={() => handleSaveCompany(item._id)}
                    className={`save-btn text-center rounded-circle tran3s me-3 cursor-pointer ${
                      isActive ? "active" : ""
                    }`}
                    title={`${isActive ? "Remove Company" : "Save Company"}`}
                  >
                    <i className="bi bi-bookmark-dash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* login modal start */}
      <LoginModal />
      {profileCompleteModel ? <ProfileCompleteModal /> : null}
      {subscriptionModel && <SubscriptionModal />}
      {/* login modal end */}
    </>
  );
};

export default CompanyListItem;
