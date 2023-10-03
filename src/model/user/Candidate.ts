import mongoose, { Model } from "mongoose";
import { ICandidate } from "../../types/user";
import jwt from "jsonwebtoken";

const candidateSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        default: "candidate"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // validate: [validator.isEmail, "please enter a valid email"],
    },
    isEmailVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    avatar: {
        type: String,
        default: "none"
    },
    phoneNumber: {
        type: String,
        default: "none"
    },
    resume: {
        type: String,
        default: "none"
    },
    experience: {
        type: String,
        default: "none"
    },
    education: {
        type: String,
        default: "none"
    },
    skills: {
        type: [String],

    },
},
    { timestamps: true }
);


interface CandidateModel extends Model<ICandidate> { }

candidateSchema.methods.createJWT = function (this: ICandidate, accessToken: string) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment.");
    }
    return jwt.sign({ id: this._id, accessToken }, process.env.JWT_SECRET, { expiresIn: "60d" });
};

export default mongoose.model<ICandidate, CandidateModel>('Candidate', candidateSchema);
