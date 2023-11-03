import mongoose, { Schema } from 'mongoose';
import { IChat } from '../types/user';

const chatSchema: Schema = new mongoose.Schema({
    jobApp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobApp',
        required: true,
    },
    participants: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Employer',
            },
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Candidate',
            },
        ],
        // validate: {
        //     validator: function (participants: any) {
        //         // Ensure that there are exactly 2 participants
        //         return participants.length === 2 &&
        //             participants[0].ref === 'Employer' &&
        //             participants[1].ref === 'Candidate';
        //     },
        //     message: 'A chat must have exactly one employer and one candidate.'
        // }
    },
    messages: [
        {
            role: {
                type: String,
                enum: ["candidate", "employer"]
            },
            userId: String,
            text: String,
            timestamp: { type: Date, default: Date.now },
        }
    ]
}, { timestamps: true });

const Chat = mongoose.model<IChat>('Chat', chatSchema);
export default Chat;