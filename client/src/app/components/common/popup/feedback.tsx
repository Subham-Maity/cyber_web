import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect, useState } from "react";
import { getFeedback, responseFeedback } from "@/redux/features/jobApp/api";
import { askFeedback } from "@/redux/features/jobApp/api";
import { notifyInfo } from "@/utils/toast";

const FeedbackModal = () => {
  const { currJobApp, feedback } = useAppSelector((s) => s.jobApplication);
  const { currUser, userRole } = useAppSelector((s) => s.persistedReducer.user);
  // const {}=useAppSelector(s=>s.jobApplication);
  const { socket } = useAppSelector((s) => s.global);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currJobApp) getFeedback(dispatch, currJobApp);
  }, [currJobApp]);

  const [question, setQuestion] = useState("");
  const handleSubmit = () => {
    if (question) {
      if (userRole === "candidate") {
        askFeedback(dispatch, {
          appId: currJobApp,
          question,
          candidateId: currUser,
        });
      } else if (userRole === "employer" && feedback) {
        responseFeedback(
          dispatch,
          {
            appId: currJobApp,
            response: question,
            employerId: currUser,
            candidateId: feedback?.candidateQuestion.candidateId,
            redirectUrl: `${process.env.NEXT_PUBLIC_HOME_ENDPOINT}/dashboard/candidate-dashboard/jobs`,
          },
          socket
        );
      }
      setQuestion("");
    } else notifyInfo("Please write query.");
  };
  let haveAsked = false;
  if (feedback && feedback.candidateQuestion) haveAsked = true;

  console.log("from feedback", feedback);
  return (
    <div
      className="modal fade"
      id="feedbackModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container-fluid ">
          <div className="user-data-form modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="text-center">
              <h3 className="mb-30">Ask Feedback</h3>
            </div>
            {/* <h3>Ask Feedback</h3> */}
            {userRole === "candidate" && (
              <div className="form-wrapper m-auto container-fluid ">
                {/* input */}
                {feedback?.candidateQuestion.question && (
                  <div>
                    <label className="mb-2" htmlFor="">
                      Your Query
                    </label>
                    <p className="question">
                      {feedback?.candidateQuestion.question}
                    </p>
                  </div>
                )}
                {feedback?.employerResponse?.response && (
                  <div>
                    <label className="mb-2" htmlFor="">
                      Employer response
                    </label>
                    <p className="response">
                      {feedback?.employerResponse?.response}
                    </p>
                  </div>
                )}

                {!feedback && (
                  <div className="">
                    <label className="mb-2" htmlFor="question">
                      Ask for feedback
                    </label>
                    <textarea
                      name="question"
                      className="text-area"
                      placeholder="write something..."
                      onChange={(e) => setQuestion(e.target.value)}
                      value={question}
                    ></textarea>

                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      className="send-button"
                      onClick={handleSubmit}
                    >
                      Send
                    </button>
                  </div>
                )}
              </div>
            )}
            {userRole === "employer" && (
              <div className="form-wrapper m-auto container-fluid ">
                {/* input */}
                <div>
                  <label htmlFor="">Candidate asked for</label>
                  <p className="question">
                    {feedback?.candidateQuestion.question}
                  </p>
                </div>
                {feedback?.employerResponse?.response && (
                  <div>
                    <label htmlFor="">Your response</label>
                    <p className="response">
                      {feedback?.employerResponse?.response}
                    </p>
                  </div>
                )}

                {!feedback?.employerResponse && (
                  <div className="">
                    <label className="mb-2" htmlFor="question">
                      Drop feedback
                    </label>
                    <textarea
                      className="text-area"
                      placeholder="write something..."
                      onChange={(e) => setQuestion(e.target.value)}
                      value={question}
                    ></textarea>

                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      className="send-button"
                      onClick={handleSubmit}
                    >
                      Send
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
