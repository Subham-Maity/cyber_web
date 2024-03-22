"use client";
import React from "react";
import DropZone from "@/layouts/dropZone";
import { notifyError } from "@/utils/toast";
import { deleteResume, getCurrCandidate, uploadResume } from "@/redux/features/candidate/api";
import {
  setResumeFile,
  setResumeUploadProgress,
} from "@/redux/features/candidate/dashboardSlice";

import { useAppDispatch, useAppSelector } from "@/redux/hook";

const UploadResume = ({
  resume,
}: {
  resume: { s3Key: string; name: string; _id: string }[];
}) => {
  const { resumeFile: file, resumeUploadProgress } = useAppSelector(
    (s) => s.candidate.candidateDashboard
  );
  const { currCandidate, loading } = useAppSelector(
    (store) => store.candidate.candidateDashboard
  );
  const {currUser} = useAppSelector((state) => state.persistedReducer.user) 
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    if (!currCandidate) {
      notifyError("please Login to upload your resume.");
      return;
    }
    if (resume.length == 3) {
      notifyError(
        "You can upload only 3 resumes, try to delete one of your resume and try again."
      );
      return;
    }
    const supportedFormat = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!file || !supportedFormat.includes(file.type)) {
      notifyError("Please upload Your resume in supported format.");
      return;
    }
    const metaData = {
      name: file.name,
      type: file.type,
      candidateId: currCandidate._id,
      candidateName: currCandidate.firstName + " " + currCandidate.lastName,
    };
    await uploadResume(dispatch, file, metaData);
    await getCurrCandidate(dispatch,currUser as string)
    dispatch(setResumeFile(null));
    dispatch(setResumeUploadProgress(0));
  };

  const handleDelete = async (s3Key: string, resumeId: string) => {
    if (!currCandidate) {
      notifyError("please Login to upload your resume.");
      return;
    }

    const metaData = {
      s3Key,
      resumeId,
      candidateId: currCandidate._id,
    };
    console.log(metaData);
    await deleteResume(dispatch, metaData);
    await getCurrCandidate(dispatch,currUser as string);
  };
  const handleResumeChange = (file: File | null) => {
    dispatch(setResumeFile(file));
  };

  return (
    <>
      {/* <h2 className="main-title">My Resume</h2> */}
      <div id="dash-resume" className="bg-white card-box border-20 mt-40 ">
        <h4 className="dash-title-three">Resume</h4>
        <div className="dash-input-wrapper mb-20">
          <label htmlFor=""> Attachment*</label>

          {currCandidate?.resumes.map((resume) => (
            <div
              key={resume.s3Key}
              className="attached-file d-flex align-items-center justify-content-between mb-15"
            >
              <span>{resume.name}</span>
              <button
                type="button"
                onClick={() => handleDelete(resume.s3Key, resume._id)}
                className="remove-btn"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          ))}
        </div>

        {!file && (
          <>
           {resume?.length < 3 && ( 
            <div
              style={{ cursor: "pointer" }}
              className="dash-btn-one d-inline-block position-relative me-3"
            >
              <DropZone
                setFile={handleResumeChange}
                showIcon={false}
                style=""
                text={"Upload New"}
              />
            </div>
           )}
          </>
        )}

      {resume?.length === 3 && (
        <div className="dash-input-wrapper ">
        <label htmlFor=""> You have reached your resume limit. Remove resume to add new.</label>
        </div>
        )}

        {file && (
          <>
            <p className="my-2">{file.name}</p>
            <div className="btn-group">
              <button
                disabled={resumeUploadProgress !== 0}
                className="dash-btn-one  tran3s me-3 mt-3 mb-20"
                type="button"
                onClick={handleSubmit}
              >
                {resumeUploadProgress !== 0
                  ? `${resumeUploadProgress}% `
                  : "Save"}
              </button>
              <button
                className="btn-hover-underline"
                onClick={() => dispatch(setResumeFile(null))}
              >
                Cancel
              </button>
            </div>
          </>
        )}
        {resume?.length < 3 && ( 
        <div className=" mt-3 ">
          <small>*Upload file with .pdf .doc .docx</small>
        </div>
        )}
      </div>
    </>
  );
};

export default UploadResume;
