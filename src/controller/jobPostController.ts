import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import JobPost from "../model/JobPost";
import JobPosition from "../model/JobPosition";
export const addJobPost = catchAsyncError(async (req, res, next) => {

    if (!req.body) {
        return next(new ErrorHandler("body not found", 400));
    }

    const job = await JobPost.create(req.body);



    res.status(200).json({
        job,
        success: true,


    })
})


export const getJobPosts = catchAsyncError(async (req, res, next) => {


    const jobs = await JobPost.find();
    async function saveJobPositions() {
        try {


            for (const jobName of jobPositions) {
                const job = new JobPosition({ name: jobName });
                await job.save();
                console.log(`Saved job: ${jobName}`);
            }

            console.log('All job positions saved to the database.');
        } catch (error) {
            console.error('Error saving job positions:', error);
        }
    }

    // Call the function to save the job positions
    saveJobPositions();



    res.status(200).json({
        jobs,
        success: true,


    })
})


export const getJobAutoComplete = catchAsyncError(async (req, res, next) => {
    const result = await JobPosition.aggregate([
        {
            "$search": {
                "autocomplete": {
                    "query": `${req.query.query}`,
                    "path": "name",
                    "fuzzy": {
                        "maxEdits": 2,
                        "prefixLength": 3
                    }
                }
            }
        }
    ]).exec(); // Use exec() to execute the aggregation

    res.send(result);

})
// server.get("/search", async (request, response) => {
//     try {

//     } catch (e) {
//         response.status(500).send({ message: e.message });
//     }
// });


// Sample Job Positions
const jobPositions = [
    "Cybersecurity Analyst",
    "Information Security Officer",
    "Network Security Engineer",
    "Penetration Tester",
    "Security Consultant",
    "Security Architect",
    "Cybersecurity Manager",
    "Incident Response Analyst",
    "Security Operations Center (SOC) Analyst",
    "Vulnerability Analyst",
    "Security Compliance Analyst",
    "Forensic Analyst",
    "Security Auditor",
    "Ethical Hacker",
    "Chief Information Security Officer (CISO)",
    "Security Awareness Trainer",
    "Security Risk Analyst",
    "Cloud Security Engineer",
    "Application Security Engineer",
    "Security Software Developer",
    "Security Researcher",
    "Security Data Analyst",
    "Threat Intelligence Analyst",
    "Security Governance Manager",
    "Security Policy Analyst",
    "Identity and Access Management (IAM) Specialist",
    "Security Operations Manager",
    "Cybersecurity Sales Engineer",
    "Security Incident Responder",
    "Security Compliance Manager",
    "Security Awareness Manager",
    "Security Education Coordinator",
    "Security Operations Specialist",
    "Security Systems Administrator",
    "Network Security Administrator",
    "Security Test Engineer",
    "Security Product Manager",
    "Security Compliance Specialist",
    "Security Awareness Specialist",
    "Security Incident Manager",
    "Security Risk Manager",
    "Security Research Analyst",
    "Security Data Scientist",
    "Security Compliance Officer",
    "Security Awareness Coordinator",
    "Security Operations Coordinator",
    "Security Policy Manager",
    "Security Compliance Coordinator",
    "Security Awareness Officer",
    "Security Education Manager",
];

// You can use this array to implement autocomplete functionality in your application.
