import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {reducerTask, TaskActionType} from "./reducer/ReducerTask/ReducerTask";
import {reducerTodo, TodoActionType} from "./reducer/ReducerTodo/ReducerTodo";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

const rootReducer=combineReducers({

   tasks:reducerTask,
   todolist:reducerTodo
})
type ThunkDispatchType=ThunkDispatch<AppStateType, any, AnyAction>
debugger
export const useAppDispatch = () =>  useDispatch<ThunkDispatchType>()
export type AppStateType=ReturnType<typeof rootReducer>
export type AppActionType=TodoActionType | TaskActionType
export type AppThunkType<ReturnType = void >=ThunkAction<ReturnType, AppStateType, unknown, AppActionType>
export let store=legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store=store