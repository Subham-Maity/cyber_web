import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import JobApp from "../model/JobApp";
import Candidate from "../model/user/Candidate";
import { ICandidate } from "../types/user";
import { calculateMatchScore, hasOneMonthOrGreaterGap } from "../utils/helper";
import JobPost from "../model/JobPost";
import { sendMail } from "../utils/nodemailer";
import Employer from "../model/user/Employer";

export const createJobApp = catchAsyncError(async (req, res, next) => {
  if (!req.body) {
    return next(new ErrorHandler("body not found", 400));
  }
  const { candidate, jobPost } = req.body;

  if (!candidate || !jobPost) {
    return next(new ErrorHandler("candidate or jobPost is missing", 400));
  }
  const requestingUser = req?.user as ICandidate;
  const user = await Candidate.findById(requestingUser?._id || "");
  const job = await JobPost.findById(jobPost);

  // if (user && user.subscription.offering.applyJobLImit === 0) {
  //   return next(
  //     new ErrorHandler(
  //       "You can't Apply more with you current plan Upgrade your plan to increase you daily limit maximum jobs you can apply",
  //       400
  //     )
  //   );
  // }
  if (
    user &&
    user.subscription &&
    user.subscription.subscriptionType === "foundational"
  ) {
    const lastUpdate = await hasOneMonthOrGreaterGap(
      user.lastJobAppLimitUpdated
    );
    if (lastUpdate === true) {
      user.lastJobAppLimitUpdated = new Date();
      user.subscription.offering.jobApplicationLimit = 5;
    } else if (
      lastUpdate === false &&
      user.subscription.offering.jobApplicationLimit === 0
    ) {
      return next(
        new ErrorHandler("You have exhausted your monthly job apply limit", 401)
      );
    } else {
    }
  }
  const score = Math.floor(
    calculateMatchScore(
      user?.skills as string[],
      job?.primarySkills as string[],
      job?.secondarySkills as string[]
    )
  );
  req.body.profileMatchPercent = score;

  const jobApp = await JobApp.create(req.body);
  if (
    user &&
    "jobApplicationLimit" in user.subscription.offering &&
    typeof user.subscription.offering.jobApplicationLimit === "number"
  ) {
    console.log(
      "from job application",
      user.subscription.offering.jobApplicationLimit
    );
    const lastLimit = user.subscription.offering.jobApplicationLimit;
    user.subscription.offering.jobApplicationLimit = lastLimit - 1;
  }
  try {
    if (user) {
      console.log("before update", user);
      user.markModified("subscription");

      const u = await user.save();
      console.log("Updated user", u);
    }
    // sendMail("candidate","jobApplication",{...job,...user});
  } catch (error) {
    console.error("Error saving user:", error);
  }

  const notificationObject = {
    sender: user?._id,
    message: `You have a job application for ${job?.title
      } (${job?.jobCode
      }) from ${user?.firstName}`,
    redirectUrl: `/dashboard/employer-dashboard/jobs`,
  };
  const employer = await Employer.findByIdAndUpdate(job?.employerId, {
    $push: { notifications: notificationObject }
  });

  job?.candidates.push(requestingUser?._id);
  await job?.save();
  res.status(200).json({
    jobApp,
    success: true,
  });
});

export const getAllAppByCandidate = catchAsyncError(async (req, res, next) => {
  const { id: candidate } = req.params;
  if (!candidate) {
    return next(new ErrorHandler("candidate no found", 404));
  }
  console.log(candidate);
  const allJobApp = await JobApp.find({ candidate });
  console.log(allJobApp.length);

  res.status(200).json({
    allJobApp,
    success: true,
  });
});

export const getAllJobAppByCandidate = catchAsyncError(
  async (req, res, next) => {
    const { id: candidate, page } = req.params;
    if (!candidate) {
      return next(new ErrorHandler("candidate no found", 404));
    }

    let p = Number(page) || 1;
    let limit = 6;
    let skip = (p - 1) * limit;
    const totalCount = await JobApp.countDocuments({ candidate }).populate(
      "jobPost"
    );
    const totalPages = Math.ceil(totalCount / limit);
    // const allJobApp = await JobApp.find({ candidate });
    // const allJobPost= await JobPost.find()
    const allJobApp = await JobApp.find({ candidate })
      .sort({ createdAt: -1 })
      .populate("jobPost")
      .skip(skip)
      .limit(limit);
    // console.log(allJobApp);

    res.status(200).json({
      allJobApp,
      totalPages,
      totalJobApplied: totalCount,
      itemsPerPage: limit,
      currentPage: page,
      success: true,
    });
  }
);
export const getAllCandidateAppByJob = catchAsyncError(
  async (req, res, next) => {
    const { id: jobPost } = req.params;
    const { candidateName, testScore, status, matchPercent } = req.query;
    if (!jobPost) {
      return next(new ErrorHandler("candidate no found", 404));
    }
    const candidateFilters: any = {};
    const jobAppFilter: any = {};
    if (candidateName) {
      candidateFilters.firstName = new RegExp(`^${candidateName}`, "i"); // Case-insensitive search
    }
    if (testScore) {
      jobAppFilter.testScore = { $gte: parseInt(testScore as string) }; // Assuming testScore is a numerical field
    }
    if (status) {
      jobAppFilter.status = status;
    }
    if (matchPercent) {
      jobAppFilter.profileMatchPercent = {
        $gte: parseInt(matchPercent as string),
      }; // Assuming matchPercent is a numerical field
    }

    const matchingCandidates = await Candidate.find(candidateFilters);

    // Extract the _id values of matching candidates
    const matchingCandidateIds = matchingCandidates.map(
      (candidate) => candidate._id
    );

    const allJobApp = await JobApp.find({
      jobPost,
      candidate: { $in: matchingCandidateIds },
      ...jobAppFilter,
    })
      .sort({ createdAt: -1 })
      .populate("candidate");

    console.log(allJobApp.length);

    res.status(200).json({
      allJobApp,
      success: true,
    });
  }
);

export const getAllAppByJobPost = catchAsyncError(async (req, res, next) => {
  const { id: jobPost } = req.params;
  if (!jobPost) {
    return next(new ErrorHandler("jobPost no found", 404));
  }
  const allJobApp = await JobApp.find({ jobPost });

  res.status(200).json({
    allJobApp,
    success: true,
  });
});

export const updateStatus = catchAsyncError(async (req, res, next) => {
  const { status, id, candidateId, employerId, redirectUrl } = req.body;
  // console.log(req.body);

  if (!status) {
    return next(new ErrorHandler("status not found", 404));
  }

  const jobApp = await JobApp.findById({ _id: id });
  if (!jobApp) {
    return next(new ErrorHandler("Job Application not found", 404));
  }
  jobApp.status = status;
  await jobApp.save();

  const notification = {
    sender: employerId,
    message: "There is update in your job Application",
    redirectUrl,
  };

  // Add the notification to the recipient's user document
  const jobPost = await JobPost.findById(jobApp.jobPost)
  const candidate = await Candidate.findByIdAndUpdate(
    candidateId,
    {
      $push: { notifications: notification },
    },
    { new: true }
  );
  if (!candidate || !jobPost) {
    return next(new ErrorHandler("candidate or jobPost not  found", 404));
  }
  const notificationObject =
    candidate.notifications[candidate.notifications.length - 1];
  // console.log(notificationObject);
  // console.log(jobPost,"This is jobPost")
  if (status === "Shortlisted") {
    await sendMail("candidate", "Shortlisted", { email: candidate.email, ...jobPost.toObject() });
  }
  res.status(200).json({
    success: true,
    notification: notificationObject,
  });
});
export const getAllShortlistedJobAppByCandidateId = catchAsyncError(
  async (req, res) => {
    const id = req.params.id;
    const data = await JobApp.find({ candidate: id, status: "Shortlisted" });
    res.status(200).send({ data: data.length });
  }
);
