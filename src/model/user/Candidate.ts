import mongoose, { Model } from "mongoose";
import { ICandidate } from "../../types/user";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import JobPost from "../JobPost";

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
    gender: {
        type: String,
    },
    experienceInShort: {
        type: String,
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
    // password: {
    //     type: String,
    //     minlength: [6, "password should have a minimum of 6 characters"],
    //     select: false,
    // },
    avatar: {
        type: String,
        default: "none"
    },
    phoneNumber: {
        type: String,
        default: "none"
    },
    resume: {
        type: [String],
        default: "none"
    },
    education: [
        {
            degree: String,
            field: String,
            institute: String,
            startYear: String,
            endYear: String,
            description: String
        }
    ],
    experience: [
        {
            title: String,
            company: String,
            startYear: String,
            endYear: String,
            description: String
        }
    ],
    location:
    {
        locality: String,
        city: String,
        country: String,

    }
    ,
    socialSites: {
        type: [String],
        default: [],
    },
    skills: {
        type: [String],
        default: [],

    },
    freeCount: {
        type: Number,
        default: 5,
    },
    bio: {
        type: String,
    },
    testScore: {
        type: Number,
    },
    notifications: [
        {
            sender: { type: mongoose.Types.ObjectId, ref: 'Employer' },
            message: String,
            redirectUrl: String,
            timestamp: { type: Date, default: Date.now },
            isRead: { type: Boolean, default: false },
        },
    ],
    savedJobs: [{ type: mongoose.Types.ObjectId, ref: 'JobPost' }],
    savedCompanies: [{ type: mongoose.Types.ObjectId, ref: 'Company' }],
},
    { timestamps: true }
);


interface CandidateModel extends Model<ICandidate> { }

candidateSchema.pre<ICandidate>('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

candidateSchema.methods.createJWT = function (this: ICandidate, accessToken?: string) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment.");
    }

    interface Payload {
        id: string;
        accessToken?: string;
    }
    const payload: Payload = {
        id: this._id,
    };

    if (accessToken) {
        payload.accessToken = accessToken;
    }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "60d" });
};

candidateSchema.methods.comparePassword = async function (this: ICandidate, givenPassword: string) {
    const isMatch = await bcrypt.compare(givenPassword, this.password);
    return isMatch;
};

export default mongoose.model<ICandidate, CandidateModel>('Candidate', candidateSchema);
