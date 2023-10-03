import mongoose, { Schema, Document } from 'mongoose';
import { IJobPost } from '../types/user';


const jobPostSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship'],
        required: true,
    },
    skillsRequired: {
        type: [String],
        required: true,
    },
    preferredExperience: {
        type: String,
        required: true,
    },
    companyId: {
        type: mongoose.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    // You can add more fields here as needed for job posts
});

// Create and export the Job Post model
const JobPost = mongoose.model<IJobPost>('JobPost', jobPostSchema);

export default JobPost;
