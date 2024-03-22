import React, { useState } from "react";
import TinyMCEEditor from "@/ui/textEditor";
import { MagicWand } from "@phosphor-icons/react";
import { askToGpt, askToGptForCan } from "@/redux/features/jobPost/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import GptLoader from "@/ui/loader";
import { notifyInfo } from "@/utils/toast";
import { createJobApp } from "@/redux/features/jobApp/api";

const JobLetter = ({
  setForm,
  form,
}: {
  form: {
    testScore: number;
    appliedWithResume: string;
    jobLetter: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      testScore: number;
      appliedWithResume: string;
      jobLetter: string;
    }>
  >;
}) => {
  const dispatch = useAppDispatch();
  //   const [jobLetter, setJobLetter] = useState("");
  const [isSaved, setSaved] = useState(false);
  const [isSkip, setSkip] = useState(false);
  const [text, setText] = useState("");
  const [jobLetterWithAi, setJobLetterWithAi] = useState<any>("");
  const { jobPost, gptLoading } = useAppSelector((state) => state.jobPost);
  const { currCandidate } = useAppSelector(
    (state) => state.candidate.candidateDashboard
  );

  const handleSave = () => {
    if (!jobLetterWithAi) {
      notifyInfo("please Write something in text area to before save.");
      return;
    }
    setForm((form) => ({
      ...form,
      jobLetter: jobLetterWithAi.choices[0].message.content,
    }));
    setSaved(true);
  };

  const draftJobLetter = async () => {
    const query = `write a job letter with this job title ${
      jobPost?.title
    }  and my skills which are ${currCandidate?.skills.join(" ,")},my name is ${
      currCandidate?.firstName
    } , give me just body of the job letter  in about 150 to 200 words  `;

    try {
      const data = await askToGptForCan(dispatch, query);
      setJobLetterWithAi(data);
      console.log(data);
      //   console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApply = async () => {
    await createJobApp(dispatch, {
      candidate: currCandidate?._id,
      jobPost: jobPost?._id,
      ...form,
    });
  };

  return (
    <div>
      <p className="mt-3 fw-medium  mb-3">
        Write a brief job letter for your job application, Tell the employer why
        you are suitable for this job.{" "}
      </p>
      <div className="dash-input-wrapper chatBox w-100 ">
        <div className=" position-relative">
          <button
            // disabled={gptLoading}
            type={"button"}
            onClick={draftJobLetter}
            className="job-letter-btn-ai mb-3  tran3s me-3 d-flex align-items-center  gap-2  justify-content-center   "
          >
            <span>
              {gptLoading ? <GptLoader /> : "Write a job letter with Ai"}
            </span>
            <span className="">
              <MagicWand size={32} color="#244034" weight="light" />
            </span>
          </button>
          {jobLetterWithAi ? (
            <TinyMCEEditor
              text={jobLetterWithAi.choices[0].message.content}
              setText={setText}
            />
          ) : (
            <TinyMCEEditor text={""} setText={setText} />
          )}
          {/* <div className="container mt-4">
            <div className="form-group">
              
              <textarea
                value={jobLetter}
                onChange={(e) => setJobLetter(e.target.value)}
                className="form-control"
                id="exampleTextarea"
                rows={5}
              >
                Write the job letter...
              </textarea>
            </div>
          </div> */}
        </div>
      </div>
      <div className="button-group d-inline-flex align-items-center mt-30">
        {!(isSaved || isSkip) && (
          <>
            <button
              type="button"
              onClick={handleSave}
              className="btn-one tran3s me-3"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setSkip(true)}
              className="btn-two tran3s tran3s me-3"
            >
              <span>Skip</span>
            </button>
          </>
        )}

        {(isSaved || isSkip) && (
          <button
            onClick={handleApply}
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
            className="btn-two tran3s"
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default JobLetter;
