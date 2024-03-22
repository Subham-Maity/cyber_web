import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IChat, IChatMessage, IFeedback, IJobApp } from '@/types/job-app-type'

// Define a type for the slice state
export interface IJobApplication {
    loading: boolean,
    error: null | string,
    allJobAppByCandidate: IJobApp[];
    allJobAppByCandidateWithJobPost: IJobApp[];
    allJobAppByJobPostWithCandidate: IJobApp[];
    allJobAppByCandidateWithJobPostPagination:IJobApp[];
    numberOfShortlistedJobApps:number;
    currentPage:number;
    itemsPerPage:number;
    totalPages:number;
    totalJobsApplied:number;
    allJobAppByJobPost: IJobApp[];
    jobApp: IJobApp | null;
    chat: IChat | null;
    chatsByEmp: IChat[];
    currJobApp: string;
    feedback: IFeedback | null,

}

// Define the initial state using that type
const initialState: IJobApplication = {
    loading: false,
    error: null,
    allJobAppByCandidate: [],
    allJobAppByJobPost: [],
    allJobAppByCandidateWithJobPost: [],
    allJobAppByJobPostWithCandidate: [],
    jobApp: null,
    chat: null,
    currJobApp: "",
    feedback: null,
    chatsByEmp: [],
    allJobAppByCandidateWithJobPostPagination:[],
    currentPage: 1,
    itemsPerPage: 6,
    totalPages:0,
    totalJobsApplied:0,
    numberOfShortlistedJobApps:0,


};

export const jobApplicationSlice = createSlice({
    name: "jobApplication",
    initialState,
    reducers: {
        requestStart: (state) => {
            state.loading = true;
        },
        requestFail: (state, action: PayloadAction<string>) => {
            state.loading = false,
                state.error = action.payload

        },
        requestSuccess: (state) => {
            state.loading = false
        },

        getAllJobAppByCandidateSuccess: (state, action: PayloadAction<IJobApp[]>) => {
            state.allJobAppByCandidate = action.payload;
            state.loading = false
        },
        allJobAppByCandidateWithJobPostSuccess: (state, action: PayloadAction<any>) => {
            state.allJobAppByCandidateWithJobPost = action.payload.allJobApp as IJobApp[];
            state.totalJobsApplied = action.payload.totalJobApplied as number;
            state.loading = false;
        },
        allJobAppByCandidateWithJobPostPaginationSuccess: (state, action: PayloadAction<any>) => {
            state.allJobAppByCandidateWithJobPostPagination = action.payload.allJobApp as IJobApp[];
            state.currentPage = action.payload.currentPage as number;
            state.itemsPerPage = action.payload.itemsPerPage as number;
            state.totalPages = action.payload.totalPages as number;
            state.loading = false;
        },
        allJobAppByJobPostWithCandidateSuccess: (state, action: PayloadAction<IJobApp[]>) => {
            state.allJobAppByJobPostWithCandidate = action.payload;
            state.loading = false
        },
        getAllJobAppByJobPostSuccess: (state, action: PayloadAction<IJobApp[]>) => {
            state.allJobAppByJobPost = action.payload;
            state.loading = false;
        },
        createJobAppSuccess: (state, action: PayloadAction<IJobApp>) => {
            state.jobApp = action.payload;
            state.loading = false;
            state.allJobAppByCandidate.push(action.payload)
        },
        getChatsSuccess: (state, action: PayloadAction<IChat>) => {
            state.chat = action.payload;
            state.loading = false;
        },
        getChatsFail: (state, action: PayloadAction<null>) => {
            state.chat = action.payload;
            state.loading = false;
        },
        addChatSuccess: (state, action: PayloadAction<IChatMessage>) => {
            state.chat?.messages.push(action.payload);
            state.loading = false;
        },
        getChatsByEmployerSuccess: (state, action: PayloadAction<IChat[]>) => {
            state.chatsByEmp = action.payload;
            state.loading = false;
        },
        setCurrJobApp: (state, action: PayloadAction<string>) => {
            state.currJobApp = action.payload;
            state.loading = false;
        },
        getFeedbackSuccess: (state, action: PayloadAction<IFeedback>) => {
            state.feedback = action.payload;
            state.loading = false;
        },

        askFeedbackSuccess: (state, action: PayloadAction<IFeedback>) => {
            state.feedback = action.payload;
            state.loading = false;
        },
        responseFeedbackSuccess: (state, action: PayloadAction<IFeedback>) => {
            state.feedback = action.payload;
            state.loading = false;
        },
        setPage: (state, action:PayloadAction<number>) => {
            state.currentPage = action.payload;
            state.loading=false;
        },
        getAllShortlistedJobAppByCandidateIdSuccess: (state, action:PayloadAction<number>) => {
            state.loading = false;
            state.numberOfShortlistedJobApps = action.payload
        },


    }
});

export const {
    requestFail,
    requestStart,
    requestSuccess,
    getAllJobAppByCandidateSuccess,
    getAllJobAppByJobPostSuccess,
    createJobAppSuccess,
    getChatsSuccess,
    addChatSuccess,
    setCurrJobApp,
    responseFeedbackSuccess,
    getFeedbackSuccess,
    askFeedbackSuccess,
    allJobAppByCandidateWithJobPostSuccess,
    allJobAppByJobPostWithCandidateSuccess,
    getChatsFail,
    getChatsByEmployerSuccess,
    allJobAppByCandidateWithJobPostPaginationSuccess,
    setPage,
    getAllShortlistedJobAppByCandidateIdSuccess,
} = jobApplicationSlice.actions;

export default jobApplicationSlice.reducer;
