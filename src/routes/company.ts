import express from 'express';
import { addCompany, getCompanies, } from '../controller/company';
import { chatWithAiUsingRest } from '../controller/aiController';

const companyRouter = express.Router();

companyRouter.route("/add").post(addCompany);
companyRouter.route("/get").get(getCompanies);
companyRouter.route('/draft').post(chatWithAiUsingRest)




export default companyRouter;
