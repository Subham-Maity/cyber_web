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
interface IEducation {
    degree: string;
    field: string;
    institute: string;
    startYear: string;
    endYear: string;
    description: string;
}
interface IExperience {
    title: string;
    company: string;
    startYear: string;
    endYear: string;
    description: string;
}
export interface ICandidate extends Document {
    email: string;
    isEmailVerified: boolean;
    firstName: string;
    lastName: string;
    avatar: string;
    phoneNumber: string,
    password: string;
    resume: string[],
    signInProvider: "linkedIn" | "jwt"
    skills: string[],
    role: string,
    experience: IExperience[],
    education: IEducation[],
    socialSites: string[];
    bio: string,
    createJWT(accessToken?: string): string;
    comparePassword(givenPassword: string): Promise<boolean>;
}

export interface IEmployer extends Document {
    email: string;
    isEmailVerified: boolean;
    firstName: string;
    lastName: string;
    avatar: string;
    phoneNumber: string,
    companyName: string,
    password: string;
    location: string,
    resume: string,
    role: string,
    industry: string,
    description: string,
    jobs: string,
    signInProvider: "linkedIn" | "jwt"
    createJWT(accessToken?: string): string;
    comparePassword(givenPassword: string): Promise<boolean>;

}

interface ILocation {
    locality: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    maplocation: string;
}

export interface ICompany extends Document {
    name: string;
    email: string;
    logo: string;
    contactNumber?: string;
    website: string;
    foundedDate: Date;
    location: ILocation[];
    teamSize: string;
    category: string;
    about: string;
    jobPosts: string[];
    socialSites: string[];
}

export interface IJobPost extends Document {
    title: string;
    description: string;
    location: string;
    jobType: 'full-time' | 'part-time' | 'internship' | 'hourly-contract' | 'fixed-price';
    jobCategory?: string;
    skillsRequired: string[];
    salary: {
        minimum: string;
        maximum: string;
        isDisclosed: boolean;
    };
    preferredExperience: string;
    companyId: mongoose.Types.ObjectId;
    experience?: string;
    industry?: string;
    fileAttachment?: {
        data: Buffer;
        contentType: string;
    };
}

export interface IControlledFieldSchema extends Document {
    companyCategory: string[],
    jobTitle: string[],
    jobCategory: string[],
    jobIndustry: string[],
}
