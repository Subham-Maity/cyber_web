import mongoose, { Document } from "mongoose";

export interface IJobApp extends Document {
    candidate: string,
    jobPost: string,
    testScore: number,
    appliedWithResume: string,
    jobLetter: string,
    isFeedbackAsked: boolean,
    status: string,
}

// feedback
export interface IFeedback extends Document {
    jobApp: mongoose.Types.ObjectId;
    candidateQuestion: {
        candidateId: mongoose.Types.ObjectId,
        question: string,
    };
    employerResponse: {
        employerId: mongoose.Types.ObjectId,
        response: String
    }
}