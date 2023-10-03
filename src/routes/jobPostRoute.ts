import express from 'express';
import { addJobPost, getJobPosts, getJobAutoComplete } from '../controller/jobPostController';

const jobPostRouter = express.Router();

jobPostRouter.route("/add").post(addJobPost);
jobPostRouter.route("/get").get(getJobPosts);
jobPostRouter.route("/search").get(getJobAutoComplete);




export default jobPostRouter;
