import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {reducerTask, TaskActionType} from "./reducer/ReducerTask/ReducerTask";
import {reducerTodo, setTodolistAC, TodoActionType} from "./reducer/ReducerTodo/ReducerTodo";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer, setStatusAC} from "./reducer/AppReducer/AppReducer";


const rootReducer=combineReducers({

   tasks:reducerTask,
   todolist:reducerTodo,
   app:appReducer
})
export type ThunkDispatchType=ThunkDispatch<AppStateType, any, AnyAction>

export const useAppDispatch = () =>  useDispatch<ThunkDispatchType>()
export const useAppSelector:TypedUseSelectorHook<AppStateType> =  useSelector
export type AppStateType=ReturnType<typeof rootReducer>
export type AppActionType=TodoActionType | TaskActionType
export type AppThunkType<ReturnType = void >=ThunkAction<ReturnType, AppStateType, unknown, AppActionType>
export let store=legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store=store

