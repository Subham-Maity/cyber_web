import MultipleChoiceQuestion from "@/ui/question-details";
import { useState } from "react";
import { createJobApp } from "@/redux/features/jobApp/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import SelectResume from "../../candidate-details/select-resume";
import JobLetter from "../../candidate-details/job-letter";
import Suggestion from "../../candidate-details/suggestion";

const QuestionModal = ({
  question,
  jobId,
}: {
  question: string[][];
  jobId: string;
}) => {
  const { currCandidate } = useAppSelector(
    (s) => s.candidate.candidateDashboard
  );

  console.log(String(question));

  const dispatch = useAppDispatch;
  const [step, setStep] = useState(1);
  const [from, setForm] = useState({
    testScore: 0,
    appliedWithResume: "",
    jobLetter: "",
  });

  return (
    <div
      className="modal fade"
      id="questionModal"
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
            <div className="form-wrapper m-auto w-100 ">
              <div className="text-center">
                <h2 className=" mb-3 ">Step-{step}</h2>
              </div>
              {step === 1 && (
                <div className="_question">
                  <div className=" text-center mt-3 ">
                    <p className="mb-30 fw-medium">
                      Please Answer these Questions to Move further.
                    </p>
                  </div>
                  <MultipleChoiceQuestion
                    setStep={setStep}
                    setForm={setForm}
                    text={question}
                  />
                </div>
              )}
              {step === 2 && currCandidate && (
                <div className="_resume mt-5  ">
                  <SelectResume
                    resumes={currCandidate.resumes}
                    setForm={setForm}
                    setStep={setStep}
                  />
                </div>
              )}
              {step === 3 && currCandidate && (
                <div className="_resume mt-5  ">
                  <Suggestion
                    setStep={setStep}
                    resumeId={from.appliedWithResume}
                  />
                </div>
              )}
              {step === 4 && (
                <div className="_jobLetter">
                  <JobLetter setForm={setForm} form={from} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
