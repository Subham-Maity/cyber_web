import catchAsyncError from "../../middleware/catchAsyncError";
import ErrorHandler from "../../utils/errorHandler";
import axios from "axios";
import dotenv from 'dotenv';
import Candidate from "../../model/user/Candidate";
import { sendToken } from "../../utils/sendToken";
import Employer from "../../model/user/Employer";
import { IEmployer, ICandidate } from "../../types/user";
import fs from 'fs';
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
export const getCurrCandidate = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    // middleware should be there for authentication
    if (!id) {
        return next(new ErrorHandler("Candidate Id Not Found", 400))
    }
    console.log(id)
    const candidate = await Candidate.findById({ _id: id });

    res.status(200).json({
        success: true,
        candidate,
    });
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

    const { keyword, location, candidateType, preferredExperience, page } = req.query;
    // console.log(req.query)
    const myKeyWord = keyword as string

    const queryObject: any = {}
    if (location) {
        let desiredLocation: string | string[] = location as string;
        desiredLocation = desiredLocation.split(",");
        queryObject.location = { $in: desiredLocation }
    }
    if (keyword) {
        // queryObject.skills = { $in: [new RegExp(myKeyWord, 'i')] };
        queryObject.firstName = { $regex: myKeyWord, $options: "i" };
    }
    if (candidateType) {
        queryObject.gender = candidateType
    }

    if (preferredExperience) {
        let desiredExperience: string | string[] = preferredExperience as string
        desiredExperience = desiredExperience.split(",");
        queryObject.experienceInShort = { $all: desiredExperience };
    }
    //user provides a number, such as salary=4, to find job posts with salary ranges that include this number:

    console.log(page)
    const p = Number(page) || 1;
    const limit = 8;
    const skip = (p - 1) * limit;

    let result = await Candidate.find(queryObject).skip(skip).limit(limit);
    const totalCandidate = await Candidate.countDocuments(queryObject);
    const totalNumOfPage = Math.ceil(totalCandidate / limit);
    console.log(totalNumOfPage);

    res.status(200).json({
        success: true,
        totalNumOfPage,
        totalCandidate,
        result,
    });

})
export const getDetails = catchAsyncError(async (req, res, next) => {

    const { id } = req.params;

    const candidate = await Candidate.findById({ _id: id });

    res.status(200).json({
        success: true,
        candidate
    });

})

export const updateCandidate = catchAsyncError(async (req, res, next) => {

    if (!req.body) {
        return next(new ErrorHandler("body not found", 400));
    }
    const { id } = req.params;
    const candidate = await Candidate.findByIdAndUpdate({ _id: id }, req.body);
    if (!candidate) {
        return next(new ErrorHandler("something went wrong ,try again", 500));
    }
    res.status(200).json({
        success: true,
        candidate
    })
})
export const updateEducation = catchAsyncError(async (req, res, next) => {

    if (!req.body) {
        return next(new ErrorHandler("body not found", 400));
    }
    const { id } = req.params;
    let candidate = await Candidate.findOne({ _id: id });
    candidate?.education.push(req.body)
    await candidate?.save();
    if (!candidate) {
        return next(new ErrorHandler("something went wrong ,try again", 500));
    }
    res.status(200).json({
        success: true,

    })
})
export const updateExperience = catchAsyncError(async (req, res, next) => {

    if (!req.body) {
        return next(new ErrorHandler("body not found", 400));
    }
    const { id } = req.params;
    const candidate = await Candidate.findOne({ _id: id });
    candidate?.experience.push(req.body);
    await candidate?.save();
    if (!candidate) {
        return next(new ErrorHandler("something went wrong ,try again", 500));
    }
    res.status(200).json({
        success: true,
    })
})

export const populateCandidate = catchAsyncError(async (req, res, next) => {
    const location = 'mockData/Candidate.json'
    let candidates: any = "";

    fs.readFile(location, 'utf8', async function (err, data) {
        if (err) {
            console.error('There was an error reading the file!', err);
            return;
        }

        candidates = JSON.parse(data);
        await Candidate.insertMany(candidates)
        // console.log(jobPosts[1]);

    });

    res.send({ msg: "true" })

})
