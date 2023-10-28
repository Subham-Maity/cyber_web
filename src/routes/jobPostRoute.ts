import express from 'express';
import { addJobPost, getJobPosts, populateJobPost, getDetails, deleteJobPost, getJobPostsForEmployer } from '../controller/jobPostController';
import multer from 'multer'
import { chatWithAiUsingRest } from '../controller/aiController';

const jobPostRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // The directory where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename
    },
});
const upload = multer({ storage: storage });

jobPostRouter.route("/add").post(addJobPost);
jobPostRouter.route("/get").get(getJobPosts);
jobPostRouter.route("/populate").post(populateJobPost);
jobPostRouter.route("/askGpt").get(chatWithAiUsingRest);
jobPostRouter.route("/employer/:employerId").get(getJobPostsForEmployer);
jobPostRouter.route("/:id").get(getDetails).delete(deleteJobPost);





export default jobPostRouter;
