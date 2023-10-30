import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import JobApp from "../model/JobApp";
import JobPost from "../model/JobPost";

export const createJobApp = catchAsyncError(async (req, res, next) => {

    if (!req.body) {
        return next(new ErrorHandler("body not found", 400));
    }
    const { candidate, jobPost } = req.body
    console.log(req.body);
    if (!candidate || !jobPost) {
        return next(new ErrorHandler("candidate or jobPost is missing", 400));
    }
    const jobApp = await JobApp.create(req.body);
    // const JobPost: any = await JobApp.findById({ _id: jobPost });
    // if (JobPost) {
    //     JobPost.candidates.push(candidate);
    //     await jobPost.save();
    // }

    res.status(200).json({
        jobApp,
        success: true,
    })
})

export const getAllAppByCandidate = catchAsyncError(async (req, res, next) => {

    const { id: candidate } = req.params
    if (!candidate) {
        return next(new ErrorHandler("candidate no found", 404));
    }
    console.log(candidate);
    const allJobApp = await JobApp.find({ candidate });
    console.log(allJobApp.length);


    res.status(200).json({
        allJobApp,
        success: true,
    })
})

export const getAllJobAppByCandidate = catchAsyncError(async (req, res, next) => {

    const { id: candidate } = req.params
    if (!candidate) {
        return next(new ErrorHandler("candidate no found", 404));
    }

    // const allJobApp = await JobApp.find({ candidate });
    // const allJobPost= await JobPost.find()
    const allJobApp = await JobApp.find({ candidate }).sort({ createdAt: -1 }).populate('jobPost');

    res.status(200).json({
        allJobApp,
        success: true,
    })
})
export const getAllCandidateAppByJob = catchAsyncError(async (req, res, next) => {

    const { id: jobPost } = req.params
    if (!jobPost) {
        return next(new ErrorHandler("candidate no found", 404));
    }

    const allJobApp = await JobApp.find({ jobPost }).sort({ createdAt: -1 }).populate('candidate');

    res.status(200).json({
        allJobApp,
        success: true,
    })
})

export const getAllAppByJobPost = catchAsyncError(async (req, res, next) => {

    const { id: jobPost } = req.params;
    if (!jobPost) {
        return next(new ErrorHandler("jobPost no found", 404));
    }
    const allJobApp = await JobApp.find({ jobPost });


    res.status(200).json({
        allJobApp,
        success: true,
    })
})

export const updateStatus = catchAsyncError(async (req, res, next) => {

    const { status, id } = req.body;

    if (!status) {
        return next(new ErrorHandler("status not found", 404));
    }

    const jobApp = await JobApp.findById({ _id: id });
    if (!jobApp) {
        return next(new ErrorHandler("Job Application not found", 404));
    }
    jobApp.status = status;
    await jobApp.save();

    res.status(200).json({
        success: true,
    })
})

