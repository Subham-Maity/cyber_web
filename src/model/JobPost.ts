import mongoose, { Schema, Document } from 'mongoose';
import { IJobPost } from '../types/user';


const jobPostSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: [String],
        required: true,
    },
    benefits: {
        type: [String],
    },
    jobType: {
        type: [String],
        // enum: ['full-time', 'part-time', 'internship', 'hourly-contract', 'fixed-price'],
        required: true,
    },
    jobCategory: {
        type: String
    },
    workMode: {
        type: String
    },
    preferredLanguage: {
        type: String
    },
    primarySkills: {
        type: [String],
        default: []
    },
    secondarySkills: {
        type: [String],
        default: []
    },
    salary: {
        minimum: Number,
        maximum: Number,
        isDisclosed: Boolean
    },
    preferredExperience: {
        type: [String],
    },
    companyId: {
        type: mongoose.Types.ObjectId,
        ref: 'Company',
    },
    testQuestions: {
        type: String
    }

},
    { timestamps: true }
);

// Create and export the Job Post model
const JobPost = mongoose.model<IJobPost>('JobPost', jobPostSchema);

export default JobPost;
