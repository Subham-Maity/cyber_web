import catchAsyncError from "../../middleware/catchAsyncError";
import ErrorHandler from "../../utils/errorHandler";
import axios from "axios";
import dotenv from 'dotenv';
import Candidate from "../../model/user/Candidate";
import { sendTokenForCandidate } from "../../utils/sendToken";
dotenv.config();

const serverGeneratedState = "12345678"

export const getCandidateFromLinkedIn = catchAsyncError(async (req, res, next) => {

    if (req.body.hasOwnProperty('error')) {
        const { error_description } = req.body;
        return next(new ErrorHandler(error_description, 401))
    }
    const { code, state } = req.body;
    if (serverGeneratedState !== state) {
        return next(new ErrorHandler("candidate is not authorized", 401))
    }
    // make a req by using code to get access token
    const clientId = process.env.CLIENT_ID || "";
    const callbackUrl = process.env.CALLBACK_URL || "";
    const clientSecret = process.env.CLIENT_SECRET || ""
    let accessToken = ''
    try {
        const { data } = await axios.post(`https://www.linkedin.com/oauth/v2/accessToken?code=${code}&grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${callbackUrl}`)
        accessToken = data.access_token;
        // console.log(data);
    } catch (error: any) {
        // console.log(error)
        return next(new ErrorHandler("error while getting accessToken", 400))

    }
    let response;
    try {
        const { data } = await axios.get('https://api.linkedin.com/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log(data);
        response = data;
    } catch (error) {
        // console.log(error)
        return next(new ErrorHandler("error while getting userInfo", 400))
    }
    const candidateObj = {
        email: response.email,
        firstName: response.given_name,
        lastName: response.family_name,
        avatar: response.picture,
        isEmailVerified: response.email_verified,
    }
    const candidate = await Candidate.create(candidateObj);
    sendTokenForCandidate(candidate, 201, res, accessToken);

})

export const logoutCandidate = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).status(200).json({
        success: true,
        message: "Logged Out Successfully"
    });
})

export const getAllCandidate = catchAsyncError(async (req, res, next) => {

    const candidates = await Candidate.find();

    res.status(200).json({
        success: true,
        candidates
    })
})
