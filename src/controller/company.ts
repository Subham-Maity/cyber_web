import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import Company from "../model/Company";

export const addCompany = catchAsyncError(async (req, res, next) => {

    if (!req.body) {
        return next(new ErrorHandler("body not found", 400));
    }

    const company = await Company.create(req.body);



    res.status(201).json({
        company,
        success: true,
        message: "Compony Added successfully",

    })
})
export const getCompanies = catchAsyncError(async (req, res, next) => {


    const companies = await Company.find();



    res.status(201).json({
        companies,
        success: true,
        message: "Compony Added successfully",

    })
})
