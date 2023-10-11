import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import JobPost from "../model/JobPost";
import JobPosition from "../model/controlledField/JobPosition";
import JobCategory from "../model/controlledField/jobCategory";
import CompanyCategory from "../model/controlledField/companyCategory";
import fs from 'fs'



export const addJobPost = catchAsyncError(async (req, res, next) => {

    if (!req.body) {
        return next(new ErrorHandler("body not found", 400));
    }
    const bodyObj = JSON.parse(req.body.bodyObj);
    console.log(bodyObj)

    if (req.file) {
        const filePath = `uploads/${req.file?.filename}`
        const fileData = fs.readFileSync(filePath)

        const fileAttachment = {
            data: fileData,
            contentType: req.file?.mimetype
        }
        bodyObj.fileAttachment = fileAttachment;
    }
    console.log(bodyObj)



    const job = await JobPost.create(bodyObj);

    res.status(200).json({
        job,
        success: true,
    })
})


export const getJobPosts = catchAsyncError(async (req, res, next) => {


    // const jobs = await JobPost.find();
    // async function saveJobPositions() {
    //     try {


    //         for (const jobName of jobPositions) {
    //             const job = new JobPosition({ name: jobName });
    //             await job.save();
    //             // console.log(`Saved job: ${jobName}`);
    //         }

    //         console.log('All job positions saved to the database.');
    //     } catch (error) {
    //         console.error('Error saving job positions:', error);
    //     }
    // }

    // // Call the function to save the job positions
    // saveJobPositions();



    res.status(200).json({

        success: true,


    })
})






// Sample Job Positions
const jobPositions = [

    'Information Security Analyst',
    'Cybersecurity Engineer',
    'Network Security Administrator',
    'Security Consultant',
    'Penetration Tester (Ethical Hacker)',
    'Security Architect',
    'Chief Information Security Officer (CISO)',
    'Security Operations Center (SOC) Analyst',
    'Incident Responder',
    'Vulnerability Analyst',
    'Security Compliance Analyst',
    'Security Awareness Training Specialist',
    'Cybersecurity Risk Analyst',
    'Security Software Developer',
    'Cryptographer',
    'Security Researcher',
    'Threat Intelligence Analyst',
    'Security Auditor',
    'Forensic Analyst',
    'Security Operations Manager',
];

// You can use this array to implement autocomplete functionality in your application.
