import express from 'express';
import { createJobApp, getAllAppByCandidate, getAllAppByJobPost, getAllJobAppByCandidate, getAllCandidateAppByJob, updateStatus } from '../controller/jobAppController';
import { askFeedback, getFeedback, responseFeedback } from '../controller/feedback';
const jobAppRouter = express.Router();

jobAppRouter.route("/create").post(createJobApp);
jobAppRouter.route("/candidate/:id").get(getAllAppByCandidate);
jobAppRouter.route("/jobPost/:id").get(getAllAppByJobPost);
jobAppRouter.route("/updateStatus").patch(updateStatus);
jobAppRouter.route("/candidateDash/:id").get(getAllJobAppByCandidate);
jobAppRouter.route('/employerDash/:id').get(getAllCandidateAppByJob);
jobAppRouter.route('/feedback/ask').post(askFeedback);
jobAppRouter.route('/feedback/response').patch(responseFeedback);
jobAppRouter.route('/feedback/:id').get(getFeedback);




export default jobAppRouter;
