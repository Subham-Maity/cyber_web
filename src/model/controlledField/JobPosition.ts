import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the job schema
interface IJob extends Document {
    name: string;
}

const jobSchema: Schema<IJob> = new Schema({
    name: { type: String, required: true },
});


const JobPosition = mongoose.model<IJob>('JobPosition', jobSchema);

export default JobPosition;
// Function to save job positions to the database
