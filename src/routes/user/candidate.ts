import express from 'express';
import passport from '../../utils/passportConfig'
import { getUserLinkedIn, getAllCandidate, saveJob, logoutCandidate, signupCandidate, loginCandidate, updateCurrCandidate, updateEducation, updateExperience, populateCandidate, getDetails, getCurrCandidate, getSaveJob, removeSavedJob, saveCompany, getSavedCompany, removeSavedCompany } from '../../controller/userController/candidate'
import { isAuthenticatedCandidate } from '../../middleware/auth';

const candidateRouter = express.Router();
// auth 
candidateRouter.get('/auth/linkedin', passport.authenticate('linkedin', { state: '12345678' }));
candidateRouter.get('/auth/linkedin/callback', passport.authenticate('linkedin', { successRedirect: "/", failureRedirect: "/login" }));
candidateRouter.post('/auth/getCandidate', getUserLinkedIn)
candidateRouter.post('/auth/signup', signupCandidate)
candidateRouter.post('/auth/login', loginCandidate);
candidateRouter.get('/auth/:id', getCurrCandidate);
candidateRouter.get('/logout', logoutCandidate)
// saveJob
candidateRouter.route("/savedJob").post(saveJob).get(getSaveJob).delete(removeSavedJob);
// saveCompany
candidateRouter.route("/savedCompany").post(saveCompany).get(getSavedCompany).delete(removeSavedCompany);
// others
candidateRouter.get("/get", getAllCandidate)
candidateRouter.post("/populate", populateCandidate)
candidateRouter.patch("/update/:id", updateCurrCandidate)
candidateRouter.patch("/updateEdu/:id", updateEducation)
candidateRouter.patch("/updateExp/:id", updateExperience)
candidateRouter.get("/:id", getDetails);


export default candidateRouter;