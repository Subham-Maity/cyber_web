"use client";
import job_img_1 from "@/assets/images/logo/media_22.png";
import { removeSavedJob, saveJob } from "@/redux/features/candidate/api";
import { setProfileCompleteModel } from "@/redux/features/model/slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import type { IJobPost } from "@/types/jobPost-type";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RelatedGridItem = ({
  item,
  style_2 = true,
}: {
  item: IJobPost;
  style_2?: boolean;
}) => {
  const { savedJobsPage, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);

  const { currCandidate } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isActive = item?.isSaved || false;
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
    if (currCandidate?.isProfileCompleted === true) {
      // registerJobPostView(dispatch, id);
      router.push(`/job-details-v1/${id}`);
    } else {
      // notifyWarn("Please complete your profile.")
      dispatch(setProfileCompleteModel(true));
    }
  };
  const handleSubscribePopup = () => {};
  return (
    <>
      <div
        className={`job-list-two ${
          style_2 ? "style-two" : ""
        } position-relative`}
      >
        {/* <div
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
            style={{ height: "auto", width: "auto" }}
            className="lazy-img m-auto"
          />
        </div> */}
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
        <div className="d-flex gap-2 mt-40 mb-40  flex-wrap cursor-pointer">
          {item?.jobType?.map((val, index) => (
            <div
              onClick={() => handleViewClick(item._id)}
              className={`job-duration fw-500 ${
                val == "part-time" ? "part-time" : ""
              }`}
            >
              {val}
            </div>
          ))}
        </div>
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
              ${`${item.salary.minimum}-${item.salary.maximum}`} PA
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
      </div>
    </>
  );
};

export default RelatedGridItem;
