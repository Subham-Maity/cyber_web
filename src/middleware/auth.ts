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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWMwMmViYTRhYWY4NGYwNTFiOWI3MyIsImFjY2Vzc1Rva2VuIjoiQVFWel9sM3kycDAxSTVUS012Z2tCMk02a0pRcGk0cFR5UnZkTjFkVHN2cHFRZzU5V2FlYjgyeU9aaG9DNDJZX3ZQQVFSczhWWWRvUzJqcTFpRlRJbnlwWWJMcF9LX2IxaTZzWERvZFFZUENQWkVmOWJpdndsLVdYaGNpWkU0VTM1aVh4OHRhT3BYLW1KcGZfZUc4SVRwSkRSQmJ1T1gzdzE3WHFnc0ZNWkZ3TzNqWmZNMklWRGcyd2hmTjBQSmkyS1h6M1NDNWllenN3RTNWWmowSjc3dG40MnBQYnBScG5nTy10SjdfalV5b242bDdFSWYxTU1jdkxCYzBVekp4aHBZaVhRMEJpNE1LYXdEVE9zUjUxMjV4X2l5Mld6UkJtbXc0VmdZdF9EeFV3RUJ1MnhDbTlkeEVVS3VtQzhuaXpLeWh6bVNmbm1UVHNhdWVYT0t3NmhaWTFRZFptaFEiLCJpYXQiOjE2OTYzMzQ1NzIsImV4cCI6MTcwMTUxODU3Mn0.5zb97Uhp8zlrtPXpnK5RQdG-SX7zMo81ySfS9ozlpGg'

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment.");
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET) as CustomJwtPayload;
    console.log("decodedData", decodedData);

    let isAccessTokenActive = await isActive(decodedData.accessToken, next);
    if (!isAccessTokenActive) {
        return next(new ErrorHandler("token has been expired", 401));
    }

    const candidate = await Candidate.findOne({ _id: decodedData.id })
    if (!candidate) {
        return next(new ErrorHandler("user not found with associated token", 401));
    }
    req.user = candidate;

    next();
})