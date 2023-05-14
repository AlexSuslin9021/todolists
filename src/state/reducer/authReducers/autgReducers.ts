import React from 'react';
import {Dispatch} from "redux";
import {setErrorAC, setStatusAC} from "../AppReducer/AppReducer";
import {authApi, LoginType} from "../../../api/authApi";
import axios from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../../error-utils/error-utils";
// import {clearDataTodosAC} from "../ReducerTodo/ReducerTodo";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState={
    isLoggedIn: false,
    isInitialized:false // запрос ме, зарегистрированы или нет
}

const slice=createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setIsLoggedInAC(state, action:PayloadAction<{value:boolean}>){
            state.isLoggedIn=action.payload.value
        },
        setIsInitializedAC(state, action:PayloadAction<{isInitialized:boolean}>){
            state.isInitialized=action.payload.isInitialized
        },
    }
})
export type InitialStateType = typeof initialState
export const authReducers=slice.reducer


//AC
export const setIsLoggedInAC=slice.actions.setIsLoggedInAC
export const setIsInitializedAC=slice.actions.setIsInitializedAC
//TC

export const initializedTC =() =>(dispatch:Dispatch) =>{

    dispatch(setStatusAC({status:'loading'}))

    authApi.me().then((res)=>{
        if(res.data.resultCode===0){

            dispatch(setIsLoggedInAC({value:true}))

            // dispatch(setStatusAC({status:'succeeded'}))

        }

        else {
            // handleServerAppError(res.data, dispatch)
        }
    }).catch((e)=>{
        if(axios.isAxiosError(e))
            handleServerNetworkError(e, dispatch)
    }).finally(()=>{
            dispatch(setIsInitializedAC({isInitialized:true}))
        dispatch(setStatusAC({status:'idle'}))
        }

    )
}
export const setIsLoggedInTC=(data:LoginType) =>(dispatch:Dispatch) =>{
    dispatch(setStatusAC({status:'loading'}))

    authApi.login(data).then((res)=>{
        if(res.data.resultCode===0){
        dispatch(setIsLoggedInAC({value:true}))
            dispatch(setStatusAC({status:'succeeded'}))
        }

        else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((e)=>{
        if(axios.isAxiosError(e))
            handleServerNetworkError(e, dispatch)
    })
}
export const setLogoutTC=() =>(dispatch:Dispatch) =>{
    dispatch(setStatusAC({status:'loading'}))

    authApi.logout().then((res)=>{
        if(res.data.resultCode===0){
            dispatch(setIsLoggedInAC({value:false}))
            dispatch(setStatusAC({status:'succeeded'}))
            // dispatch(clearDataTodosAC())
        }

        else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((e)=>{
        if(axios.isAxiosError(e))
            handleServerNetworkError(e, dispatch)
    })
}
// types


