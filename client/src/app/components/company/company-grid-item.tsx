import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ICompany } from "@/types/company";
import {
  removeSavedCompany,
  saveCompany,
} from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import team_img_1 from "@/assets/images/assets/img_42.png";
import { useRouter } from "next/navigation";
import { notifyWarn } from "@/utils/toast";
// item.isFav
import LoginModal from "../common/popup/login-modal";
import ProfileCompleteModal from "../model/completeProfile";
import {
  setProfileCompleteModel,
  setSubscriptionModel,
} from "@/redux/features/model/slice";
import SubscriptionModal from "../model/subscriptionModel";

const CompanyGridItem = ({ item }: { item: ICompany }) => {
  const { savedCompanyPage, loading } = useAppSelector(
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
        className={`company-grid-layout ${isActive ? "favourite" : ""} mb-30`}
      >
        {isAuthenticated ? (
          <>
            <div
              // href="/company-details"
              onClick={() => handleViewClick()}
              className="company-logo me-auto ms-auto rounded-circle cursor-pointer"
            >
              <Image
                src={item.logo ? item.logo : team_img_1}
                width={85}
                height={85}
                alt="image"
                className="lazy-img rounded-circle w-100"
                // style={{ height: "auto", borderRadius: "50%"}}
              />
            </div>
            <h5 className="text-center">
              <div
                onClick={() => handleViewClick()}
                className="company-name tran3s cursor-pointer"
              >
                {item.name}
              </div>
            </h5>
            <p className="text-center mb-auto">
              {item.location?.[0]?.city}, {item.location?.[0]?.country}
            </p>
            {currCandidate ? (
              <div className="align-items-center btn-group justify-content-md-end bottom-line d-flex">
                {/* <Link href="/company-details">{item.benefits.length} Vacancy</Link> */}

                <div
                  // href="#"
                  onClick={() => handleViewClick()}
                  className="open-job-btn text-center fw-500 tran3s me-2 cursor-pointer "
                >
                  {/* {item.vacancy} open job */}
                  {item.jobOpenings} open job
                </div>
                {/* <Link href="/company-details">
          <i className="bi bi-bookmark-dash"></i> Save
        </Link> */}
                {userRole === "candidate" &&
                currCandidate?.subscription.offering.isSaveApplicable ===
                  true ? (
                  <button
                    type="button"
                    // disabled={loading}
                    onClick={() => handleSaveCompany(item._id)}
                    className={` cursor-pointer ${isActive ? "active" : ""}`}
                  >
                    <i className="bi bi-bookmark-dash"></i>
                  </button>
                ) : (
                  <button
                    type="button"
                    // disabled={loading}
                    onClick={handleGetDetails}
                    className={` cursor-pointer ${isActive ? "active" : ""}`}
                  >
                    <i className="bi bi-bookmark-dash"></i>
                  </button>
                )}
              </div>
            ) : (
              <div
                className="align-items-center btn-group justify-content-center bottom-line d-flex"
                style={{ paddingTop: "20px", paddingBottom: "20px" }}
              >
                <div
                  // href="#"
                  onClick={() => handleViewClick()}
                  className="open-job-btn text-center fw-500 tran3s me-2 cursor-pointer "
                >
                  {/* {item.vacancy} open job */}
                  {item.jobOpenings} open job
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
            type="button"
            // className="apply-btn text-center tran3s"
            onClick={handleSubscribePopup}
          >
            <>
              <div
                // href="/company-details"
                // onClick={() => handleViewClick()}
                className="company-logo me-auto ms-auto rounded-circle cursor-pointer"
              >
                <Image
                  src={item.logo ? item.logo : team_img_1}
                  width={85}
                  height={85}
                  alt="image"
                  className="lazy-img rounded-circle w-100"
                  // style={{ height: "auto", borderRadius: "50%"}}
                />
              </div>
              <h5 className="text-center">
                <div
                  // onClick={() => handleViewClick()}
                  className="company-name tran3s cursor-pointer"
                >
                  {item.name}
                </div>
              </h5>
              <p className="text-center mb-auto">
                {item.location?.[0]?.city}, {item.location?.[0]?.country}
              </p>
              <div className="bottom-line d-flex align-items-center btn-group justify-content-md-end">
                {/* <Link href="/company-details">{item.benefits.length} Vacancy</Link> */}
                <div
                  // href="#"
                  // onClick={() => handleViewClick()}
                  className="open-job-btn text-center fw-500 tran3s me-2 cursor-pointer"
                >
                  {/* {item.vacancy} open job */}
                  {item.jobOpenings} open job
                </div>

                {/* <Link href="/company-details">
          <i className="bi bi-bookmark-dash"></i> Save
        </Link> */}
                <button
                  type="button"
                  // disabled={loading}
                  // onClick={() => handleSaveCompany(item._id)}
                  className={` cursor-pointer ${isActive ? "active" : ""}`}
                  title={`${isActive ? "Remove Company" : "Save Company"}`}
                >
                  <i className="bi bi-bookmark-dash"></i>
                </button>
              </div>
            </>
          </button>
        )}
      </div>
      {/* login modal start */}
      <LoginModal />
      {profileCompleteModel ? <ProfileCompleteModal /> : null}
      {/* login modal end */}
      {subscriptionModel && <SubscriptionModal />}
    </>
  );
};

export default CompanyGridItem;
