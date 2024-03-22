import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IJobPost } from '@/types/jobPost-type'

export interface JobPostView {

    view_count?: number;
    view_timestamp?: string;
}
export interface jobPstState {
    jobPost: IJobPost | null;
    allJobPost: IJobPost[]
    error: string | null,
    loading: boolean,
    page: number,
    pageForCompany: number,
    totalNumOfPage: number,
    totalJobPost: number,
    gptLoading: boolean,
    jobPostsForEmployer: IJobPost[];
    currentPageForJobPostEmployer: number,
    totalJobPostPagesForEmployer: number,
    pageSizeForJobPostEmployer: number,
    relatedJobs: IJobPost[];
    fileNamePc: string;
    allJobPostAdmin: IJobPost[];
    pageForAdmin:number;
    totalJobsForAdmin: number,
    totalPagesForJobpostAdmin:number,
    viewsOnJobPost: JobPostView[];
    totalJobPostsForEmployer: number;
    jobPostForEmployerDashboard: IJobPost[];
    jobPostForEmployerNiceSelect: IJobPost[];
    jobPostForEmployerDashboardCards: any;
}
type IForGetAllJobPost = {
    allJobPost: IJobPost[]
    totalNumOfPage: number,
    totalJobPost: number,
}

const initialState: jobPstState = {
    jobPost: null,
    loading: false,
    gptLoading: false,
    error: null,
    allJobPost: [],
    page: 1,
    totalNumOfPage: 1,
    totalJobPost: 0,
    pageForCompany: 1,
    jobPostsForEmployer: [],
    relatedJobs: [],
    fileNamePc: "",
    allJobPostAdmin: [],
    pageForAdmin:1,
    totalJobsForAdmin:0,
    totalPagesForJobpostAdmin:0,
    viewsOnJobPost: [],
    currentPageForJobPostEmployer: 1,
    totalJobPostPagesForEmployer: 1,
    pageSizeForJobPostEmployer: 1,
    totalJobPostsForEmployer: 0,
    jobPostForEmployerDashboard: [],
    jobPostForEmployerNiceSelect: [],
    jobPostForEmployerDashboardCards: {},
}

export const jobPostSlice = createSlice({
    name: 'jobPost',
    initialState,
    reducers: {
        askGptStart: (state) => {
            state.gptLoading = true;
        },
        askGptEnd: (state) => {
            state.gptLoading = false;
        },
        askGptSuccess: (state) => {
            state.gptLoading = false;
        },
        requestStart: (state) => {
            state.loading = true;

        },
        requestFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;

        },
        requestSuccess: (state) => {
            state.loading = false;
        },
        submitJobPostSuccess: (state, action: PayloadAction<IJobPost>) => {
            state.loading = false;
            state.jobPost = action.payload;
        },
        updateJobPostSuccess :(state, action:PayloadAction<IJobPost>) => {
            state.loading = false;
            state.jobPostsForEmployer = state.jobPostsForEmployer.map((jobp) => {
                if (jobp._id === action.payload._id) {
                  // Replace the matching job post with the updated job post
                  return action.payload;/* your updated job post here */;
                } else {
                  // Keep the job post unchanged if it doesn't match the _id in action.payload
                  return jobp;
                }
            }
            )
        },
        getJobPostsSuccess: (state, action: PayloadAction<IForGetAllJobPost>) => {
            state.loading = false
            state.allJobPost = action.payload.allJobPost;
            state.totalNumOfPage = action.payload.totalNumOfPage;
            state.totalJobPost = action.payload.totalJobPost;
            if (state.page > state.totalNumOfPage) {
                state.page = state.totalNumOfPage > 0 ? state.totalNumOfPage : 1;
            }
        },
        getAllJobPostsSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.allJobPostAdmin = action.payload.jobPost as IJobPost[];
            state.pageForAdmin = action.payload.page as number;
            state.totalJobsForAdmin = action.payload.totalDocuments as number;
            state.totalPagesForJobpostAdmin = action.payload.totalPages as number;
            // console.log(action.payload)
            
        },
        setAdminPage:(state,action:PayloadAction<number>) => {
            state.pageForAdmin = action.payload;
        },
        getJobPostsForEmployerSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false
            state.jobPostsForEmployer = action.payload.jobPostsForEmployer as IJobPost[];
            state.totalJobPostPagesForEmployer = action.payload.totalJobPostPagesForEmployer as number;
            state.currentPageForJobPostEmployer = action.payload.currentPageForJobPostEmployer as number;
            state.pageSizeForJobPostEmployer = action.payload.pageSizeForJobPostEmployer as number;
            state.totalJobPostsForEmployer = action.payload.totalJobPostsForEmployer as number;
        },
        getJobPostViewsSuccess: (state, action: PayloadAction<JobPostView[]>) => {
            state.loading = false
            state.viewsOnJobPost = action.payload
            // console.log(action.payload,"Hello");
        },
        getJobPostForEmployerDashboardSuccess: (state, action: PayloadAction<IJobPost[]>) => {
            state.loading = false;
            state.jobPostForEmployerDashboard = action.payload;
        },
        getJobPostForEmployerNiceSelectSuccess: (state, action: PayloadAction<IJobPost[]>) => {
            state.loading = false;
            state.jobPostForEmployerNiceSelect = action.payload;
        },
        getJobPostForEmployerDashboardCardsSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.jobPostForEmployerDashboardCards = action.payload;
        },
        registerJobPostViewSuccess: (state) => {
            state.loading = false;
        },
        toggleIsSaved: (state, action: PayloadAction<string>) => {
            state.allJobPost = state.allJobPost?.map((job) => {
                if (job._id === action.payload) {
                    return { ...job, isSaved: !job.isSaved }
                } else return job;
            })

        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setPageForJobPostEmployer: (state, action: PayloadAction<number>) => {
            state.currentPageForJobPostEmployer = action.payload;
        },
        setPageForCompany: (state, action: PayloadAction<number>) => {
            state.pageForCompany = action.payload;
        },
        getRelatedJobsSuccess: (state, action: PayloadAction<IJobPost[]>) => {
            state.loading = false
            state.relatedJobs = action.payload;
        },
        setFileNamePc: (state, action: PayloadAction<string>) => {
            state.fileNamePc = action.payload;
            state.gptLoading = false;
        },

    },
})

export const {
    askGptEnd,
    askGptStart,
    askGptSuccess,
    requestSuccess,
    getJobPostsSuccess,
    requestFail,
    requestStart,
    submitJobPostSuccess,
    setPage,
    toggleIsSaved,
    setPageForCompany,
    getJobPostsForEmployerSuccess,
    getRelatedJobsSuccess,
    setFileNamePc,
    getAllJobPostsSuccess,
    getJobPostViewsSuccess,
    registerJobPostViewSuccess,
    setPageForJobPostEmployer,
    setAdminPage,
    getJobPostForEmployerDashboardSuccess,
    getJobPostForEmployerNiceSelectSuccess,
    getJobPostForEmployerDashboardCardsSuccess,
    updateJobPostSuccess,
} = jobPostSlice.actions

export default jobPostSlice.reducer;
