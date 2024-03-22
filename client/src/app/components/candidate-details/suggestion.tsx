import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { MagicWand } from "@phosphor-icons/react";
import GptLoader from "@/ui/loader";
import { getSuggestion } from "@/redux/features/jobPost/api";
import { notifyInfo } from "@/utils/toast";

const Suggestion = ({
  setStep,
  resumeId,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  resumeId: string;
}) => {
  const dispatch = useAppDispatch();
  const [isSaved, setSaved] = useState(false);
  const [suggestionWithAi, setSuggestionWithAi] = useState("");
  const { jobPost, gptLoading } = useAppSelector((state) => state.jobPost);

  const { currCandidate } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );

  const question = `give any 10 points so that i can improve my resume for the given job post  so that the i have greater chance to be shortlisted
                    jobTile:${jobPost?.title}
                    jobDescription:${jobPost?.description}
                    `;

  const HandleGetSuggestion = async () => {
    if (!currCandidate) {
      notifyInfo("please login to get suggestion");
      return;
    }
    const resume = currCandidate.resumes.find(
      (resume) => resume._id === resumeId
    );
    if (!resume) {
      notifyInfo("resume not found");
      return;
    }
    // console.log("30");
    const response = await getSuggestion(
      dispatch,
      currCandidate._id,
      question,
      resume.s3Key
    );
    console.log(response);
    setSuggestionWithAi(response?.response || "");
    setSaved(true);
  };
  const handleSave = () => {};
  const suggestion = suggestionWithAi.split("\n");
  return (
    <div>
      <p className="mt-3 fw-medium  mb-3">
        Get suggestion from the AI to improve your resume selected for this job
        post.
      </p>
      <div className="dash-input-wrapper chatBox w-100 ">
        <div className=" position-relative">
          <button
            disabled={gptLoading}
            type={"button"}
            onClick={HandleGetSuggestion}
            className="job-letter-btn-ai mb-3  tran3s me-3 d-flex align-items-center  gap-2  justify-content-center   "
          >
            <span>{gptLoading ? <GptLoader /> : "Get Suggestion"}</span>
            <span className="">
              <MagicWand size={32} color="#244034" weight="light" />
            </span>
          </button>
        </div>
        <div className="suggestion">
          {suggestion.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
      </div>
      <div className="button-group d-inline-flex align-items-center mt-30">
        <button
          onClick={() => setStep((p) => p + 1)}
          className="btn-two tran3s"
        >
          {isSaved ? "Next" : "Skip"}
        </button>
      </div>
      {/* {isSaved && (
        <div className="button-group d-inline-flex align-items-center mt-30">
          <button
            type="button"
            onClick={handleSave}
            className="btn-one tran3s me-3"
          >
            {isSaved ? <span>Saved</span> : <span>Save</span>}
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Suggestion;
