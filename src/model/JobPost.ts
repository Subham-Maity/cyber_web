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
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        // enum: ['full-time', 'part-time', 'internship', 'hourly-contract', 'fixed-price'],
        required: true,
    },
    jobCategory: {
        type: String
    },
    skillsRequired: {
        type: [String],
        default: []
    },
    salary: {
        minimum: String,
        maximum: String,
        isDisclosed: Boolean
    },
    preferredExperience: {
        type: String,
    },
    // companyId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Company',
    // },
    fileAttachment: {
        data: Buffer,
        contentType: String,
    }
});

// Create and export the Job Post model
const JobPost = mongoose.model<IJobPost>('JobPost', jobPostSchema);

export default JobPost;
