import DropZone from "@/layouts/dropZone";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { notifyError } from "@/utils/toast";
import { setFile, setUploadProgress } from "@/redux/features/globalSlice";
import { uploadResumeToServer } from "@/redux/features/jobPost/api";
import Loader from "@/ui/loader";
import Messenger from "./message";

const GptSidebar = ({
  setSidebar,
}: {
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const { currCandidate, loading } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );
  const { file, uploadProgress } = useAppSelector((s) => s.global);
  const { fileNamePc, gptLoading } = useAppSelector((s) => s.jobPost);

  const handleUpload = async () => {
    if (!currCandidate) {
      notifyError("please Login to upload your resume.");
      return;
    }

    if (!file || file.type !== "application/pdf") {
      notifyError("Please upload Profile Photo in supported format.");
      dispatch(setFile(null));
      return;
    }

    const nameArr = file.name.split(".");
    const extension = nameArr[nameArr.length - 1];
    const metaData = {
      extension: extension,
      type: file.type,
      candidateId: currCandidate._id,
    };

    await uploadResumeToServer(dispatch, file, metaData);

    dispatch(setFile(null));
    dispatch(setUploadProgress(0));
  };
  const handleFile = (file: File | null) => {
    setFile(file);
  };
  return (
    <div className="chat-bot-overlay">
      <div className="chat-bot-container">
        <div className="chat-bot-sidebar">
          <div className="header d-flex justify-content-between  ">
            <p className=" fw-normal fs-4 "> AI Powered suggestions</p>
            <button className=" fs-1" onClick={() => setSidebar(false)}>
              <i className="bi bi-x"></i>
            </button>
          </div>
          {!fileNamePc && (
            <div className="upload   mx-auto  p-3 d-flex justify-content-center align-items-center gap-2  ">
              <button className="me-3 ">
                <DropZone setFile={handleFile} text={"Upload resume"} />
              </button>
              {gptLoading ? (
                <div>
                  <Loader />
                </div>
              ) : (
                <div className=" fs-3 ">
                  <i className="bi bi-upload"></i>
                </div>
              )}
            </div>
          )}
          {file && (
            <button
              className="btn-one mx-auto mt-3"
              type="button"
              disabled={gptLoading}
              onClick={handleUpload}
            >
              upload
            </button>
          )}

          {fileNamePc && (
            <div className="upload mx-auto  p-3 d-flex justify-content-center ">
              <div className="me-3 d-flex gap-3 justify-content-center ">
                <p className=" mt-1 ">{fileNamePc}</p>
                <span className=" fs-3 ">
                  <i
                    style={{ color: "green" }}
                    className="bi bi-check-circle-fill"
                  ></i>
                </span>
              </div>
            </div>
          )}
          <div className=" d-flex me-3  align-items-center  typing-section">
            <Messenger />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GptSidebar;
