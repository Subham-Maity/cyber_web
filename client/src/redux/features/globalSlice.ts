import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GlobalState {
    socket: any
    toggle: boolean,
    file: File | null,
    uploadProgress: number,
}
const initialState: GlobalState = {
    socket: null,
    toggle: false,
    file: null,
    uploadProgress: 0
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setSocket: (state, action: PayloadAction<any>) => {
            state.socket = action.payload;
        },
        clearSocket: (state) => {
            state.socket = null
        },
        setFile: (state, action: PayloadAction<File | null>) => {
            state.file = action.payload;
        },
        setUploadProgress: (state, action: PayloadAction<number>) => {
            state.uploadProgress = action.payload;
        },
        resetFile:(state) => {
            state.file=null
        }
    },
})

export const { setSocket, clearSocket, setUploadProgress, setFile,resetFile } = globalSlice.actions
export default globalSlice.reducer
