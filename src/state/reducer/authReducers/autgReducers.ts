import React from 'react';
import {Dispatch} from "redux";
import {setErrorAC, setStatusAC} from "../AppReducer/AppReducer";
import {authApi, LoginType} from "../../../api/authApi";
import axios from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../../error-utils/error-utils";

const initialState={
    isLoggedIn: false,
    isInitialized:false
}

export type InitialStateType = typeof initialState
export const AuthReducers = (state:InitialStateType=initialState, action:ActionType):InitialStateType => {
    switch (action.type){
        case "SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        case "SET-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
    }
    return state
};

//AC
export const setIsLoggedInAC=(value:boolean)=>{
    return{type: "SET-IS-LOGGED-IN" , value} as const

}
export const setIsInitializedAC=(isInitialized:boolean)=>{
    return{type: "SET-INITIALIZED" , isInitialized} as const

}
//TC

export const initializedTC =() =>(dispatch:Dispatch) =>{
    dispatch(setStatusAC('loading'))

    authApi.me().then((res)=>{
        if(res.data.resultCode===0){
            dispatch(setIsLoggedInAC(true))
            dispatch(setStatusAC('succeeded'))

        }

        else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((e)=>{
        if(axios.isAxiosError(e))
            handleServerNetworkError(e, dispatch)
    }).finally(()=>{
            dispatch(setIsInitializedAC(true))
        }
        // dispatch(setIsInitializedAC(false))
    )
}
export const setIsLoggedInTC=(data:LoginType) =>(dispatch:Dispatch) =>{
    dispatch(setStatusAC('loading'))

    authApi.login(data).then((res)=>{
        if(res.data.resultCode===0){
        dispatch(setIsLoggedInAC(true))
            dispatch(setStatusAC('succeeded'))
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
    dispatch(setStatusAC('loading'))

    authApi.logout().then((res)=>{
        if(res.data.resultCode===0){
            dispatch(setIsLoggedInAC(false))
            dispatch(setStatusAC('succeeded'))
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
type ActionType= ReturnType<typeof setIsLoggedInAC>| ReturnType<typeof setIsInitializedAC>

