import mongoose, { Schema } from 'mongoose';
import { IFeedback } from '../types/jobApp';

const FeedbackSchema: Schema = new mongoose.Schema({
    jobApp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobApp',
        required: true,
    },
    candidateQuestion: {
        candidateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Candidate"
        },
        question: String
    },
    employerResponse: {
        employerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employer"
        },
        response: String
    }

}, { timestamps: true });

const Feedback = mongoose.model<IFeedback>('Feedback', FeedbackSchema);
export default Feedback;