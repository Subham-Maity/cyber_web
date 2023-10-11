import express from 'express';
import { addCompany, getCompanies, } from '../controller/company';

const companyRouter = express.Router();

companyRouter.route("/add").post(addCompany);
companyRouter.route("/get").get(getCompanies);




export default companyRouter;
