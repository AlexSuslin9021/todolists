import {v1} from "uuid";
import {todolistApi, TodolistType} from "../../../api/todolistApi";
import {AppActionType, AppThunkType} from "../../Store";
import {RequestStatusType, setErrorAC, setStatusAC, SetStatusType} from "../AppReducer/AppReducer";
import {handleServerAppError} from "../../../error-utils/error-utils";
import {getTasksTC} from "../ReducerTask/ReducerTask";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

///type:action.type

export const setTodolist = "SET-TODOLIST"



//InitialState
export type TodolistDomainType = TodolistType & { filter: FilterType, entityStatus: RequestStatusType }
export let todolistID1 = v1()
let initialState: TodolistDomainType[] = []



const slice = createSlice({
    name: "todolist",
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ idTodo: string }>) {
            state.filter(t => t.id !== action.payload.idTodo)
        },
        changeEntityStatusAC(state, action: PayloadAction<{ idTodo: string, status: RequestStatusType }>) {
            state.map(t => t.id === action.payload.idTodo ? {...t, entityStatus: action.payload.status} : t)
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.push({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTitleTodolistAC(state, action: PayloadAction<{ idTodo: string, title: string }>) {
            state.map(t => t.id === action.payload.idTodo ? {...t, title: action.payload.title} : t)
        },

        changeFilterTodolistAC(state, action: PayloadAction<{ idTodo: string, value: FilterType }>) {
            state.map(t => t.id === action.payload.idTodo ? {...t, filter: action.payload.value} : t)
        },
        setTodolistAC(state, action: PayloadAction<{ todolist: TodolistType[] }>) {
            debugger
            return  action.payload.todolist.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        },
        clearDataTodosAC(state, action: PayloadAction) {
            state = []
        }
    }
})
export const reducerTodo =slice.reducer
    // (state: TodolistDomainType[] = initialState, action: AppActionType): TodolistDomainType[] => {
    // switch (action.type) {
        // // case removeTodo:
        // //     return state.filter(t => t.id !== action.idTodo)
        // case addTodo:
        //
        //     return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        // case changeTitleTodo:
        //     return state.map(t => t.id === action.idTodo ? {...t, title: action.title} : t)
        // case changeFilterTodo:
        //     return state.map(t => t.id === action.idTodo ? {...t, filter: action.value} : t)
        // case changeEntityStatus:
        //     return state.map(t => t.id === action.idTodo ? {...t, entityStatus: action.status} : t)
        // case setTodolist:
        //     return action.todolist.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        // case clearData:
        //     return []
//         default:
//             return state
//     }
// }

//Action Creator
export const removeTodolistAC = slice.actions.removeTodolistAC
export const changeEntityStatusAC = slice.actions.changeEntityStatusAC
export const addTodolistAC = slice.actions.addTodolistAC
export const changeTitleTodolistAC = slice.actions.changeTitleTodolistAC
export const changeFilterTodolistAC =slice.actions.changeFilterTodolistAC
export const setTodolistAC = slice.actions.setTodolistAC
export const clearDataTodosAC=slice.actions.clearDataTodosAC

//Thunk
export const fetchTodolistTC = (): AppThunkType => async dispatch => {
    dispatch(setStatusAC({status:'loading'}))
    const res = await todolistApi.getTodolists()
    dispatch(setTodolistAC({todolist:res.data}))
    await res.data.forEach((tl)=> dispatch(getTasksTC(tl.id)))

    dispatch(setStatusAC({status:'succeeded'}))
}
export const updateTodolistTC = (todoId: string, title: string): AppThunkType => async dispatch => {

    dispatch(setStatusAC({status:'loading'}))
    const res = await todolistApi.updateTodolist(todoId, title)
    if (res.data.resultCode === 0) {
        dispatch(changeTitleTodolistAC({idTodo:todoId, title}))
        dispatch(setStatusAC({status:'succeeded'}))
    } else {
        if (res.data.messages.length) {
            dispatch(setErrorAC({error:res.data.messages[0]}))
        } else {
            dispatch(setErrorAC({error:'Some error occurred'}))
        }
        dispatch(setStatusAC({status:'failed'}))
    }
}
export const createTodolistTC = (title: string): AppThunkType => async dispatch => {

    dispatch(setStatusAC({status:'loading'}))
    let res = await todolistApi.createTodolist(title)
    if (res.data.resultCode === 0) {
        dispatch(addTodolistAC({todolist:res.data.data.item}))
        dispatch(setStatusAC({status:'succeeded'}))
    } else {
        handleServerAppError(res.data, dispatch)
    }
    dispatch(setStatusAC({status:'failed'}))
}
export const deleteTodolistTC = (todoId: string): AppThunkType => async dispatch => {
    dispatch(setStatusAC({status:'loading'}))
    dispatch(changeEntityStatusAC({idTodo:todoId, status:'loading'}))
    let res = await todolistApi.deleteTodolist(todoId)
    if (res.data.resultCode === 0) {
        dispatch(removeTodolistAC({idTodo:todoId, }))
        dispatch(setStatusAC({status:'succeeded'}))
    } else {
        if (res.data.messages.length) {
            dispatch(setErrorAC({error:res.data.messages[0]}))
        } else {
            dispatch(setErrorAC({error:'Some error occurred'}))
        }
        dispatch(setStatusAC({status:'failed'}))
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

