// обработка состояния аспектов всего приложения:
// выбранный язык интерфейса, загружаются ли данные или нет, кто именно сейчас залогинен в систему…


//initial state
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed' | 'imgLoading'


const initialState = {
    error:null as null | any,
    status: 'idle' as RequestStatusType,
    } // as(воспринимай как этот тип) RequestStatusType! типизация объекта

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
//     = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         default:
//             return state
//     }
// }
//Action creator

export const setStatusAC=slice.actions.setStatusAC
export const setErrorAC=slice.actions.setErrorAC

//Thunk



// type

export type InitialStateType = typeof initialState
export type SetStatusType = ReturnType<typeof setStatusAC >
export type SetErrorType = ReturnType<typeof setErrorAC >
