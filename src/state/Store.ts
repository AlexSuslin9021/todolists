import {combineReducers, createStore} from "redux";
import {reducerTask} from "./reducer/ReducerTask/ReducerTask";
import {reducerTodo} from "./reducer/ReducerTodo/ReducerTodo";

const rootReducer=combineReducers({

   tasks:reducerTask,
   todolist:reducerTodo
})
export type AppStateType=ReturnType<typeof rootReducer>
export let store=createStore(rootReducer)

// @ts-ignore
window.store=store