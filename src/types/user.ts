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
interface INotification {
    sender: string,
    message: String,
    redirectUrl: String,
    timestamp: Date,
    isRead: boolean,
    _id: mongoose.Types.ObjectId
}
interface IResume {
    name: String,
    s3Key: String,
}
interface ISocial {
    linkedIn: string,
    twitter: string,
    github: string,
    website: string,
}
interface FSocial {
    linkedIn: string,
    twitter: string,
    facebook: string,
    website: string,
}

export interface ICandidate extends Document {
    email: string;
    isEmailVerified: boolean;
    firstName: string;
    lastName: string;
    avatar: string;
    phoneNumber: string,
    password: string;
    resumes: IResume[],
    signInProvider: "linkedIn" | "jwt"
    skills: string[],
    role: string,
    location: ILocation,
    expectedSalary: {
        currency: string,
        salary: number,
        period: string
    },
    profileCompleted: number,
    experience: IExperience[],
    education: IEducation[],
    socialSites: ISocial;
    experienceInShort: string,
    gender: string,
    bio: string,
    isSaved?: boolean,
    savedJobs: string[] | IJobPost[];
    savedCompanies: string[] | ICompany[];
    notifications: INotification[];
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
    company: {
        name: string,
        companyId: mongoose.Types.ObjectId,
    },
    password?: string;
    location: ILocation,
    resume: string,
    industry: string,
    socialSites: FSocial;
    description: string,
    gender: "male" | "female" | "others";
    freeCount: string;
    jobs: string[],
    role: string,
    bio: string,
    signInProvider?: "linkedIn" | "jwt"
    savedCandidates: string[],
    _id: string,
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
    isSaved?: boolean;
    jobOpenings?: number
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
    isSaved?: boolean
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
    testScore: number,
    appliedWithResume: string,
    jobLetter: string,
    isFeedbackAsked: boolean,
    status: string,
}
// chat
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
export interface IFeedback extends Document {
    jobApp: mongoose.Types.ObjectId;
    candidateQuestion: {
        candidateId: mongoose.Types.ObjectId,
        question: string,
    };
    employerResponse: {
        employerId: mongoose.Types.ObjectId,
        response: String
    }
}

