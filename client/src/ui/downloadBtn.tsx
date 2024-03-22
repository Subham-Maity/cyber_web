import instance from "@/lib/axios";
import { getallJobAppByJobPostWithCandidate, updateJobAppStatus } from "@/redux/features/jobApp/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import axios from "axios";
import React from "react";

const ResumeDownloadButton = ({
  fileName,
  s3Key,
  text,
  style,
  id,
  candidateId,
  jobPostId,
}: {
  fileName: string;
  s3Key: string;
  text?: string;
  style?: string;
  id: string;
  candidateId: string;
  jobPostId: string;
}) => {
  const dispatch = useAppDispatch();
  const { currUser } = useAppSelector((s) => s.persistedReducer.user);
  const { socket } = useAppSelector((s) => s.global);
  const filterState = useAppSelector(
    (state) => state.employerCandidateByJobAppFilter
  );
  const handleDownloadClick = async () => {
    await updateJobAppStatus(
      dispatch,
      {
        status: "Under Review",
        employerId: currUser,
        candidateId,
        id,
        redirectUrl: `${process.env.NEXT_PUBLIC_HOME_ENDPOINT}/dashboard/candidate-dashboard/jobs`,
      },
      socket
    );
    getallJobAppByJobPostWithCandidate(dispatch, jobPostId, filterState);
    const { data } = await instance.post("/candidate/download", { s3Key });
    // console.log("downloaded data", data);
    
    const { data: resume } = await axios(data.url, {
      responseType: "blob",
    });
    console.log("resume", resume);

    const url = window.URL.createObjectURL(new Blob([resume]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  };

  return (
    <div>
      <button className={`${style ? style : ""}`} onClick={handleDownloadClick}>
        {text ? text : "Download"}{" "}
      </button>
    </div>
  );
};

export default ResumeDownloadButton;
