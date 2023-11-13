import express from 'express';
import { isAuthenticatedCandidate } from '../../middleware/auth';
import { getAllEmployer, signupEmployer, loginEmployer, getCurrEmployer, addNotificationToCandidate, saveCandidate, getSavedCandidate, removeSavedCandidate } from '../../controller/userController/employer';

const employerRouter = express.Router();

employerRouter.post('/auth/signup', signupEmployer)
employerRouter.post('/auth/login', loginEmployer)
employerRouter.get('/auth/:id', getCurrEmployer)
employerRouter.get("/getAllEmployers", isAuthenticatedCandidate, getAllEmployer)
employerRouter.patch("/candidateNotification", addNotificationToCandidate)

// save
employerRouter.route("/savedCandidate").post(saveCandidate).get(getSavedCandidate).delete(removeSavedCandidate)

export default employerRouter;