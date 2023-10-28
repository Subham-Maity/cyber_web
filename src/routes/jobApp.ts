import express from 'express';
import { createJobApp, getAllAppByCandidate, getAllAppByJobPost, getAllJobAppByCandidate, getAllCandidateAppByJob, updateStatus } from '../controller/jobAppController';

const jobAppRouter = express.Router();

jobAppRouter.route("/create").post(createJobApp);
jobAppRouter.route("/candidate/:id").get(getAllAppByCandidate);
jobAppRouter.route("/jobPost/:id").get(getAllAppByJobPost);
jobAppRouter.route("/updateStatus").patch(updateStatus);
jobAppRouter.route("/candidateDash/:id").get(getAllJobAppByCandidate);
jobAppRouter.route('/employerDash/:id').get(getAllCandidateAppByJob);

export default jobAppRouter;
