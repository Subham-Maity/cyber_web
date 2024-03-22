"use client";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";
// import { getJobPostsForEmployer } from "@/redux/features/jobPost/api";
import { addNotificationToCandidate } from "@/redux/features/employer/api";
import { getJobPostsForEmployer } from "@/redux/features/jobPost/api";

const RequestModal = ({ candidateId }: { candidateId: string }) => {
  const dispatch = useDispatch();
  const { currUser } = useAppSelector((state) => state.persistedReducer.user);
  const { socket } = useAppSelector((state) => state.global);

  const {jobPostsForEmployer:jobs} = useAppSelector(
    (state) => state.jobPost
  );
  const filterState = useAppSelector((state) => state.emplyerJobPostFilter);

  const handleClick = (jobId: string, JobTitle: string) => {
    if (!currUser) return;
    const bodyObj = {
      candidateId: candidateId,
      employerId: currUser,
      redirectUrl: `/job-details-v1/${jobId}`,
      message: `You have request for ${JobTitle}`,
    };
    addNotificationToCandidate(dispatch, bodyObj, socket);
  };

  useEffect(() => {
    if (currUser) getJobPostsForEmployer(dispatch, currUser,1,{...filterState,status:"active"});
  }, []);

  return (
    <div
      className="modal fade"
      id="requestModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container">
          <div className="user-data-form modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="text-center mb-3">
              <h3>Select Job</h3>
            </div>

            <div className="form-wrapper m-auto">
              <div>
                {jobs?.map((job, index) => (
                  <button
                    onClick={() => handleClick(job._id, job.title)}
                    type="button"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    className="request-btn d-flex w-100  flex-column  rounded gap-1 mb-3 border border-black p-3 "
                  >
                    <div className="job-name fw-500">{job.title}</div>
                    <div className="info1 float-start text-wrap  ">
                      {job.primarySkills.join(" ,")}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
