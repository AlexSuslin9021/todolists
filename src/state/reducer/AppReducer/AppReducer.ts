import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed' | 'imgLoading'
const initialState = {
    error:null as null | any,
    status: 'idle' as RequestStatusType,
    }

const slice=createSlice({
    name:'app',
    initialState:initialState,
    reducers: {
        setStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setErrorAC(state, action: PayloadAction<{ error: any }>) {
            state.error = action.payload.error
        },
    }
})

export const appReducer=slice.reducer
export const setStatusAC=slice.actions.setStatusAC
export const setErrorAC=slice.actions.setErrorAC


export type InitialStateType = typeof initialState
export type SetStatusType = ReturnType<typeof setStatusAC >
export type SetErrorType = ReturnType<typeof setErrorAC >
