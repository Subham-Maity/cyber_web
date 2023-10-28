import mongoose, { Document } from "mongoose";
export interface AdminDocument extends Document {
    name: string;
    email: string;
    password: string,
    avatar: string,
    role: string;
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
    experienceInShort: string,
    gender: string,
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
interface IFunding {
    amount: string,
    fundedBy: string,
    yearOfFunding: string,
    round: string,
}

export interface ICompany extends Document {
    name: string;
    email: string;
    logo: string;
    contactNumber?: string;
    website: string;
    founderName: string;
    foundedDate: Date;
    funding: IFunding[];
    location: ILocation[];
    teamSize: string;
    category: string;
    about: string;
    jobPosts: string[];
    socialSites: string[];
    benefits: string[];
}

export interface IJobPost extends Document {
    title: string;
    description: string;
    location: string;
    jobType: string[];
    jobCategory: string;
    workMode: string;
    preferredLanguage: string;
    primarySkills: string[];
    secondarySkills: string[];
    salary: {
        minimum: number;
        maximum: number;
        isDisclosed: boolean;
    };
    status: "active" | "expired",
    preferredExperience: string[];
    companyId: mongoose.Types.ObjectId;
    employerId: mongoose.Types.ObjectId;
    candidates: mongoose.Types.ObjectId[];
    testQuestions: string;
}

export interface IControlledFieldSchema extends Document {
    companyCategory: string[],
    jobTitle: string[],
    jobCategory: string[],
    jobIndustry: string[],
}

export interface IJobApp extends Document {
    candidate: string,
    jobPost: string,
    status: string,
}

