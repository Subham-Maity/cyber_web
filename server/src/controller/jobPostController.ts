import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import JobPost from "../model/JobPost";
import fs from "fs";
import Company from "../model/Company";
import Candidate from "../model/user/Candidate";
import {
  calculateMatchScore,
  calculateScoreForSkills,
  hasOneMonthOrGreaterGap,
} from "../utils/helper";
import { ICandidate, IEmployer } from "../types/user";
import { IJobPost } from "../types/jobPost";
import mongoose from "mongoose";
const { ObjectId } = require("mongodb");
const uuid = require("uuid");
import favCompanyAlertQueue from "../queues/favCompanyAlert";
import Employer from "../model/user/Employer";

export const addJobPost = catchAsyncError(async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorHandler("body not found", 400));
  }
  const { companyId, employerId } = req.body;
  // console.log(req.body);
  // const employer = Employer.findById(employerId);
  const requestingEmployer = req?.user as IEmployer;
  const employer = await Employer.findById(requestingEmployer?._id || "");
  if (
    employer &&
    employer.subscription &&
    employer.subscription.subscriptionType === "essential"
  ) {
    const lastUpdate = await hasOneMonthOrGreaterGap(
      employer.lastJobPostLimitUpdated
    );
    if (lastUpdate === true) {
      employer.lastJobPostLimitUpdated = new Date();
      employer.subscription.offering.jobPostLimit = 2;
    } else if (
      lastUpdate === false &&
      employer.subscription.offering.jobPostLimit === 0
    ) {
      return next(
        new ErrorHandler("You have exhausted your monthly job post limit", 401)
      );
    } else {
    }
  }

  if (
    employer &&
    employer.subscription &&
    employer.subscription.subscriptionType === "professional"
  ) {
    const lastUpdate = await hasOneMonthOrGreaterGap(
      employer.lastJobPostLimitUpdated
    );
    if (lastUpdate === true) {
      employer.lastJobPostLimitUpdated = new Date();
      employer.subscription.offering.jobPostLimit = 10;
    } else if (
      lastUpdate === false &&
      employer.subscription.offering.jobPostLimit === 0
    ) {
      return next(
        new ErrorHandler("You have exhausted your monthly job post limit", 401)
      );
    } else {
    }
  }

  const generatedUuid = uuid.v4();
  const formattedUuid = `CL-${generatedUuid.substring(
    0,
    4
  )}${generatedUuid.substring(generatedUuid.length - 2)}`;
  const jobPostObj = { ...req.body, jobCode: formattedUuid };

  const job = await JobPost.create(jobPostObj);
  if (
    employer &&
    "jobPostLimit" in employer.subscription.offering &&
    typeof employer.subscription.offering.jobPostLimit === "number"
  ) {
    console.log(
      "from job post controller",
      employer.subscription.offering.jobPostLimit
    );
    const lastLimit = employer.subscription.offering.jobPostLimit;
    employer.subscription.offering.jobPostLimit = lastLimit - 1;
  }
  try {
    if (employer) {
      console.log("before update", employer);
      employer.markModified("subscription");

      const u = await employer.save();
      console.log("Updated user", u);
    }
    // sendMail("candidate","jobApplication",{...job,...user});
  } catch (error) {
    console.error("Error saving Employer:", error);
  }

  if (!job) {
    return next(
      new ErrorHandler("Something went wrong while creating job.", 500)
    );
  }

  favCompanyAlertQueue.add({
    companyId,
    employerId,
    jobId: job._id,
    jobTitle: job.title,
    jobDescription: job.description,
  });

  res.status(200).json({
    job,
    success: true,
  });
});

export const updateJobPost = catchAsyncError(async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorHandler("body not found", 400));
  }
  const { _id } = req.body;
  const job = await JobPost.findByIdAndUpdate(_id, req.body);
  if (!job) {
    return next(
      new ErrorHandler("Something went wrong while creating job.", 500)
    );
  }
  res.status(200).json({
    job,
    success: true,
  });
});
export const getDetailsForEmployer = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  if (!req.user) {
    return next(new ErrorHandler("unauthenticated user", 404));
  }
  // console.log("id", id);
  if (!id) {
    return next(new ErrorHandler("job post not found", 400));
  }

  const job = await JobPost.findById(id).populate("companyId");
  // console.log(job);
  if (!job) {
    return next(new ErrorHandler("job post not found", 404));
  }
  // const employer = req.user as IEmployer;
  // console.log(job.employerId.toString() ,"Employer Id")
  // if(job.employerId.toString() !== employer._id){
  //   return next(new ErrorHandler("unauthenticated user", 404));
  // }
  // const alreadyViewed = job.views.filter(
  //   (view) =>
  //     new ObjectId(view.viewed_by).toString() ===
  //     new ObjectId(candidate._id).toString()
  // );
  // console.log(alreadyViewed, "already Viewed");
  // if (alreadyViewed.length === 0) {
  //   job.views.push({
  //     viewed_by: candidate._id,
  //     view_count: 1,
  //     view_timestamp: Date.now().toString(),
  //   });
  //   await job.save();
  // }
  // const score = Math.floor(
  //   calculateMatchScore(
  //     candidate.skills,
  //     job.primarySkills,
  //     job.secondarySkills
  //   )
  // );

  const jobObject = job.toObject();
  const jobWithScore = {
    ...jobObject,
    matchScore: -1,
  };

  // console.log(jobWithScore);

  res.status(200).json({
    job: jobWithScore,
    success: true,
  });
});
export const getDetails = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  // console.log("id", id);
  if (!id) {
    return next(new ErrorHandler("job post not found", 400));
  }

  const job = await JobPost.findById(id).populate("companyId");
  // console.log(job);
  if (!job) {
    return next(new ErrorHandler("job post not found", 404));
  }
  if (!req.user) {
    return next(new ErrorHandler("unauthenticated user", 404));
  }
  const candidate = req.user as ICandidate;
  const alreadyViewed = job.views.filter(
    (view) =>
      new ObjectId(view.viewed_by).toString() ===
      new ObjectId(candidate._id).toString()
  );
  // console.log(alreadyViewed, "already Viewed");
  if (alreadyViewed.length === 0) {
    job.views.push({
      viewed_by: candidate._id,
      view_count: 1,
      view_timestamp: Date.now().toString(),
    });
    await job.save();
  }
  const score = Math.floor(
    calculateMatchScore(
      candidate.skills,
      job.primarySkills,
      job.secondarySkills
    )
  );

  const jobObject = job.toObject();
  const jobWithScore = {
    ...jobObject,
    matchScore: score,
  };

  // console.log(jobWithScore);

  res.status(200).json({
    job: jobWithScore,
    success: true,
  });
});

export const deleteJobPost = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new ErrorHandler("job post not found", 400));
  }

  await JobPost.findByIdAndDelete({ _id: id });
  const p = 1;
  const limit = 8;
  const skip = (p - 1) * limit;

  let result = await JobPost.find({}).skip(skip).limit(limit);
  const totalJobPost = await JobPost.countDocuments({});
  const totalNumOfPage = Math.ceil(totalJobPost / limit);
  console.log(totalNumOfPage);

  res.status(200).json({
    success: true,
    totalNumOfPage,
    totalJobPost,
    result,
  });
});

export const getJobPosts = catchAsyncError(async (req, res, next) => {
  const {
    page,
    location,
    jobType,
    jobCategory,
    workMode,
    status,
    salary,
    preferredExperience,
    candidateId,
    companyId,
    jobCode,
  } = req.query;

  const queryObject: any = {};
  if (location) {
    let desiredLocation: string | string[] = location as string;
    desiredLocation = desiredLocation.split(",");
    queryObject.location = { $in: desiredLocation };
  }
  if (jobCode) {
    queryObject.jobCode = { $regex: jobCode, $options: "i" };
  }
  if (jobType) {
    let desiredJobTypes: string | string[] = jobType as string;
    desiredJobTypes = desiredJobTypes.split(",");
    queryObject.jobType = { $all: desiredJobTypes };
  }
  if (jobCategory) {
    let desiredJobCategory: string | string[] = jobCategory as string;
    desiredJobCategory = desiredJobCategory.split(",");
    queryObject.jobCategory = { $in: desiredJobCategory };
  }
  if (workMode) {
    let desiredWorkMode: string | string[] = workMode as string;
    desiredWorkMode = desiredWorkMode.split(",");
    queryObject.workMode = { $in: desiredWorkMode };
  }
  if (preferredExperience) {
    let desiredExperience: string | string[] = preferredExperience as string;
    desiredExperience = desiredExperience.split(",");
    queryObject.preferredExperience = { $all: desiredExperience };
  }
  if (companyId) {
    queryObject.companyId = companyId;
  }
  if (status) {
    queryObject.status = status;
  }

  //user provides a number, such as salary=4, to find job posts with salary ranges that include this number:
  const userProvidedSalary = Number(salary);
  // if (!isNaN(userProvidedSalary) && salary !== "-1") {
  //   queryObject.$or = [
  //     {
  //       "salary.minimum": { $lte: userProvidedSalary },
  //       "salary.maximum": { $gte: userProvidedSalary },
  //     },
  //     {
  //       "salary.minimum": { $gte: userProvidedSalary },
  //       "salary.maximum": { $lte: userProvidedSalary },
  //     },
  //   ];
  // }
  if (!isNaN(userProvidedSalary) && salary !== "-1") {
    queryObject["salary.maximum"] = { $gte: userProvidedSalary };
  }

  // console.log(page);
  const p = Number(page) || 1;
  const limit = 8;
  const skip = (p - 1) * limit;

  let jobPosts = await JobPost.find(queryObject)
    .skip(skip)
    .limit(limit)
    .populate("companyId", { logo: 1 });
  const totalJobPost = await JobPost.countDocuments(queryObject);
  const totalNumOfPage = Math.ceil(totalJobPost / limit);

  // is jobSaved by the candidate who is requesting
  if (!candidateId) {
    return res.status(200).json({
      success: true,
      totalNumOfPage,
      totalJobPost,
      result: jobPosts,
    });
  }
  const candidate = await Candidate.findById({ _id: candidateId });
  // if (!candidate) {
  //   return next(new ErrorHandler("User not Found", 401));
  // }
  const savedJobs = candidate?.savedJobs as string[];
  let result = jobPosts?.map((job) => {
    const isSaved = savedJobs?.includes(job._id);
    const jobObject = job?.toObject();
    return {
      ...jobObject,
      isSaved,
    };
  });

  res.status(200).json({
    success: true,
    totalNumOfPage,
    totalJobPost,
    result,
  });
});

export const getJobPostsForEmployer = catchAsyncError(
  async (req, res, next) => {
    const { employerId } = req.params;
    const { page, companyId, status, jobCode, title } = req.query;
    const queryObject: any = {};
    queryObject.employerId = employerId;
    if (title) {
      const titleRegExp = new RegExp(`^${title}`, "i");
      queryObject.title = titleRegExp;
    }
    if (status) {
      queryObject.status = status;
    }
    if (companyId) {
      queryObject.companyId = companyId;
    }
    if (jobCode) {
      // Create a regular expression for partial matching
      const jobCodeRegExp = new RegExp(`^${jobCode}`);
      queryObject.jobCode = jobCodeRegExp;
    }

    const p = Number(page) || 1;
    const limit = 8;
    const skip = (p - 1) * limit;
    const jobPosts = await JobPost.find(queryObject)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const currentDate = new Date();
    let updatedJobPosts = [];
    for (const jobPost of jobPosts) {
      if (currentDate > jobPost.deadlineDate) {
        jobPost.status = "expired";
        const updatedJobPost = await jobPost.save();
        updatedJobPosts.push(updatedJobPost);
      }
      else{
        updatedJobPosts.push(jobPost)

      }
    }
    const totalCount = await JobPost.countDocuments(queryObject);
    const totalPages = Math.ceil(totalCount / limit);
    // console.log(totalCount);
    res.status(200).json({
      success: true,
      jobPosts:updatedJobPosts,
      totalPages,
      currentPage: page,
      pageSize: limit,
      totalCount,
    });
  }
);

export const populateJobPost = catchAsyncError(async (req, res, next) => {
  const location = "mockData/jobPost.json";
  let jobPosts: any = "";

  fs.readFile(location, "utf8", async function (err, data) {
    if (err) {
      console.error("There was an error reading the file!", err);
      return;
    }

    jobPosts = JSON.parse(data);
    await JobPost.insertMany(jobPosts);
    // console.log(jobPosts[1]);
  });

  res.send({ msg: "true" });
});

export const getRelatedJobs = catchAsyncError(async (req, res, next) => {
  const { jobId } = req.query;
  if (!req.user) {
    return next(new ErrorHandler("User not authenticated", 401));
  }
  if (!jobId) {
    return next(new ErrorHandler("jobId  not Found", 400));
  }
  const currJob = await JobPost.findById(jobId, "primarySkills");
  if (!currJob) {
    return next(new ErrorHandler("job not Found", 404));
  }
  const relevantJobs = await JobPost.find(
    {
      _id: { $ne: currJob._id },
      primarySkills: {
        $in: currJob?.primarySkills,
      },
    },
    "primarySkills"
  ).sort({ createdAt: -1 });

  const relatedJobs = relevantJobs.map((job) => ({
    job: job,
    score: Math.floor(
      calculateScoreForSkills(job.primarySkills, currJob.primarySkills)
    ),
  }));

  const sortedRelatedJobs = relatedJobs
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(5, relatedJobs.length));
  const jobIds = sortedRelatedJobs.map((job) => job.job._id);
  const fullRelatedJobs = await JobPost.find({ _id: { $in: jobIds } });

  const candidate = req.user as ICandidate;
  const savedJobs = candidate?.savedJobs as string[];
  let result = fullRelatedJobs.map((job) => {
    const isSaved = savedJobs?.includes(job._id);
    const jobObject = job?.toObject();
    return {
      ...jobObject,
      isSaved,
    };
  });

  res.status(200).json({
    success: true,
    jobs: result,
  });
});

export const getAllJobPost = catchAsyncError(async (req, res) => {
  const { page, adminId, companyId, status, jobCode, title } = req.query;
  let p = Number(page) || 1;
  let limit = page ? 8 : 7;
  let skip = (p - 1) * limit;
  const queryObject: any = {};
  if (adminId) {
    queryObject.employerId = adminId;
  }
  if (title) {
    const titleRegExp = new RegExp(`^${title}`, "i");
    queryObject.title = titleRegExp;
  }
  if (status) {
    queryObject.status = status;
  }
  if (companyId) {
    queryObject.companyId = companyId;
  }
  if (jobCode) {
    // Create a regular expression for partial matching
    const jobCodeRegExp = new RegExp(`^${jobCode}`);
    queryObject.jobCode = jobCodeRegExp;
  }
  const jobPosts = await JobPost.find(queryObject)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    const currentDate = new Date();
    let updatedJobPosts = [];
    for (const jobPost of jobPosts) {
      if (currentDate > jobPost.deadlineDate) {
        jobPost.status = "expired";
        const updatedJobPost = await jobPost.save();
        updatedJobPosts.push(updatedJobPost);
      }else{
        updatedJobPosts.push(jobPost)

      }
    }
  const totalDocs = await JobPost.countDocuments(queryObject);
  const totalPages = totalDocs / limit;
  // console.log(totalPages);

  res.status(200).send({ jobPosts: updatedJobPosts, page: p, totalPages, totalDocs });
});

export const getJobPostViews = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  const viewby = req.params.viewby;

  if (!id) {
    res.status(400).send({ msg: "Job post not found!!!" });
    return;
  }
  const viewData = [];
  if (viewby === "month") {
    for (let i = 12; i > 0; i--) {
      const currentDate = new Date();
      const last12Months = new Date(currentDate);
      currentDate.setMonth(currentDate.getMonth() - (i - 1));
      last12Months.setMonth(currentDate.getMonth() - i);
      const doc = await JobPost.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $project: {
            views: {
              $filter: {
                input: "$views",
                as: "view",
                cond: {
                  $and: [
                    { $eq: ["$$view.view_count", 1] },
                    { $gte: ["$$view.view_timestamp", last12Months] },
                    { $lt: ["$$view.view_timestamp", currentDate] },
                  ],
                },
              },
            },
          },
        },
      ]);
      viewData.push(doc[0].views);
    }
  } else if (viewby === "year") {
    const currentYear = new Date().getFullYear();

    for (let i = currentYear - 11; i <= currentYear; i++) {
      const startOfYear = new Date(i, 0, 1);
      const endOfYear = new Date(i + 1, 0, 1);

      const doc = await JobPost.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $project: {
            views: {
              $filter: {
                input: "$views",
                as: "view",
                cond: {
                  $and: [
                    { $eq: ["$$view.view_count", 1] },
                    { $gte: ["$$view.view_timestamp", startOfYear] },
                    { $lt: ["$$view.view_timestamp", endOfYear] },
                  ],
                },
              },
            },
          },
        },
      ]);

      viewData.push(doc[0].views);
    }
  } else if (viewby === "day") {
    const currentDate = new Date();

    for (let i = 11; i >= 0; i--) {
      const currentDay = new Date(currentDate);
      currentDay.setDate(currentDate.getDate() - i);

      const startOfDay = new Date(currentDay);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(currentDay);
      endOfDay.setHours(23, 59, 59, 999);

      const doc = await JobPost.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $project: {
            views: {
              $filter: {
                input: "$views",
                as: "view",
                cond: {
                  $and: [
                    { $eq: ["$$view.view_count", 1] },
                    { $gte: ["$$view.view_timestamp", startOfDay] },
                    { $lt: ["$$view.view_timestamp", endOfDay] },
                  ],
                },
              },
            },
          },
        },
      ]);

      viewData.push(doc[0].views);
    }
  }

  // Access the filtered views array
  const filteredViews = viewData;
  res.status(200).send({ data: filteredViews });
});

export const addJobPostViews = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.send(400).send({ msg: "Job post id not found!!!" });
    return;
  }
  const doc = await JobPost.findById(id);

  if (!doc) {
    res.status(404).send({ msg: "Job post not found!!!" });
    return;
  }

  // doc.views.push({
  //   view_count: 1,
  //   view_timestamp: Date.now().toString(),
  // });

  const document = await doc.save();

  res.status(200).send({ data: document });
});

export const getJobPostsForEmployerDashboard = catchAsyncError(
  async (req, res) => {
    const id = req.params.id;
    const data = await JobPost.find({ employerId: id })
      .sort({ createdAt: -1 })
      .limit(6);
    // console.log(data);
    res.status(200).send({ data: data });
  }
);

export const getJobDetailsForEmployerDashBoardCards = catchAsyncError(
  async (req, res) => {
    const id = req.params.id;
    const data = await JobPost.find({ employerId: id }).select({
      views: 1,
      candidates: 1,
    });

    const totalViews = data.reduce(
      (acc, jobPost) => acc + jobPost.views.length,
      0
    );
    const totalApplications = data.reduce(
      (acc, jobPost) => acc + jobPost.candidates.length,
      0
    );

    res.status(200).send({
      success: true,
      totalViews,
      totalApplications,
    });
  }
);

export const getJobDetailsForEmployerChartNiceSelect = catchAsyncError(
  async (req, res) => {
    const id = req.params.id;
    const data = await JobPost.find({ employerId: id })
      .sort({ createdAt: -1 })
      .select({ _id: 1, title: 1, createdAt: 1 });
    res.status(200).send({ data: data });
  }
);

export const getJobPostByCreatedDate = catchAsyncError(async (req, res) => {
  const viewby = req.params.viewby;
  const jobPostsByJoiningDate = [];
  if (viewby === "month") {
    const currentDate = new Date();
    for (let i = 11; i >= 0; i--) {
      const endMonth = new Date(currentDate);
      const startMonth = new Date(currentDate);
      startMonth.setMonth(currentDate.getMonth() - (i - 1));
      endMonth.setMonth(currentDate.getMonth() - i);
      endMonth.setDate(1);
      //   currentDate.setDate(1);

      const docs = await JobPost.aggregate([
        {
          $match: {
            createdAt: {
              $gte: endMonth,
              $lt: startMonth,
            },
          },
        },
      ]);

      const count = docs ? docs.length : 0;
      jobPostsByJoiningDate.push(count);
    }
  } else if (viewby === "year") {
    const currentYear = new Date().getFullYear();

    for (let i = currentYear - 11; i <= currentYear; i++) {
      const startOfYear = new Date(i, 0, 1);
      const endOfYear = new Date(i + 1, 0, 1);

      const docs = await JobPost.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startOfYear,
              $lt: endOfYear,
            },
          },
        },
      ]);

      const count = docs ? docs.length : 0;
      jobPostsByJoiningDate.push(count);
    }
  } else if (viewby === "day") {
    const currentDate = new Date();

    for (let i = 11; i >= 0; i--) {
      const currentDay = new Date(currentDate);
      currentDay.setDate(currentDate.getDate() - i);

      const startOfDay = new Date(currentDay);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(currentDay);
      endOfDay.setHours(23, 59, 59, 999);

      const docs = await JobPost.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startOfDay,
              $lt: endOfDay,
            },
          },
        },
      ]);

      const count = docs ? docs.length : 0;
      jobPostsByJoiningDate.push(count);
    }
  }

  res.send(jobPostsByJoiningDate);
});
