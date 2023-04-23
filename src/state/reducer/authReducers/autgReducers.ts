import React from 'react';
import {Dispatch} from "redux";
import {setErrorAC, setStatusAC} from "../AppReducer/AppReducer";
import {authApi, LoginType} from "../../../api/authApi";
import axios from "axios";
import {handleServerNetworkError} from "../../../error-utils/error-utils";

const initialState={
    isLoggedIn: false
}

export type InitialStateType = typeof initialState
export const AuthReducers = (state:InitialStateType=initialState, action:ActionType):InitialStateType => {
    switch (action.type){
        case "SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
    }
    return state
};

//AC
export const setIsLoggedInAC=(value:boolean)=>{
    return{type: "SET-IS-LOGGED-IN" , value} as const

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
            if (!res.data.messages.length) {
                dispatch(setErrorAC(res.data.messages[0]))
            } else {
                dispatch(setErrorAC('Some error occurred'))
            }
            dispatch(setStatusAC('idle'))
        }
    }).catch((e)=>{
        if(axios.isAxiosError(e))
            handleServerNetworkError(e, dispatch)
    })
}
export const setIsLoggedInTC=(data:LoginType) =>(dispatch:Dispatch) =>{
    dispatch(setStatusAC('loading'))

    authApi.login(data).then((res)=>{
        if(res.data.resultCode===0){
        dispatch(setIsLoggedInAC(true))
            dispatch(setStatusAC('succeeded'))
        }

        else {
            if (!res.data.messages.length) {
                dispatch(setErrorAC(res.data.messages[0]))
            } else {
                dispatch(setErrorAC('Some error occurred'))
            }
            dispatch(setStatusAC('idle'))
        }
    }).catch((e)=>{
        if(axios.isAxiosError(e))
            handleServerNetworkError(e, dispatch)
    })
}
// types
type ActionType=ReturnType<typeof setIsLoggedInAC>

