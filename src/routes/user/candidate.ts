import express from 'express';
import passport from '../../utils/passportConfig'
import { getCandidateFromLinkedIn, getAllCandidate, logoutCandidate } from '../../controller/userController/candidate'
import { isAuthenticatedCandidate } from '../../middleware/auth';

const candidateRouter = express.Router();
candidateRouter.get('/auth/linkedin', passport.authenticate('linkedin', { state: '12345678' }));
candidateRouter.get('/auth/linkedin/callback', passport.authenticate('linkedin', { successRedirect: "/", failureRedirect: "/login" }));
candidateRouter.post('/auth/getCandidate', getCandidateFromLinkedIn)
candidateRouter.get('/logout', logoutCandidate)
candidateRouter.get("/getAllCandidates", isAuthenticatedCandidate, getAllCandidate)

export default candidateRouter;