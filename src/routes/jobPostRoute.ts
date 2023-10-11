import express from 'express';
import { addJobPost, getJobPosts, } from '../controller/jobPostController';
import multer from 'multer'

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

jobPostRouter.route("/add").post(upload.single('fileAttachment'), addJobPost);
jobPostRouter.route("/get").get(getJobPosts);
// jobPostRouter.route("/search").get(getJobAutoComplete);




export default jobPostRouter;
