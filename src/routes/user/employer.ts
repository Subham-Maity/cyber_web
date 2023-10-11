import express from 'express';
import { isAuthenticatedCandidate } from '../../middleware/auth';
import { getAllEmployer, signupEmployer, loginEmployer } from '../../controller/userController/employer';

const employerRouter = express.Router();


employerRouter.post('/auth/signup', signupEmployer)
employerRouter.post('/auth/login', loginEmployer)
employerRouter.get("/getAllEmployers", isAuthenticatedCandidate, getAllEmployer)

export default employerRouter;