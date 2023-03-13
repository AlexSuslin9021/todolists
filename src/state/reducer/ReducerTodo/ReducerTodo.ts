import {v1} from "uuid";

import {FilterType} from "../../../App";

///TYPE Action
const removeTodo='REMOVE-TODOLIST'
const addTodo='ADD-TODOLIST'
const changeTitleTodo="CHANGE-TITLE-TODOLIST"
const changeFilterTodo="CHANGE-FILTER-TODOLIST"


//InitialState

export type TodolistsType = {
    id: string, title: string, filter: FilterType
}
export let todolistID1 = v1()
export let todolistID2 = v1()
let initialState : TodolistsType[]  =
    [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
type actionType=ReturnType<typeof removeTodolistAC> | ReturnType<typeof addTodolistAC> | ReturnType<typeof changeTitleTodolistAC>| ReturnType<typeof changeFilterTodolistAC>
export const reducerTodo=(state:TodolistsType[]=initialState, action:actionType):TodolistsType[]=>{
    debugger
    switch (action.type){
        case removeTodo:

            return state.filter(t => t.id !== action.idTodo)
        case addTodo:
            return[...state, {id:action.idTodo, title:action.title, filter:'all'}]
        case changeTitleTodo:
            return state.map(t=> t.id===action.idTodo ? {...t, title:action.title}:t)
        case changeFilterTodo:
            return state.map(t => t.id === action.idTodo ? {...t, filter: action.value} : t)

        default:return state
    }
}
/// RemoveTodolist
type RemoveTodolistType={
    type:'REMOVE-TODOLIST',
    idTodo :string
}
export const removeTodolistAC=(idTodo:string):RemoveTodolistType=>{
    return {
        type:removeTodo,
        idTodo
    }
}

/// ADDTodolist
type AddTodolistType={
    type:'ADD-TODOLIST',
    title :string
    idTodo:string
}
export const addTodolistAC=(title:string):AddTodolistType=>{
    return {
        type:addTodo,
        title,
        idTodo:v1()
    }
}
/// CHANGETitleTodolist
type ChangeTitleTodolistType={
    type:"CHANGE-TITLE-TODOLIST",
    idTodo:string
    title :string
}
export const changeTitleTodolistAC=(idTodo:string, title: string):ChangeTitleTodolistType=>{
    return {
        type:changeTitleTodo,
        idTodo,
        title
    }
}
/// CHANGEFilterTodolist
type ChangeFilterTodolistType={
    type:"CHANGE-FILTER-TODOLIST",
    idTodo:string
    value :FilterType
}
export const changeFilterTodolistAC=(idTodo: string, value: FilterType):ChangeFilterTodolistType=>{
    return {
        type:changeFilterTodo,
        idTodo,
        value
    }
}