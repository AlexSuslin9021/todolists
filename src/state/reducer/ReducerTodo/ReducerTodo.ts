import {v1} from "uuid";
import {todolistApi, TodolistType} from "../../../api/todolistApi";
import {AppActionType, AppThunkType} from "../../Store";
import {RequestStatusType, setErrorAC, setStatusAC, SetStatusType} from "../AppReducer/AppReducer";
import {handleServerAppError} from "../../../error-utils/error-utils";
import {getTasksTC} from "../ReducerTask/ReducerTask";
import {createSlice} from "@reduxjs/toolkit";

///type:action.type
const removeTodo = 'REMOVE-TODOLIST'
const addTodo = 'ADD-TODOLIST'
const changeTitleTodo = "CHANGE-TITLE-TODOLIST"
const changeFilterTodo = "CHANGE-FILTER-TODOLIST"
const changeEntityStatus = "CHANGE-ENTITY-STATUS"
export const setTodolist = "SET-TODOLIST"
export const clearData = "CLEAR_DATA"


//InitialState
export type TodolistDomainType = TodolistType & { filter: FilterType, entityStatus: RequestStatusType }
export let todolistID1 = v1()
let initialState: TodolistDomainType[] = []

// const slice=createSlice(({
//     name:"todolist",
//     initialState:initialState,
    // reducers: {
    //     removeTaskAC(state, action: PayloadAction<{ idTodo: string, idTask: string }>) {
    //         state[action.payload.idTodo].filter(t => t.id !== action.payload.idTask)
    //     }
    //     ,
    //     addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
    //         state[action.payload.task.todoListId] = [{...action.payload.task, entityStatus: 'idle'}, ...state[action.payload.task.todoListId]]
    //     },
    //     updateTitleTaskAC(state, action: PayloadAction<{ idTodo: string, idTask: string, api: UpdateDomainTaskType }>){
    //         state[action.payload.idTodo]= state[action.payload.idTodo].map(t => t.id === action.payload.idTask ? {...t, ...action.payload.api} : t)
    //     },
    //     setTasksAC(state, action: PayloadAction<{ idTodo: string, task: TaskType[]}> ){
    //         state[action.payload.idTodo]= action.payload.task.map((tl:any) => ({...tl, entityStatus: "idle"}))
    //     },
    //     changeEntityTaskStatusAC(state, action: PayloadAction<{ idTodo: string, idTask: string, status: RequestStatusType}> ){
    //         state[action.payload.idTodo]= state[action.payload.idTodo].map(t => t.id === action.payload.idTask ? {...t, entityStatus: action.payload.status} : t)
    //     },
    //
    // },
    // extraReducers:{
    //     [setTodolistAC.type]:(state, action: PayloadAction<{ todolist: TodolistType[] }>)=>{
    //         return  action.payload.todolist.forEach((tl:any) => {state[tl.id] = []})
    //     },
    //     [addTodolistAC.type]:(state, action: PayloadAction<{ todolist: TodolistType }>)=>{
    //         state[action.payload.todolist.id]= []
    //     },
    //     [removeTodolistAC.type]:(state, action: PayloadAction<{ idTodo: string }>)=>{
    //         delete state[action.payload.idTodo]
    //     },
    //     [clearDataTodosAC.type]:(state, action: PayloadAction)=>{
    //         state = {}
    //     },
    // }
// }))
export const reducerTodo = (state: TodolistDomainType[] = initialState, action: AppActionType): TodolistDomainType[] => {
    switch (action.type) {
        case removeTodo:
            return state.filter(t => t.id !== action.idTodo)
        case addTodo:

            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case changeTitleTodo:
            return state.map(t => t.id === action.idTodo ? {...t, title: action.title} : t)
        case changeFilterTodo:
            return state.map(t => t.id === action.idTodo ? {...t, filter: action.value} : t)
        case changeEntityStatus:
            return state.map(t => t.id === action.idTodo ? {...t, entityStatus: action.status} : t)
        case setTodolist:
            return action.todolist.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        case clearData:
            return []
        default:
            return state
    }
}

//Action Creator
export const removeTodolistAC = (idTodo: string) => {
    return {type: removeTodo, idTodo} as const
}
export const changeEntityStatusAC = (idTodo: string, status: RequestStatusType) => {
    return {type: changeEntityStatus, idTodo, status} as const
}
export const addTodolistAC = (todolist: TodolistType) => {

    return {type: addTodo, todolist} as const
}
export const changeTitleTodolistAC = (idTodo: string, title: string) => {
    return {type: changeTitleTodo, idTodo, title} as const
}
export const changeFilterTodolistAC = (idTodo: string, value: FilterType) => {
    return {type: changeFilterTodo, idTodo, value} as const
}
export const setTodolistAC = (todolist: TodolistType[]) => {
    return {type: setTodolist, todolist} as const
}
export const clearDataTodosAC=()=>{return{type:clearData} as const}

//Thunk
export const fetchTodolistTC = (): AppThunkType => async dispatch => {
    dispatch(setStatusAC('loading'))
    const res = await todolistApi.getTodolists()
    dispatch(setTodolistAC(res.data))
    await res.data.forEach((tl)=> dispatch(getTasksTC(tl.id)))

    dispatch(setStatusAC('succeeded'))
}
export const updateTodolistTC = (todoId: string, title: string): AppThunkType => async dispatch => {

    dispatch(setStatusAC('loading'))
    const res = await todolistApi.updateTodolist(todoId, title)
    if (res.data.resultCode === 0) {
        dispatch(changeTitleTodolistAC(todoId, title))
        dispatch(setStatusAC('succeeded'))
    } else {
        if (res.data.messages.length) {
            dispatch(setErrorAC(res.data.messages[0]))
        } else {
            dispatch(setErrorAC('Some error occurred'))
        }
        dispatch(setStatusAC('failed'))
    }
}
export const createTodolistTC = (title: string): AppThunkType => async dispatch => {

    dispatch(setStatusAC('loading'))
    let res = await todolistApi.createTodolist(title)
    if (res.data.resultCode === 0) {
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setStatusAC('succeeded'))
    } else {
        handleServerAppError(res.data, dispatch)
    }
    dispatch(setStatusAC('failed'))
}
export const deleteTodolistTC = (todoId: string): AppThunkType => async dispatch => {
    dispatch(setStatusAC('loading'))
    dispatch(changeEntityStatusAC(todoId, 'loading'))
    let res = await todolistApi.deleteTodolist(todoId)
    if (res.data.resultCode === 0) {
        dispatch(removeTodolistAC(todoId))
        dispatch(setStatusAC('succeeded'))
    } else {
        if (res.data.messages.length) {
            dispatch(setErrorAC(res.data.messages[0]))
        } else {
            dispatch(setErrorAC('Some error occurred'))
        }
        dispatch(setStatusAC('failed'))
    }
}

//type
type removeTodolistType = ReturnType<typeof removeTodolistAC>
export type clearDataTodosType = ReturnType<typeof clearDataTodosAC>
type addTodolistType = ReturnType<typeof addTodolistAC>
type changeTitleTodolistType = ReturnType<typeof changeTitleTodolistAC>
type changeFilterTodolistType = ReturnType<typeof changeFilterTodolistAC>
export type setTodolistType = ReturnType<typeof setTodolistAC>
export type ChangeEntityStatusType = ReturnType<typeof changeEntityStatusAC>
export type TodoActionType = removeTodolistType |
    addTodolistType | setTodolistType | changeTitleTodolistType | changeFilterTodolistType
    | SetStatusType
    | ChangeEntityStatusType | clearDataTodosType

export type FilterType = 'all' | 'active' | 'completed'
// case 'REMOVE-TODOLIST':
// return state.filter(tl => tl.id !== action.id)
// case 'ADD-TODOLIST':
// return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
//
// case 'CHANGE-TODOLIST-TITLE':
// return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
// case 'CHANGE-TODOLIST-FILTER':
// return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
// case 'CHANGE-TODOLIST-ENTITY-STATUS':
// return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
// case 'SET-TODOLISTS':
// return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
// default:
// return state
// }

