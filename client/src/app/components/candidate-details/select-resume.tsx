import { IResume } from "@/types/user-type";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DropZone from "@/layouts/dropZone";
// import Link from 'next/link';
import { notifyError } from "@/utils/toast";
import { deleteResume, uploadResume } from "@/redux/features/candidate/api";
import {
  setResumeFile,
  setResumeUploadProgress,
} from "@/redux/features/candidate/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";

const SelectResume = ({
  resumes,
  setStep,
  setForm,
}: {
  resumes: IResume[];
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setForm: React.Dispatch<
    React.SetStateAction<{
      testScore: number;
      appliedWithResume: string;
      jobLetter: string;
    }>
  >;
}) => {
  const [isSaved, setSaved] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const handleClick = (resumeId: string) => {
    setForm((form) => ({
      ...form,
      appliedWithResume: resumeId,
    }));
    setSelectedId(resumeId);
    setSaved(true);
  };

  const router = useRouter();
  const navigateToResume = () => {
    router.push("/dashboard/candidate-dashboard/profile#dash-resume");
  };

  const { resumeFile: file, resumeUploadProgress } = useAppSelector(
    (s) => s.candidate.candidateDashboard
  );
  const { currCandidate, loading } = useAppSelector(
    (store) => store.candidate.candidateDashboard
  );
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    if (!currCandidate) {
      notifyError("please Login to upload your resume.");
      return;
    }
    if (currCandidate.resumes.length == 3) {
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
    dispatch(setResumeFile(null));
    dispatch(setResumeUploadProgress(0));
  };

  const handleFile = (file: File | null) => {
    dispatch(setResumeFile(file));
  };

  return (
    <div className=" w-100 ">
      {!isSaved && (
      <p className="mt-3 fw-medium mb-3 text-center" style={{color:"red"}}>
        Select your resume for this job post*
      </p>
      )}
      {resumes.length >= 1 ? (
        <div>
          {resumes.map((resume) => (
            <button
              onClick={() => handleClick(resume._id)}
              type="button"
              className={`${
                String(resume._id) === selectedId && "request-btn-active"
              } request-btn d-flex w-100  flex-column  rounded gap-1 mb-3 border border-black p-3`}
            >
              <div className="job-name fw-500 ">{resume.name}</div>
            </button>
          ))}

          {!file && (
            <>
              <div className="btn-group d-flex mt-25 align-items-center justify-content-between  ">
                {resumes.length<3 && (
                <div style={{ cursor: "pointer" }} className="btn-one d-flex ">
                  <DropZone
                    setFile={handleFile}
                    showIcon={false}
                    style=""
                    text={"Upload New"}
                  />
                </div>
                )}
                <div className="d-flex justify-content-end">
                <button
                  onClick={navigateToResume}
                  className="btn-six"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  {" "}
                  Dashboard
                </button>
                </div>
              </div>
              {resumes.length<3 && (
              <div className=" mt-3 ">
                <small>Upload file .pdf .doc .docx</small>
              </div>
              )}
            </>
          )}

          {file && (
            <>
              <p className="my-2">{file.name}</p>
              <div className="btn-group">
                <button
                  disabled={resumeUploadProgress !== 0}
                  className="btn-one tran3s me-3 mt-3 mb-20"
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

          {/* <button className="btn-one  w-100 mt-25 ">
              <Link href={'../dashboard/candidate-dashboard/resume'}>  
              <div>Upload New Resume </div>
              </Link>
          </button> */}
        </div>
      ) : (
        // : resumes.length >=3 ?
        // (
        // <div>
        //   {resumes.slice(-3).map((resume) => (
        //       <button
        //         onClick={() => handleClick(resume._id)}
        //         type="button"
        //         className={`${
        //           String(resume._id) === selectedId && "request-btn-active"
        //         } request-btn d-flex w-100  flex-column  rounded gap-1 mb-3 border border-black p-3 `}
        //       >
        //         <div className="job-name fw-500">{resume.name}</div>
        //       </button>
        //     ))}

        //   <button
        //   onClick={upload}
        //   className="btn-one  w-100 mt-25 ">
        //     <div>Upload New Resume </div>
        //   </button>
        //   </div>)

        <div>
          <div className="d-flex justify-content-between align-item-top ">
            <p>Please upload your resume First....</p>
            <button
              onClick={navigateToResume}
              className="btn-six"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              {" "}
              Dashboard
            </button>
          </div>
          <button
            className="btn-two mt-3 tran3s"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            close
          </button>
        </div>
      )}
      <div className="button-group d-inline-flex align-items-center mt-30">
        {isSaved && (
          <button
            onClick={() => setStep((p) => p + 1)}
            className="btn-two tran3s"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectResume;
