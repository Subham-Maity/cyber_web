import mongoose, { Document } from "mongoose";

interface IChatParticipant {
    type: mongoose.Types.ObjectId;
}

interface IChatMessage {
    role: 'candidate' | 'employer';
    userId: string;
    text: string;
    timestamp: Date;
}
export interface IChat extends Document {
    jobApp: mongoose.Types.ObjectId;
    participants: [IChatParticipant, IChatParticipant];
    messages: IChatMessage[];
}