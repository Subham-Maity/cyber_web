"use client";
import LoginModal from "@/app/components/common/popup/login-modal";
import job_img_1 from "@/assets/images/logo/media_22.png";
import { removeSavedJob, saveJob } from "@/redux/features/candidate/api";
import { registerJobPostView } from "@/redux/features/jobPost/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IJobPost } from "@/types/jobPost-type";
import { notifyWarn } from "@/utils/toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfileCompleteModal from "../../model/completeProfile";
import { setProfileCompleteModel } from "@/redux/features/model/slice";
import { setSubscriptionModel } from "@/redux/features/model/slice";
import SubscriptionModal from "../../model/subscriptionModel";

const ListItemTwo = ({ item }: { item: IJobPost }) => {
  const { savedJobsPage, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const { isAuthenticated, currUser, userRole } = useAppSelector(
    (state) => state.persistedReducer.user
  );
  const { currAdmin } = useAppSelector((state) => state.admin);
  const router = useRouter();
  const { currCandidate } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const { profileCompleteModel, subscriptionModel } = useAppSelector(
    (state) => state.model
  );
  const dispatch = useAppDispatch();
  const isActive = (isAuthenticated && item?.isSaved) || false;
  const handleSaveJob = (jobPostId: string) => {
    if (!isActive) {
      if (currCandidate?.isProfileCompleted === true) {
        saveJob(dispatch, {
          jobPostId,
          candidateId: currUser,
          page: savedJobsPage,
        });
      } else {
        dispatch(setProfileCompleteModel(true));
      }
    } else {
      removeSavedJob(dispatch, {
        jobPostId,
        candidateId: currUser,
        page: savedJobsPage,
      });
    }
  };
  const handleViewClick = (id: string) => {
    if (currCandidate?.isProfileCompleted === true || currAdmin) {
      // registerJobPostView(dispatch, id);
      router.push(`/job-details-v1/${id}`);
    } else {
      dispatch(setProfileCompleteModel(true));
      // dispatch(setSubscriptionModel(true));
      // notifyWarn("Please complete your profile.");
    }
  };
  const handleGetDetails = () => {
    // getCompanyDetails(dispatch, id);
    // console.log("Hello")
    dispatch(setSubscriptionModel(true));
    // setModalShown(true);
  };
  const handleSubscribePopup = () => {};
  return (
    <>
      <div className="job-list-one style-two position-relative border-style mb-20">
        {isAuthenticated ? (
          <div className="row justify-content-between align-items-center cursor-pointer">
            <div className="col-md-5">
              <div className="job-title d-flex align-items-center">
                <div className="logo" onClick={() => handleViewClick(item._id)}>
                  <Image
                    src={
                      typeof item.companyId !== "string" && item.companyId.logo
                        ? item.companyId.logo
                        : job_img_1
                    }
                    width={60}
                    height={60}
                    alt="logo"
                    className="lazy-img rounded-circle w-100"
                    // style={{ height: "auto" }}
                  />
                </div>
                <div className="split-box1">
                  <div
                    onClick={() => handleViewClick(item._id)}
                    className="job-duration fw-500"
                  >
                    {item.jobType?.join(" ,")}
                  </div>
                  <div
                    onClick={() => handleViewClick(item._id)}
                    className="title fw-500 tran3s"
                  >
                    {`${item.title?.slice(0, 20)} ${
                      item.title?.length > 20 ? ".." : ""
                    }(${item.jobCode})`}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="job-location">
                <div onClick={() => handleViewClick(item._id)}>
                  {item.location?.join(",")}
                </div>
              </div>
              <div className="job-salary">
                <span className="fw-500 text-dark">
                  {item.salary?.currency?.symbol}
                  {item.salary.minimum}-{item.salary.maximum}{" "}
                  {item?.salary?.period}
                </span>{" "}
                /{item?.preferredExperience?.[0]}
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="btn-group d-flex align-items-center justify-content-sm-end xs-mt-20">
              {userRole === "candidate" &&
                currCandidate?.subscription.offering.isSaveApplicable ===
                  true ? 
                  <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleSaveJob(item._id)}
                  className={`save-btn text-center rounded-circle tran3s me-3 cursor-pointer ${
                    isActive ? "active" : ""
                  }`}
                  style={{display:currCandidate?"block":"none"}}
                  title={`${isActive ? "Remove Job" : "Save Job"}`}
                >
                  <i className="bi bi-bookmark-dash"></i>
                </button>
                :
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleGetDetails}
                  className={`save-btn text-center rounded-circle tran3s me-3 cursor-pointer ${
                    isActive ? "active" : ""
                  }`}
                  style={{display:currCandidate?"block":"none"}}
                  title={`${isActive ? "Remove Job" : "Save Job"}`}
                >
                  <i className="bi bi-bookmark-dash"></i>
                </button>
                }
                <div
                  onClick={() => handleViewClick(item._id)}
                  // href={"/dashboard/candidate-dashboard/membership"}
                  className="apply-btn text-center tran3s"
                  // onClick={()=>handleViewClick(item._id)}
                >
                  View
                </div>
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
            <div className="row justify-content-between align-items-center cursor-pointer">
              <div className="col-md-5">
                <div className="job-title d-flex align-items-center">
                  <div
                    className="logo"
                    // onClick={() => handleViewClick(item._id)}
                  >
                    <Image
                      src={
                        typeof item.companyId !== "string" &&
                        item.companyId.logo
                          ? item.companyId.logo
                          : job_img_1
                      }
                      width={60}
                      height={60}
                      alt="logo"
                      className="lazy-img rounded-circle w-100"
                      // style={{ height: "auto" }}
                    />
                  </div>
                  <div className="split-box1">
                    <div
                      // onClick={() => handleViewClick(item._id)}
                      className="job-duration fw-500"
                    >
                      {item.jobType?.join(" ,")}
                    </div>
                    <div
                      // onClick={() => handleViewClick(item._id)}
                      className="title fw-500 tran3s"
                    >
                      {`${item.title?.slice(0, 20)} ${
                      item.title?.length > 20 ? ".." : ""
                    }(${item.jobCode})`}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="job-location">
                  <div
                  // onClick={() => handleViewClick(item._id)}
                  >
                    {item.location?.join(",")}
                  </div>
                </div>
                <div className="job-salary">
                  <span className="fw-500 text-dark">
                    ${item.salary.minimum}-{item.salary.maximum} PA
                  </span>{" "}
                  /{item?.preferredExperience?.join(",")}
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="btn-group d-flex align-items-center justify-content-sm-end xs-mt-20">
              
                  <button
                    type="button"
                    disabled={loading}
                    // onClick={() => handleSaveJob(item._id)}
                    className={`save-btn text-center rounded-circle tran3s me-3 cursor-pointer ${
                      isActive ? "active" : ""
                    }`}
                    
                    title={`${isActive ? "Remove Job" : "Save Job"}`}
                    >
                      <i className="bi bi-bookmark-dash"></i>
                    </button>
                 

                  <div
                    // onClick={() => handleViewClick(item._id)}
                    // href={"/dashboard/candidate-dashboard/membership"}
                    className="apply-btn text-center tran3s"
                    // onClick={()=>handleViewClick(item._id)}
                  >
                    View
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* login modal start */}
      <LoginModal />
      {profileCompleteModel ? <ProfileCompleteModal /> : null}
      {subscriptionModel && <SubscriptionModal /> }
      {/* login modal end */}
    </>
  );
};

export default ListItemTwo;
