import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {reducerTask} from "./reducer/ReducerTask/ReducerTask";
import {reducerTodo} from "./reducer/ReducerTodo/ReducerTodo";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

const rootReducer=combineReducers({

   tasks:reducerTask,
   todolist:reducerTodo
})
type ThunkDispatchType=ThunkDispatch<AppStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkDispatchType>()
export type AppStateType=ReturnType<typeof rootReducer>
export let store=legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store=store