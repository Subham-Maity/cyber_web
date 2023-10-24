import express from 'express';
import passport from '../../utils/passportConfig'
import { getUserLinkedIn, getAllCandidate, logoutCandidate, signupCandidate, loginCandidate, updateCandidate, updateEducation, updateExperience, populateCandidate, getDetails, getCurrCandidate } from '../../controller/userController/candidate'
import { isAuthenticatedCandidate } from '../../middleware/auth';

const candidateRouter = express.Router();
candidateRouter.get('/auth/linkedin', passport.authenticate('linkedin', { state: '12345678' }));
candidateRouter.get('/auth/linkedin/callback', passport.authenticate('linkedin', { successRedirect: "/", failureRedirect: "/login" }));
candidateRouter.post('/auth/getCandidate', getUserLinkedIn)
candidateRouter.post('/auth/signup', signupCandidate)
candidateRouter.post('/auth/login', loginCandidate)
candidateRouter.get('/auth/:id', getCurrCandidate);
candidateRouter.get('/logout', logoutCandidate)
candidateRouter.get("/get", getAllCandidate)
candidateRouter.post("/populate", populateCandidate)
candidateRouter.patch("/update/:id", updateCandidate)
candidateRouter.patch("/updateEdu/:id", updateEducation)
candidateRouter.patch("/updateExp/:id", updateExperience)
candidateRouter.get("/:id", getDetails)


export default candidateRouter;