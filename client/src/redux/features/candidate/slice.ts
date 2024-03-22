import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICandidate } from '@/types/user-type';

export interface CandidateState {
    candidate: ICandidate | null;
    candidates: ICandidate[]
    error: string | null,
    loading: boolean,
    page: number,
    totalNumOfPage: number,
    totalCandidate: number,
  
   
}
type IForGetAllCandidate = {
    candidates: ICandidate[]
    totalNumOfPage: number,
    totalCandidate: number,
}

const initialState: CandidateState = {
    candidate: null,
    loading: false,
    error: null,
    candidates: [],
    page: 1,
    totalNumOfPage: 1,
    totalCandidate: 0,
 
    
}

export const candidateSlice = createSlice({
    name: 'candidate',
    initialState,
    reducers: {
        requestStart: (state) => {
            state.loading = true;
        },
        requestFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        getCandidatesSuccess: (state, action: PayloadAction<IForGetAllCandidate>) => {
            state.loading = false
            state.candidates = action.payload.candidates;
            state.totalNumOfPage = action.payload.totalNumOfPage;
            state.totalCandidate = action.payload.totalCandidate
        },
        getDetailsSuccess: (state, action: PayloadAction<ICandidate>) => {
            state.loading = false
            state.candidate = action.payload
        },
        

        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        toggleIsSaved: (state, action: PayloadAction<string>) => {
            state.candidates = state.candidates.map((candidate) => {
                if (candidate._id === action.payload) {
                    return { ...candidate, isSaved: !candidate.isSaved }
                } else return candidate;
            })

        },

    },
})

export const {
    getCandidatesSuccess,
    requestFail,
    requestStart,
    setPage,
    toggleIsSaved,
    getDetailsSuccess,
    
    
} = candidateSlice.actions

export default candidateSlice.reducer;
