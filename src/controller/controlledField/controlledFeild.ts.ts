import catchAsyncError from '../../middleware/catchAsyncError.js';

export const getAutoComplete = (model: any) => {
    return catchAsyncError(async (req, res, next) => {
        const result = await model.aggregate([
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
            },
            {
                "$project": {
                    "_id": 1,
                    "name": 1 // Include the 'name' field in the result
                }
            }

        ]).exec(); // Use exec() to execute the aggregation

        res.send(result);

    })
}
// export const getJobPosts = catchAsyncError(async (req, res, next) => {


//     // const jobs = await JobPost.find();
//     async function saveJobPositions() {
//         try {


//             for (const jobName of jobPositions) {
//                 const job = new JobPosition({ name: jobName });
//                 await job.save();
//                 console.log(`Saved job: ${jobName}`);
//             }

//             console.log('All job positions saved to the database.');
//         } catch (error) {
//             console.error('Error saving job positions:', error);
//         }
//     }

//     // Call the function to save the job positions
//     saveJobPositions();



//     res.status(200).json({
//         jobs,
//         success: true,


//     })
// })


