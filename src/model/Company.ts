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
    logo: {
        type: String,
        required: true,
        default: "none"
    },
    contactNumber: {
        type: String,
    },
    website: {
        type: String,
        required: true
    },
    foundedDate: {
        type: Date,
    },
    location: [
        {
            locality: String,
            city: String,
            state: String,
            country: String,
            zipcode: String,
            maplocation: String,

        }
    ],
    teamSize: {
        type: String,
        required: true,
    },
    category: {
        type: String
    },
    about: {
        type: String,
    },
    jobPosts: {
        type: [String],
        default: [],
    },
    socialSites: {
        type: [String],
        default: [],
    },
});


const Company = mongoose.model<ICompany>('Company', companySchema);

export default Company;
