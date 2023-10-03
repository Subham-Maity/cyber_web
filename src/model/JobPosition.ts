import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the job schema
interface IJob extends Document {
    name: string;
}

const jobSchema: Schema<IJob> = new Schema({
    name: { type: String, required: true },
});

// Define the job model
const JobModel: Model<IJob> = mongoose.model('Job', jobSchema);

// Sample Job Positions
const jobPositions: string[] = [
    "Cybersecurity Analyst",
    "Information Security Officer",
    // Add the rest of the job positions here
];

const JobPosition = mongoose.model<IJob>('JobPosition', jobSchema);

export default JobPosition;
// Function to save job positions to the database
