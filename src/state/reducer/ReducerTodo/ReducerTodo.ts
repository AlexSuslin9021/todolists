import {v1} from "uuid";
import {FilterType} from "../../../App";
import {todolistApi, TodolistType} from "../../../api/todolistApi";
import {AppActionType, AppThunkType} from "../../Store";

///type:action.type
const removeTodo='REMOVE-TODOLIST'
const addTodo='ADD-TODOLIST'
const changeTitleTodo="CHANGE-TITLE-TODOLIST"
const changeFilterTodo="CHANGE-FILTER-TODOLIST"
export const setTodolist="SET-TODOLIST"


//InitialState
export type TodolistDomainType = TodolistType &{ filter: FilterType }
export let todolistID1 = v1()
let initialState : TodolistDomainType[]  = []


export const reducerTodo=(state:TodolistDomainType[]=initialState, action:AppActionType):TodolistDomainType[]=>{
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

//Action Creator
export const removeTodolistAC=(idTodo:string)=>{return {type:removeTodo, idTodo} as const}
export const addTodolistAC=(title:string)=>{return {type:addTodo, title, idTodo:v1()} as const}
export const changeTitleTodolistAC=(idTodo:string, title: string)=>{return {type:changeTitleTodo, idTodo, title} as const}
export const changeFilterTodolistAC=(idTodo: string, value: FilterType)=>{return {type:changeFilterTodo, idTodo, value} as const}
export const setTodolistAC=(todolist:TodolistType[])=>{return {type:setTodolist, todolist} as const}

//Thunk
export const fetchTodolistTC=(): AppThunkType=> async dispatch=>{
    const res= await todolistApi.getTodolists()
    dispatch(setTodolistAC(res.data))
}
export const updateTodolistTC=(todoId:string, title:string): AppThunkType=> async dispatch=>{
   await todolistApi.updateTodolist(todoId,title)
    dispatch(changeTitleTodolistAC(todoId,title))

}
export const createTodolistTC=( title:string): AppThunkType=> async dispatch=>{
 await todolistApi.createTodolist(title)
    dispatch(addTodolistAC(title))
}
export const deleteTodolistTC=( todoId:string): AppThunkType=> async dispatch=>{
    await todolistApi.deleteTodolist(todoId)
    dispatch(removeTodolistAC(todoId))
}

//type
type removeTodolistType=ReturnType<typeof removeTodolistAC>
type addTodolistType=ReturnType<typeof addTodolistAC>
type changeTitleTodolistType=ReturnType<typeof changeTitleTodolistAC>
type changeFilterTodolistType=ReturnType<typeof changeFilterTodolistAC>
export type setTodolistType=ReturnType<typeof setTodolistAC>
export type TodoActionType=removeTodolistType | addTodolistType | setTodolistType  | changeTitleTodolistType| changeFilterTodolistType