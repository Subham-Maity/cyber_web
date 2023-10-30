import mongoose, { Model } from "mongoose";
import { IEmployer } from "../../types/user";
import jwt from "jsonwebtoken";

const employerSchema = new mongoose.Schema({
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
        default: "employer"
    },
    password: {
        type: String,
        minlength: [6, "password should have a minimum of 6 characters"],
        select: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // validate: [validator.isEmail, "please enter a valid email"],
    },
    freeCount: {
        type: Number,
        default: 5,
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
    companyName: {
        type: String,

    },
    location: {
        type: String,

    },
    industry: {
        type: String,

    },
    description: {
        type: String,

    },
    socialSites: {
        type: [String],
        default: [],
    },
    jobs: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'JobPost',
        },
    ],
    signInProvider: {
        type: String,
        enum: ["linkedIn", "jwt"]
    },
    savedCandidates: [{ type: mongoose.Types.ObjectId, ref: 'Candidate' }]

},
    { timestamps: true }
);


interface CandidateModel extends Model<IEmployer> { }

employerSchema.methods.createJWT = function (this: IEmployer, accessToken: string) {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment.");
    }
    return jwt.sign({ id: this._id, accessToken }, process.env.JWT_SECRET, { expiresIn: "60d" });
};

export default mongoose.model<IEmployer, CandidateModel>('Employer', employerSchema);
