import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICandidate, IEducation, IEmployer, IExperience } from '@/types/user-type'

type myUser = ICandidate | null;

export interface userState {
    user: myUser
    loading: boolean,
    isAuthenticated: boolean,
    error: string | null,
    userRole: string,
    whoIsTryingToLoginWithLn: string,
    whoIsTryingToLoginWithGoogle:string,
}
const initialState: userState = {
    user: null,
    loading: false,
    isAuthenticated: false,
    error: null,
    userRole: "",
    whoIsTryingToLoginWithLn: "",
    whoIsTryingToLoginWithGoogle:""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserStart: (state) => {
            state.loading = true;
        },
        requestStart: (state) => {
            state.loading = true;
        },
        requestFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload
        },
        getUserSuccess: (state, action: PayloadAction<myUser>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
            state.userRole = action.payload?.role as string
        },
        getUserFail: (state, action: PayloadAction<string>) => {
            state.loading = false,
                state.error = action.payload
            state.isAuthenticated = false;
        },
        logoutUserSuccess: (state, action: PayloadAction<myUser>) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = false;
            state.userRole = ""
            state.error = null,
                state.whoIsTryingToLoginWithLn = ""
                state.whoIsTryingToLoginWithGoogle=""
        },
        logoutUserFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload
        },
        setLoggerWithLn: (state, action: PayloadAction<string>) => {
            state.whoIsTryingToLoginWithLn = action.payload
            state.whoIsTryingToLoginWithGoogle = ""
        },
        setLoggerWithGoogle: (state, action:PayloadAction<string>) => {
            state.whoIsTryingToLoginWithGoogle = action.payload;
            state.whoIsTryingToLoginWithLn = ""
        },
        updateUserSuccess: (state, action: PayloadAction<myUser>) => {
            state.user = action.payload;
            state.loading = false;
        },
        updateEduSuccess: (state, action: PayloadAction<IEducation>) => {
            if (state.user && 'education' in state.user) {
                state.user.education = [...state.user.education, action.payload]
            }

            state.loading = false;
        },
        updateExpSuccess: (state, action: PayloadAction<IExperience>) => {
            if (state.user && 'experience' in state.user)
                state.user.experience = [...state.user.experience, action.payload]
            state.loading = false;
        }
    },
})

export const { updateExpSuccess, updateEduSuccess, requestStart, requestFail, updateUserSuccess, getUserFail, getUserStart, setLoggerWithLn, getUserSuccess, logoutUserFail, logoutUserSuccess, setLoggerWithGoogle } = userSlice.actions



export default userSlice.reducer
