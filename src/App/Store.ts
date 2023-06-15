import {AnyAction, combineReducers} from "redux";
import {reducerTask, TaskActionType} from "../featers/Task/ReducerTask/ReducerTask";
import {reducerTodo, TodoActionType} from "../featers/Todolist/ReducerTodo/ReducerTodo";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./AppReducer/AppReducer";
import {authReducers} from "../featers/auth/authReducers/autgReducers";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    tasks: reducerTask,
    todolist: reducerTodo,
    app: appReducer,
    auth: authReducers,
})
export type ThunkDispatchType = ThunkDispatch<AppStateType, any, AnyAction>
export const store = configureStore({
    reducer: rootReducer,
})
export const useAppDispatch = () => useDispatch<ThunkDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionType = TodoActionType | TaskActionType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionType>


