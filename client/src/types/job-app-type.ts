import { IJobPost } from "./jobPost-type";
import { ICandidate } from "./user-type";

export interface IJobApp {
    candidate: string | ICandidate,
    jobPost: string | IJobPost,
    status: string,
    testScore: number,
    appliedWithResume: string,
    jobLetter: string,
    isFeedbackAsked: boolean,
    __v: number,
    _id: string,
    createdAt: string,
    updatedAt: string,
    profileMatchPercent:number
}

export interface IChatMessage {
    role: 'candidate' | 'employer';
    userId: string;
    text: string;
    timestamp: Date;
    _id?: string;
}
export interface IChat {
    _id: string
    jobApp: string;
    participants: [string, string];
    messages: IChatMessage[];
}
export interface IFeedback {
    jobApp: string;
    candidateQuestion: {
        candidateId: string,
        question: string,
    };
    employerResponse?: {
        employerId: string,
        response: String
    }
}