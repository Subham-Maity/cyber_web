import mongoose, { Schema } from 'mongoose';
import { ICompany } from '../types/user';
const companySchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: true,
    },
    teamSize: {
        type: String,
        required: true,
    },
    about: {
        type: String,
    },
    jobPosts: {
        type: [String], // Assuming job posts are stored as an array of strings
        default: [], // You can set a default value if needed
    },
});


const Company = mongoose.model<ICompany>('Company', companySchema);

export default Company;
