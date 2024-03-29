
import { Dispatch } from 'redux'
import {setErrorAC, setStatusAC} from "../../app/appReducer/appReducer";
import {ResponseType} from "../../featers/todolist/todolistApi";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        debugger
        dispatch(setErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setErrorAC({error:'Some error occurred'}))
    }
    dispatch(setStatusAC({status:'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: any) => {
    debugger
    dispatch(setErrorAC({error:error.message}))
    dispatch(setStatusAC({status:'failed'}))
}

