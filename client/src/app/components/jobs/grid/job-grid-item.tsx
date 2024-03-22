"use client";
import job_img_1 from "@/assets/images/logo/media_22.png";
import { removeSavedJob, saveJob } from "@/redux/features/candidate/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import type { IJobPost } from "@/types/jobPost-type";
import Image from "next/image";
import Link from "next/link";
import LoginModal from "../../common/popup/login-modal";
import { registerJobPostView } from "@/redux/features/jobPost/api";
import { useRouter } from "next/navigation";
import { notifyError, notifyWarn } from "@/utils/toast";
import { setProfileCompleteModel, setSubscriptionModel } from "@/redux/features/model/slice";
import ProfileCompleteModal from "../../model/completeProfile";
import { ICompany } from "@/types/company-type";
import SubscriptionModal from "../../model/subscriptionModel";

const JobGridItem = ({
  item,
  style_2 = true,
}: {
  item: IJobPost;
  style_2?: boolean;
}) => {
  const { savedJobsPage, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const { isAuthenticated, currUser } = useAppSelector(
    (state) => state.persistedReducer.user
  );
  const { profileCompleteModel, subscriptionModel } = useAppSelector(
    (state) => state.model
  );
  const { currCandidate } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const { currAdmin } = useAppSelector((state) => state.admin);
  const {userRole} = useAppSelector((state) => state.persistedReducer.user);
  const router = useRouter();
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
        // notifyWarn("Please complete your profile.")
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
      // notifyWarn("Please complete your profile.")
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
        className={`job-list-two ${
          style_2 ? "style-two" : ""
        } position-relative`}
      >
        {isAuthenticated ? (
          <div
            className="logo cursor-pointer"
            onClick={() => handleViewClick(item._id)}
          >
            <Image
              src={
                typeof item.companyId !== "string" && item.companyId.logo
                  ? item.companyId.logo
                  : job_img_1
              }
              width={50}
              height={50}
              alt="logo"
              // style={{ height: "auto", width: "auto" }}
              className="lazy-img m-auto rounded-circle"
            />
          </div>
        ) : (
          <button
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
            type="button"
            //  className="apply-btn text-center tran3s"
            onClick={handleSubscribePopup}
          >
            <div className="logo" onClick={() => handleViewClick(item._id)}>
              <Image
                src={
                  typeof item.companyId !== "string" && item.companyId.logo
                    ? item.companyId.logo
                    : job_img_1
                }
                width={50}
                height={50}
                alt="logo"
                // style={{ height: "auto", width: "auto" }}
                className="lazy-img m-auto rounded-circle"
              />
            </div>
          </button>
        )}
        {isAuthenticated ? (
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSaveJob(item._id)}
            className={`save-btn text-center rounded-circle tran3s cursor-pointer ${
              isActive ? "active" : ""
            }`}
            title={`${isActive ? "Remove Job" : "Save Job"}`}
            style={{display:currCandidate?"block":"none"}}
          >
            <i className="bi bi-bookmark-dash"></i>
          </button>
        ) : (
          <button
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
          type="button"
          //  className="apply-btn text-center tran3s"
          onClick={handleSubscribePopup}
          >
         {userRole === "candidate" &&
                currCandidate?.subscription.offering.isSaveApplicable ===
                  true ? 
              <button
                type="button"
                disabled={loading}
                onClick={() => handleSaveJob(item._id)}
                className={`save-btn text-center rounded-circle tran3s cursor-pointer ${
                  isActive ? "active" : ""
                }`}
                // style={{display:userRole==="admin"?"none":"block"}}
                // title={`${isActive ? "Remove Job" : "Save Job"}`}
              >
                <i className="bi bi-bookmark-dash"></i>
              </button>
              :
              <button
                type="button"
                disabled={loading}
                onClick={handleGetDetails}
                className={`save-btn text-center rounded-circle tran3s cursor-pointer ${
                  isActive ? "active" : ""
                }`}
                // style={{display:userRole==="admin"?"none":"block"}}
                // title={`${isActive ? "Remove Job" : "Save Job"}`}
              >
                <i className="bi bi-bookmark-dash"></i>
              </button>
              }

                
              </button>
              )}
        <div className="d-flex gap-2 mt-40 mb-40  flex-wrap cursor-pointer">
          {item?.jobType?.map((val, index) =>
            isAuthenticated ? (
              <div
                onClick={() => handleViewClick(item._id)}
                className={`job-duration fw-500 ${
                  val == "part-time" ? "part-time" : ""
                }`}
              >
                {val}
              </div>
            ) : (
              <button
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                type="button"
                //  className="apply-btn text-center tran3s"
                onClick={handleSubscribePopup}
              >
                <div
                  //  onClick={() => handleViewClick(item._id)}
                  className={`job-duration fw-500 ${
                    val == "part-time" ? "part-time" : ""
                  }`}
                >
                  {val}
                </div>
              </button>
            )
          )}
        </div>
        {isAuthenticated ? (
          <div className="cursor-pointer">
            <div>
              <div
                onClick={() => handleViewClick(item._id)}
                className="title fw-500 tran3s"
              >
                {`${item.title?.slice(0, 20)} ${
                  item.title?.length > 20 ? ".." : ""
                }(${item.jobCode})`}
              </div>
            </div>
            <div className="job-salary">
              <span className="fw-500 text-dark">
                {item.salary?.currency?.symbol}
                {item.salary.minimum}-{item.salary.maximum}{" "}
                {item?.salary?.period}
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-auto">
              <div className="job-location">
                <div onClick={() => handleViewClick(item._id)}>
                  {item.location?.join(",")}
                </div>
              </div>

              <div
                // href={`/job-details-v1/${item._id}`}
                // href={"/dashboard/candidate-dashboard/membership"}
                className="apply-btn text-center tran3s"
                onClick={() => handleViewClick(item._id)}
              >
                View
              </div>
            </div>
          </div>
        ) : (
          <button
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
            type="button"
            // className="apply-btn text-center tran3s"
            onClick={handleSubscribePopup}
          >
            <div>
              <div
                // onClick={() => handleViewClick(item._id)}
                className="title fw-500 tran3s"
              >
                {item.title}
                
              </div>
              <div
              className="title fw-500 tran3s">
              {item.jobCode}
              </div>
            </div>
            <div className="job-salary">
              <span className="fw-500 text-dark">
                ${`${item.salary.minimum}-${item.salary.maximum}`} PA
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-auto">
              <div className="job-location">
                <div
                // onClick={() => handleViewClick(item._id)}
                >
                  {item.location?.join(",")}
                </div>
              </div>

              <div
                // href={`/job-details-v1/${item._id}`}
                // href={"/dashboard/candidate-dashboard/membership"}
                className="apply-btn text-center tran3s"
                // onClick={() => handleViewClick(item._id)}
              >
                View
              </div>
            </div>
          </button>
        )}
      </div>
      {/* login modal start */}
      <LoginModal />
      {profileCompleteModel ? <ProfileCompleteModal /> : null}
      {/* login modal end */}
      {subscriptionModel && <SubscriptionModal /> }
    </>
  );
};

export default JobGridItem;
