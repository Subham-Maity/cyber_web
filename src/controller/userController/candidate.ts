import catchAsyncError from "../../middleware/catchAsyncError";
import ErrorHandler from "../../utils/errorHandler";
import axios from "axios";
import dotenv from 'dotenv';
import Candidate from "../../model/user/Candidate";
import { sendToken } from "../../utils/sendToken";
import Employer from "../../model/user/Employer";
import { IEmployer, ICandidate } from "../../types/user";
dotenv.config();

const serverGeneratedState = "12345678"

export const getUserLinkedIn = catchAsyncError(async (req, res, next) => {

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
        // console.log(data);
        response = data;
    } catch (error) {
        // console.log(error)
        return next(new ErrorHandler("error while getting userInfo", 400))
    }
    const { role } = req.body;
    let user: ICandidate | IEmployer | null = null;
    const Obj = {
        email: response.email,
        firstName: response.given_name,
        lastName: response.family_name,
        avatar: response.picture,
        isEmailVerified: response.email_verified,
    }
    if (role == 'employer') {

        user = await Employer.findOne({ email: response.email });
        if (!user) {
            user = await Employer.create(Obj);
        }
    }
    if (role == 'candidate') {
        user = await Candidate.findOne({ email: response.email });
        if (!user) {
            user = await Candidate.create(Obj);
        }
    }

    sendToken(user, 201, res, accessToken);

})



export const signupCandidate = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(new ErrorHandler("please provide all values", 400))
    }
    const candidateAlreadyExists = await Candidate.findOne({ email });
    if (candidateAlreadyExists) {
        return next(new ErrorHandler("Email already in exist", 400))
    }
    const firstName = name.split(" ")[0].trim();
    const lastName = name.split(" ")[1] ? name.split(" ")[1] : "."
    const candidate = await Candidate.create({ firstName, lastName, email, password, isEmailVerified: false })

    sendToken(candidate, 201, res);
})

export const loginCandidate = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("please provide all values", 400))
    }

    const candidate = await Candidate.findOne({ email }).select("+password");
    const employer = await Employer.findOne({ email }).select("+password");
    if (!candidate && !employer) {
        return next(new ErrorHandler("Invalid  Email or Password", 400))
    }
    if (candidate) {
        const verifyPassword = await candidate.comparePassword(password);
        if (!verifyPassword) {
            return next(new ErrorHandler("Invalid  Email or Password", 401))
        }
    }
    if (employer) {
        const verifyPassword = await employer.comparePassword(password);
        if (!verifyPassword) {
            return next(new ErrorHandler("Invalid  Email or Password", 401))
        }
    }



    sendToken(candidate ? candidate : employer, 201, res);
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
