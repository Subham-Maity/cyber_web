import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ICandidate, IEmployer } from '@/types/user-type'

interface User {
    user: string,
    userRole: string,
    avatar: string,
    name: string,
}

export interface userState {
    currUser: string | null;
    loading: boolean,
    isAuthenticated: boolean,
    error: string | null,
    userRole: string,
    whoIsTryingToLoginWithLn: string,
    whoIsTryingToLoginWithGoogle: string,
    avatar: string,
    name: string,
}
const initialState: userState = {
    currUser: null,
    loading: false,
    isAuthenticated: false,
    error: null,
    userRole: "",
    avatar: "none",
    whoIsTryingToLoginWithLn: "",
    name: "",
    whoIsTryingToLoginWithGoogle: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserStart: (state) => {
            state.loading = true;
        },
        getUserFail: (state, action: PayloadAction<string>) => {
            state.loading = false,
                state.error = action.payload
            state.isAuthenticated = false;
        },
        getUserSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false,
                state.isAuthenticated = true;
            state.userRole = action.payload.userRole,
                state.currUser = action.payload.user
            state.error = null,
                // state.whoIsTryingToLoginWithLn = "",
                // state.whoIsTryingToLoginWithGoogle = "",
                state.avatar = action.payload.avatar,
                state.name = action.payload.name
        },

        logoutUserSuccess: (state, action: PayloadAction<null>) => {
            state.loading = false;
            state.currUser = action.payload;
            state.isAuthenticated = false;
            state.userRole = ""
            state.error = null,
                state.whoIsTryingToLoginWithLn = ""
            state.whoIsTryingToLoginWithGoogle = ""
            state.avatar = "",
                state.name = ""
        },
        logoutUserFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload,
                state.currUser = null;
            state.isAuthenticated = false;
            state.userRole = ""
            state.whoIsTryingToLoginWithLn = ""
            state.whoIsTryingToLoginWithGoogle = ""
            state.avatar = "",
                state.name = ""
        },
        setLoggerWithLn: (state, action: PayloadAction<string>) => {
            state.whoIsTryingToLoginWithLn = action.payload
            state.whoIsTryingToLoginWithGoogle = ""
        },
        setLoggerWithGoogle: (state, action: PayloadAction<string>) => {
            state.whoIsTryingToLoginWithGoogle = action.payload;
            state.whoIsTryingToLoginWithLn = ""
        }

    },
})

export const { getUserFail, getUserStart, setLoggerWithLn, getUserSuccess, logoutUserFail, logoutUserSuccess, setLoggerWithGoogle } = userSlice.actions
export default userSlice.reducer
