import express from 'express';
import { addCompany, getCompanies, getEditorContent, addEditorContent } from '../controller/company';

const companyRouter = express.Router();

companyRouter.route("/add").post(addCompany);
companyRouter.route("/get").get(getCompanies);
companyRouter.route("/content").get(getEditorContent).post(addEditorContent);




export default companyRouter;
