import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import JobPost from "../model/JobPost";
import fs from 'fs'

export const addJobPost = catchAsyncError(async (req, res, next) => {

    if (!req.body) {
        return next(new ErrorHandler("body not found", 400));
    }

    console.log(req.body);


    const job = await JobPost.create(req.body);

    res.status(200).json({
        job,
        success: true,
    })
})
export const getDetails = catchAsyncError(async (req, res, next) => {

    const { id } = req.query;
    if (!id) {
        return next(new ErrorHandler("job post not found", 400));
    }

    const job = await JobPost.findOne({ _id: id });

    res.status(200).json({
        job,
        success: true,
    })
})

export const getJobPosts = catchAsyncError(async (req, res, next) => {

    const { page, location, jobType, jobCategory, workMode, salary, preferredExperience } = req.query;
    // console.log(req.query)

    const queryObject: any = {}
    if (location) {
        let desiredLocation: string | string[] = location as string;
        desiredLocation = desiredLocation.split(",");
        queryObject.location = { $in: desiredLocation }
    }
    if (jobType) {
        let desiredJobTypes: string | string[] = jobType as string
        desiredJobTypes = desiredJobTypes.split(",");
        queryObject.jobType = { $all: desiredJobTypes };
    }
    if (jobCategory) {
        let desiredJobCategory: string | string[] = jobCategory as string;
        desiredJobCategory = desiredJobCategory.split(",");
        queryObject.jobCategory = { $in: desiredJobCategory }
    }
    if (workMode) {
        let desiredWorkMode: string | string[] = workMode as string;
        desiredWorkMode = desiredWorkMode.split(",");
        queryObject.workMode = { $in: desiredWorkMode }
    }
    if (preferredExperience) {
        let desiredExperience: string | string[] = preferredExperience as string
        desiredExperience = desiredExperience.split(",");
        queryObject.preferredExperience = { $all: desiredExperience };
    }
    //user provides a number, such as salary=4, to find job posts with salary ranges that include this number:
    const userProvidedSalary = Number(salary);
    if (!isNaN(userProvidedSalary) && salary !== "-1") {
        queryObject.$or = [
            {
                'salary.minimum': { $lte: userProvidedSalary },
                'salary.maximum': { $gte: userProvidedSalary },
            },
            {
                'salary.minimum': { $gte: userProvidedSalary },
                'salary.maximum': { $lte: userProvidedSalary },
            },
        ];
    }

    console.log(page)
    const p = Number(page) || 1;
    const limit = 8;
    const skip = (p - 1) * limit;

    let result = await JobPost.find(queryObject).skip(skip).limit(limit);
    const totalJobPost = await JobPost.countDocuments(queryObject);
    const totalNumOfPage = Math.ceil(totalJobPost / limit);
    console.log(totalNumOfPage);

    res.status(200).json({
        success: true,
        totalNumOfPage,
        totalJobPost,
        result,
    });

})

export const populateJobPost = catchAsyncError(async (req, res, next) => {
    const location = 'mockData/jobPost.json'
    let jobPosts: any = ""

    fs.readFile(location, 'utf8', async function (err, data) {
        if (err) {
            console.error('There was an error reading the file!', err);
            return;
        }

        jobPosts = JSON.parse(data);
        await JobPost.insertMany(jobPosts)
        // console.log(jobPosts[1]);

    });

    res.send({ msg: "true" })

})
