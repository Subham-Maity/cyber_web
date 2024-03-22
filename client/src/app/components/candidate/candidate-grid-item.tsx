import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ICandidate } from "@/types/user-type";
import job_img_1 from "@/assets/images/logo/media_22.png";
import { removeCandidate, saveCandidate } from "@/redux/features/employer/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import LoginModal from "../common/popup/login-modal";

// item.favorite;

const CandidateGridItem = ({
  item,
  style_2 = false,
}: {
  item: ICandidate;
  style_2?: boolean;
}) => {
  const { page, loading } = useAppSelector((state) => state.employer);
  const { isAuthenticated, currUser,userRole } = useAppSelector(
    (state) => state.persistedReducer.user
  );

  const dispatch = useAppDispatch();
  const isActive = (isAuthenticated && item?.isSaved) || false;
  const handleSaveCandidate = (candidateId: string) => {
    if (!isActive) {
      saveCandidate(dispatch, {
        candidateId,
        employerId: currUser,
        page: page,
      });
    } else {
      removeCandidate(dispatch, {
        candidateId,
        employerId: currUser,
        page: page,
      });
    }
  };
  const handleSubscribePopup = () => {};
  return (
    <>
      <div
        className={`candidate-profile-card ${
          item.isSaved ? "favourite" : ""
        } text-center ${style_2 ? "border-0" : ""} grid-layout mb-25`}
      >
        <button
          type="button"
          disabled={loading}
          onClick={() => handleSaveCandidate(item._id)}
          style={{display:userRole==="admin"?"none":"block"}}
          className={`save-btn tran3s ${item.isSaved ? "fav-btn" : ""}`}
          title={`${item.isSaved ? "Remove Candidate" : "Save candidate"}`}
        >
          {item.isSaved ? (
            <i className="bi bi-heart-fill"></i>
          ) : (
            <i className="bi bi-heart"></i>
          )}
        </button>
        <div className="cadidate-avatar position-relative d-block m-auto mb-2">
          {/* <Link href="/candidate-profile-v1" className="rounded-circle"> */}
            <Image
              src={item?.avatar}
              alt="image"
              className="lazy-img rounded-circle "
              height={80}
              width={80}
            />
          {/* </Link> */}
        </div>
        <h4 className="candidate-name mt-15 mb-0">
          <Link href={`/candidate-profile-v1/${item._id}`} className="tran3s">
            {item?.firstName}
          </Link>
        </h4>
        <div className="candidate-post">{"Male"}</div>
        <ul className="cadidate-skills style-none d-flex flex-wrap align-items-center justify-content-center justify-content-md-between pt-30 sm-pt-20 pb-10">
          {item.skills.slice(0, 3).map((s, i) => (
            <li key={i}>{s}</li>
          ))}
          {item.skills.length > 3 && (
            <li className="more">
              {item.skills.length - item.skills.slice(0, 3).length}+
            </li>
          )}
        </ul>
        <div className="row gx-1">
          <div className="col-md-6">
            <div className="candidate-info mt-10">
              <span>Salary</span>
              <div>
              {item?.expectedSalary?.currency?.symbol}{item?.expectedSalary?.min}-{item?.expectedSalary?.max}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="candidate-info mt-10">
              <span>Location</span>
              <div>
                {item.location?.city}, {item.location?.country}
              </div>
            </div>
          </div>
        </div>
        <div className="row gx-2 pt-25 sm-pt-10">
          <div className="col-md-6">
            {isAuthenticated ? (
              <Link
                href={`/candidate-profile-v1/${item._id}`}
                className="profile-btn tran3s w-100 mt-5"
              >
                View Profile
              </Link>
            ) : (
              <button
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                type="button"
                className="apply-btn text-center tran3s"
                onClick={handleSubscribePopup}
              >
                View Profile
              </button>
            )}
          </div>
          <div className="col-md-6">
            {isAuthenticated ? (
              <Link
                href={`/candidate-profile-v1/${item._id}`}
                className="msg-btn tran3s w-100 mt-5"
              >
                Message
              </Link>
            ) : (
              <button
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
                type="button"
                className="apply-btn text-center tran3s"
                onClick={handleSubscribePopup}
              >
                Message
              </button>
            )}
          </div>
        </div>
      </div>
      {/* login modal start */}
      <LoginModal />
      {/* login modal end */}
    </>
  );
};

export default CandidateGridItem;
