import catchAsyncError from "../../middleware/catchAsyncError";
import ErrorHandler from "../../utils/errorHandler";
import dotenv from 'dotenv';
import Employer from "../../model/user/Employer";
import { sendToken } from "../../utils/sendToken";

dotenv.config();


export const signupEmployer = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(new ErrorHandler("please provide all values", 400))
    }
    const candidateAlreadyExists = await Employer.findOne({ email });
    if (candidateAlreadyExists) {
        return next(new ErrorHandler("Email already in exist", 400))
    }
    const firstName = name.split(" ")[0].trim();
    const lastName = name.split(" ")[1] ? name.split(" ")[1] : "."
    const candidate = await Employer.create({ firstName, lastName, email, password, isEmailVerified: false })

    sendToken(candidate, 201, res);
})

export const loginEmployer = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("please provide all values", 400))
    }

    const candidate = await Employer.findOne({ email }).select("+password");
    if (!candidate) {
        return next(new ErrorHandler("Invalid  Email or Password", 400))
    }
    const verifyPassword = await candidate.comparePassword(password);
    if (!verifyPassword) {
        return next(new ErrorHandler("Invalid  Email or Password", 401))
    }


    sendToken(candidate, 201, res);
})

export const getCurrEmployer = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    // middleware should be there for authentication
    if (!id) {
        return next(new ErrorHandler("Candidate Id Not Found", 400))
    }
    console.log(id)
    const employer = await Employer.findById({ _id: id });

    res.status(200).json({
        success: true,
        employer,
    });
})

export const getAllEmployer = catchAsyncError(async (req, res, next) => {

    const candidates = await Employer.find();

    res.status(200).json({
        success: true,
        candidates
    })
})
