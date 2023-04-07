import {v1} from "uuid";

import {FilterType} from "../../../App";
import {todolistApi, TodolistType} from "../../../api/todolistApi";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";


///TYPE Action
const removeTodo='REMOVE-TODOLIST'
const addTodo='ADD-TODOLIST'
const changeTitleTodo="CHANGE-TITLE-TODOLIST"
const changeFilterTodo="CHANGE-FILTER-TODOLIST"
const setTodolist="SET-TODOLIST"


//InitialState

export type TodolistDomainType =
    TodolistType &{
     filter: FilterType
}
export let todolistID1 = v1()
export let todolistID2 = v1()
let initialState : TodolistDomainType[]  =
    [
        // {id: todolistID1, title: 'What to learn',addedDate: '',  order: 0, filter: 'all'},
        // {id: todolistID2, title: 'What to buy', addedDate: '',  order: 0, filter: 'all'},
    ]
type ActionType=removeTodolistType | ReturnType<typeof addTodolistAC> | setTodolistType  | ReturnType<typeof changeTitleTodolistAC>| ReturnType<typeof changeFilterTodolistAC>
export const reducerTodo=(state:TodolistDomainType[]=initialState, action:ActionType):TodolistDomainType[]=>{

    switch (action.type){
        case removeTodo:

            return state.filter(t => t.id !== action.idTodo)
        case addTodo:
            return[...state, { id:action.idTodo, title:action.title, filter:'all',addedDate: '',  order: 0}]
        case changeTitleTodo:
            return state.map(t=> t.id===action.idTodo ? {...t, title:action.title}:t)
        case changeFilterTodo:
            return state.map(t => t.id === action.idTodo ? {...t, filter: action.value} : t)
        case setTodolist:
            return action.todolist.map(tl=>({...tl, filter:'all'}))

        default:return state
    }
}

type removeTodolistType=ReturnType<typeof removeTodolistAC>
export const removeTodolistAC=(idTodo:string)=>{
    return {type:removeTodo, idTodo} as const}


export const addTodolistAC=(title:string)=>{
    return {type:addTodo, title, idTodo:v1()} as const
}


export const changeTitleTodolistAC=(idTodo:string, title: string)=>{
    return {type:changeTitleTodo, idTodo, title} as const
}

export const changeFilterTodolistAC=(idTodo: string, value: FilterType)=>{
    return {type:changeFilterTodo, idTodo, value} as const
}
export type setTodolistType=ReturnType<typeof setTodolistAC>


export const setTodolistAC=(todolist:TodolistType[])=>{
    return {
        type:setTodolist,
        todolist
    } as const
}

export const fetchTodolistTC=()=>(dispatch:Dispatch)=>{
    // : ThunkAction<Promise<void>, TodolistDomainType[], unknown, ActionType>=>{
// return (dispatch:Dispatch)=> {
    todolistApi.getTodolists().then((res) => {
        dispatch(setTodolistAC(res.data))

    })
// }
}