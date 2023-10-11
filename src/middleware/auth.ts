import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import Candidate from "../model/user/Candidate.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import axios from "axios"
import { isActive } from "../utils/helper.js";



interface CustomJwtPayload extends JwtPayload {
    id: string;
    accessToken: string;
}


export const isAuthenticatedCandidate = catchAsyncError(async (req, res, next) => {
    // const { token } = req.cookies;
    //access token 
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWU5MGZkZjViZGE4MGRlMmExZTc4YSIsImFjY2Vzc1Rva2VuIjoiQVFWdGtrdjhNQUdSOXY4Mm5qRFVCcUFBRklXZnR0SFBIX1hUaWNpYjJrTjU0dHJUOXZESWZiNGs5QlR4Z1dCTncxTWZmSzh1RmpIek5GUUVRejB0MjNOQjlQWmFuZzNoaXAwMUNDT1Ffd2g0LXBBUF9Hbk5jOHBoVFVUY0tsV3dHa1h4SV9URzROLUJsWjRaYzNsTUZOZEVZUlotNmdqaW13U250RzlmNWp2ZTZqbmJwaVZEVUVBd0dRNGVXYVU0MmZHYUE3aXE4X3BGYnlYWTNUMnV1S2VnZ3NKRW9sOGpSMXhwdmIxTzFoUlEyb0Z1V21teW16QzlQWE5kbXNGcUszVktDVGFCTWMxeFZXV3ZQWTc5WWxmN3h2a09QbkxwV3l4Zm96QTRma0p6Vk5OV2NqdXBIbkdjQ1NvS3hRMWNaTm9lb1hqTG4zRzdkODFkSHYwekxldEdoUXp3YXciLCJpYXQiOjE2OTY1MDIwMTMsImV4cCI6MTcwMTY4NjAxM30.aCei-qj-WzJW7hxgj3zJU41uZWYBiz4YV2_sJIb_QeU'
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWQ2NTM2NjczODUxYjgwZjMyZTA2ZSIsImlhdCI6MTY5NjQyNTI3MSwiZXhwIjoxNzAxNjA5MjcxfQ.c4H4yUyIkmkKF4yjNzq7PRLYJMnXUfuScUKnNjM3neg'
    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment.");
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET) as CustomJwtPayload;
    console.log("decodedData", decodedData);

    // if logged in with linkedIn
    if (decodedData.hasOwnProperty('accessToken')) {
        let isAccessTokenActive = await isActive(decodedData.accessToken, next);
        if (!isAccessTokenActive) {
            return next(new ErrorHandler("token has been expired", 401));
        }
    }

    const candidate = await Candidate.findOne({ _id: decodedData.id })
    if (!candidate) {
        return next(new ErrorHandler("user not found with associated token", 401));
    }
    req.user = candidate;

    next();
})