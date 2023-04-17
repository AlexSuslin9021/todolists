
import { Dispatch } from 'redux'
import {setErrorAC, setStatusAC} from "../state/reducer/AppReducer/AppReducer";
import {ResponseType} from "../api/todolistApi";


// generic function
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: any) => {
    dispatch(setErrorAC(error.message))
    dispatch(setStatusAC('failed'))
}

// type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>
