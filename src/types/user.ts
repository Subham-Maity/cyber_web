import mongoose, { Document } from "mongoose";
export interface AdminDocument extends Document {
    name: string;
    email: string;
    uid: string;
    password: string;
    role: 'superAdmin' | 'admin' | 'vendor';
    category: string;
    mediaType: String;
    createJWT(): string;
    comparePassword(givenPassword: string): Promise<boolean>;
}
export interface ICandidate extends Document {
    email: string;
    isEmailVerified: boolean;
    firstName: string;
    lastName: string;
    avatar: string;
    phoneNumber: string,
    resume: string,
    skills: string[],
    experience: string,
    education: string,
}



export interface ICompany extends Document {
    name: string;
    email: string;
    location: string;
    teamSize: number;
    about: string;
    jobPosts: string[];
}

export interface IJobPost extends Document {
    title: string;
    description: string;
    location: string;
    jobType: 'full-time' | 'part-time' | 'internship';
    skillsRequired: string[];
    preferredExperience: string;
    companyId: mongoose.Types.ObjectId;

}