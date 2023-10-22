import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import Company from "../model/Company";
import fs from 'fs'

export const addCompany = catchAsyncError(async (req, res, next) => {

    if (!req.body) {
        return next(new ErrorHandler("body not found", 400));
    }
    console.log(req.body);

    const company = await Company.create(req.body);



    res.status(201).json({
        company,
        success: true,
        message: "Compony Added successfully",

    })
})
// export const getCompanies = catchAsyncError(async (req, res, next) => {


//     const companies = await Company.find();



//     res.status(201).json({
//         companies,
//         success: true,
//         message: "Compony Added successfully",

//     })
// })

export const populateJobPost = catchAsyncError(async (req, res, next) => {
    const location = 'mockData/Company.json'
    let companies: any = ""

    fs.readFile(location, 'utf8', async function (err, data) {
        if (err) {
            console.error('There was an error reading the file!', err);
            return;
        }

        companies = JSON.parse(data);
        await Company.insertMany(companies)
        // console.log(jobPosts[1]);

    });

    res.send({ msg: "true" })

})
export const getDetails = catchAsyncError(async (req, res, next) => {

    const { id } = req.params;
    if (!id) {
        return next(new ErrorHandler("Company not found", 400));
    }

    const company = await Company.findById({ _id: id });

    res.status(200).json({
        company,
        success: true,
    })
})


export const getCompanies = catchAsyncError(async (req, res, next) => {

    const { page, name, teamSize } = req.query;
    const queryObject: any = {}
    if (name) {
        queryObject.name = name
    }
    if (teamSize) {

        queryObject.teamSize = teamSize;
    }

    const p = Number(page) || 1;
    const limit = 8;
    const skip = (p - 1) * limit;

    let result = await Company.find(queryObject).skip(skip).limit(limit);
    const totalCompanies = await Company.countDocuments(queryObject);
    const totalNumOfPage = Math.ceil(totalCompanies / limit);
    console.log(totalNumOfPage)

    res.status(200).json({
        success: true,
        totalNumOfPage,
        totalCompanies,
        result,
    });

})
