import {setStatusAC} from "../../../App/AppReducer/AppReducer";
import {authApi, LoginType} from "../authApi";
import axios from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../../Common/error-utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {isLoggedIn: false, isInitialized: false}

export const initializedTC = createAsyncThunk('auth/initializedTC', async (_, thunkAPI) => {
        const {dispatch} = thunkAPI
        try {
            dispatch(setStatusAC({status: 'loading'}))
            let res = await authApi.me()
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
            }
        } catch (e: any) {
            if (axios.isAxiosError(e))
                handleServerNetworkError(e, dispatch)
        } finally {
            dispatch(setIsInitializedAC({isInitialized: true}))
            dispatch(setStatusAC({status: 'idle'}))
        }
    }
)


export const setIsLoggedInTC = createAsyncThunk('auth/setIsLoggedInTC', async (arg: LoginType, thunkAPI) => {
    const {dispatch} = thunkAPI
    try {
        dispatch(setStatusAC({status: 'loading'}))
        let res = await authApi.login(arg)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}))
            dispatch(setStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e))
            handleServerNetworkError(e, dispatch)
    }
})

export const setLogoutTC = createAsyncThunk('auth/setLogoutTC,', async (_, thunkAPI) => {
    const {dispatch} = thunkAPI
    try {
        dispatch(setStatusAC({status: 'loading'}))
        let res = await authApi.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: false}))
            dispatch(setStatusAC({status: 'succeeded'}))
            // dispatch(clearDataTodosAC())
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e))
            handleServerNetworkError(e, dispatch)
    }
})


const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        },
        setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
    }
})
export type InitialStateType = typeof initialState
export const authReducers = slice.reducer



export const setIsLoggedInAC = slice.actions.setIsLoggedInAC
export const setIsInitializedAC = slice.actions.setIsInitializedAC
