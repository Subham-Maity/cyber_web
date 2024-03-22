export interface ILocation {
    locality: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    maplocation: string;
}
export interface IFunding {
    amount: string,
    fundedBy: string,
    yearOfFunding: string,
    round: string,
}
export interface ICompany {
    name: string;
    email: string;
    logo: string;
    _id: string;
    contactNumber?: string;
    website: string;
    foundedDate: Date;
    founderName: string;
    funding: IFunding[];
    location: ILocation[];
    teamSize: string;
    category: string;
    isSaved: boolean;
    about: string;
    benefits: string[];
    jobPosts: string[];
    socialSites: {
        linkedIn: string,
        twitter: string,
        website: string,
        facebook: string,
    };
    jobOpenings: number;
}