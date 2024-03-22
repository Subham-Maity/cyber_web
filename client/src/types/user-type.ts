import { ICandidateSub, IEmployerSub } from "./template";

export interface IEducation {
    degree: string;
    field: string;
    institute: string;
    startYear: string;
    endYear: string;
    description: string;
    _id: string;
    present: boolean;
}
interface ProfileView {

    view_count?: number;
    view_timestamp?: string;
}
export interface IExperience {
    title: string;
    company: string;
    startYear: string;
    endYear: string;
    description: string;
    _id: string;
    present: boolean;
}
interface ILocation {
    city: string;
    country: string;
    _id: string;
}

export interface INotification {
    sender: string,
    message: string,
    redirectUrl: string,
    timestamp: Date,
    isRead: boolean,
    _id: string,
}
export interface IResume {
    _id: string,
    name: string,
    s3Key: string,
}

export interface ISocial {
    linkedIn: string,
    twitter: string,
    github: string,
    website: string,
}
export interface FSocial {
    linkedIn: string,
    twitter: string,
    facebook: string,
    website: string,
}
export interface ISubscription {
    plan: 'starter' | 'gold' | 'diamond';
    jobApplicationLimit: number;
    feedbackLimit: number;
}

export interface ICandidate {
    email: string;
    isEmailVerified: boolean;
    firstName: string;
    lastName: string;
    avatar: string;
    phoneNumber: string,
    password?: string;
    resumes: IResume[],
    signInProvider?: "linkedIn" | "jwt"
    skills: string[],
    softSkills: string[],
    certificate: string[],
    provider: string;
    experience: IExperience[],
    education: IEducation[],
    socialSites: ISocial,
    experienceInYears: number,
    expectedSalary: {
        currency: {
            abbreviation: string;
            name: string;
            symbol: string;
        },
        min: number,
        max: number,
        period: string
    },
    selfDeclaration: {
        gender: string,
        race: string
    },
    preferredLocations: string[],
    preferredLanguages: string[],
    isProfileCompleted: boolean,
    savedJobs: string[];
    savedCompanies: string[];
    gender: "male" | "female" | "others";
    location: ILocation,
    testScore: number,
    notifications: INotification[],
    bio: string,
    paymentDate?: Date,
    profileViews: ProfileView[];
    createdAt: string,
    updatedAt: string,
    isSaved?: boolean,
    experienceInShort: string,
    subscription: ICandidateSub,
    role: string,
    _id: string,
    __v: number

}



export interface IEmployer {
    email: string;
    isEmailVerified: boolean;
    firstName: string;
    lastName: string;
    provider: string;
    avatar: string;
    phoneNumber: string,
    company: {
        name: string,
        companyId: string,
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
    createdAt: string,
    updatedAt: string,
    notifications: INotification[]
    _id: string,
    __v: number,
    subscription: IEmployerSub,
    paymentDate?: Date,

}

export interface IAdmin {
    name: string;
    email: string;
    avatar: string,
    role: string;
    createdAt: string,
    updatedAt: string,
    _id: string,
    __v: number
}