import express from 'express';
import passport from '../../utils/passportConfig'
import { getUserLinkedIn, getAllCandidate, logoutCandidate, signupCandidate, loginCandidate } from '../../controller/userController/candidate'
import { isAuthenticatedCandidate } from '../../middleware/auth';

const candidateRouter = express.Router();
candidateRouter.get('/auth/linkedin', passport.authenticate('linkedin', { state: '12345678' }));
candidateRouter.get('/auth/linkedin/callback', passport.authenticate('linkedin', { successRedirect: "/", failureRedirect: "/login" }));
candidateRouter.post('/auth/getCandidate', getUserLinkedIn)
candidateRouter.post('/auth/signup', signupCandidate)
candidateRouter.post('/auth/login', loginCandidate)
candidateRouter.get('/logout', logoutCandidate)
candidateRouter.get("/getAllCandidates", isAuthenticatedCandidate, getAllCandidate)

export default candidateRouter;