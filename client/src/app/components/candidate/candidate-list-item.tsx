import React from "react";
import { ICandidate } from "@/types/user-type";
import Image from "next/image";
import Link from "next/link";
import job_img_1 from "@/assets/images/logo/media_22.png";
import { removeCandidate, saveCandidate } from "@/redux/features/employer/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import LoginModal from "../common/popup/login-modal";

const CandidateListItem = ({
  item,
  style_2 = false,
}: {
  item: ICandidate;
  style_2?: boolean;
}) => {
  const { page, loading } = useAppSelector((state) => state.employer);
  const { isAuthenticated, currUser } = useAppSelector(
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
        className={`candidate-profile-card ${item.isSaved ? "favourite" : ""} ${
          style_2 ? "border-0" : ""
        } list-layout mb-25`}
      >
        <div className="d-flex">
          <div className="cadidate-avatar position-relative d-block me-auto ms-auto">
            {/* <Link href="/candidate-profile-v2" className="rounded-circle"> */}
              <Image
                src={item?.avatar}
                alt="image"
                height={80}
                width={80}
                className="lazy-img rounded-circle"
              />
            {/* </Link> */}
          </div>
          <div className="right-side">
            <div className="row gx-1 align-items-center">
              <div className="col-xl-3">
                <div className="position-relative">
                  <h4 className="candidate-name mb-0">
                    <Link href={`/candidate-profile-v1/${item._id}`} className="tran3s">
                      {item.firstName}
                    </Link>
                  </h4>
                  {/* <div className="candidate-post">{item.title}</div> */}
                  <ul className="cadidate-skills style-none d-flex align-items-center">
                    {item.skills.slice(0, 3).map((s, i) => (
                      <li key={i}>{s.split(" ")[0]}</li>
                    ))}
                    {item.skills.length > 3 && (
                      <li className="more">
                        {item.skills.length - item.skills.slice(0, 3).length}+
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-sm-6">
                <div className="candidate-info">
                  <span>Salary</span>
                  <div>{item?.expectedSalary?.currency?.symbol}{item?.expectedSalary?.min}-{item?.expectedSalary?.max}</div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4 col-sm-6">
                <div className="candidate-info">
                  <span>Location</span>
                  <div>
                    {item.location?.city},{item.location?.country}
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-4">
                <div className="d-flex justify-content-lg-end">
                  <button
                    onClick={() => handleSaveCandidate(item._id)}
                    className={`save-btn text-center rounded-circle tran3s mt-10`}
                  >
                    {isActive ? (
                      <i className="bi bi-heart-fill"></i>
                    ) : (
                      <i className="bi bi-heart"></i>
                    )}
                  </button>
                  {isAuthenticated ? (
                    <Link
                      href={`/candidate-profile-v1/${item._id}`}
                      className="profile-btn tran3s ms-md-2 mt-10 sm-mt-20"
                    >
                      View Profile
                    </Link>
                  ) : (
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                      type="button"
                      className="profile-btn tran3s ms-md-2 mt-10 sm-mt-20"
                      onClick={handleSubscribePopup}
                    >
                      View Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* login modal start */}
      <LoginModal />
      {/* login modal end */}
    </>
  );
};

export default CandidateListItem;
