import {v1} from "uuid";
import {todolistApi, TodolistType} from "../../../api/todolistApi";
import {AppActionType, AppThunkType} from "../../Store";
import {RequestStatusType, setErrorAC, setStatusAC, SetStatusType} from "../AppReducer/AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../error-utils/error-utils";
import {getTasksTC} from "../ReducerTask/ReducerTask";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export type TodolistDomainType = TodolistType & { filter: FilterType, entityStatus: RequestStatusType }
export let todolistID1 = v1()
let initialState: TodolistDomainType[] = []


export const fetchTodolistTC=createAsyncThunk('todo/fetchTodolistTC',async (_,thunkAPI)=>{
    const {dispatch} = thunkAPI
    try {

        dispatch(setStatusAC({status: 'loading'}))
        const res = await todolistApi.getTodolists()
        dispatch(setTodolistAC({todolist: res.data}))
        await res.data.forEach((tl) => dispatch(getTasksTC(tl.id)))
        dispatch(setStatusAC({status: 'succeeded'}))
    }catch (e) {
        if (axios.isAxiosError(e))
            handleServerNetworkError(e, thunkAPI.dispatch)
        //дописать
    }
})

export const updateTodolistTC = createAsyncThunk('todo/updateTodolistTC_',async (arg:{todoId: string, title: string}, thunkAPI)=>{
    try {
        const {dispatch} = thunkAPI
        dispatch(setStatusAC({status:'loading'}))
        const res = await todolistApi.updateTodolist(arg.todoId, arg.title)
        if (res.data.resultCode === 0) {
            dispatch(changeTitleTodolistAC({idTodo:arg.todoId, title:arg.title}))
            dispatch(setStatusAC({status:'succeeded'}))

    } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e))
            handleServerNetworkError(e, thunkAPI.dispatch)
    }
})

export const createTodolistTC=createAsyncThunk('todo/createTodolistTC',async (arg:string, thunkAPI)=>{
    const {dispatch} = thunkAPI
    try {
        dispatch(setStatusAC({status: 'loading'}))
        let res = await todolistApi.createTodolist(arg)
        if (res.data.resultCode === 0) {
            dispatch(addTodolistAC({todolist: res.data.data.item}))
            dispatch(setStatusAC({status:'succeeded'}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e))
            handleServerNetworkError(e, thunkAPI.dispatch)
    }
})

export const deleteTodolistTC=createAsyncThunk('todo/deleteTodolistTC',async (arg:string, thunkAPI)=>{
    const {dispatch} = thunkAPI
    try{
        dispatch(setStatusAC({status:'loading'}))
        dispatch(changeEntityStatusAC({idTodo:arg, status:'loading'}))
        let res = await todolistApi.deleteTodolist(arg)
        if (res.data.resultCode === 0) {
            dispatch(removeTodolistAC({idTodo:arg }))
            dispatch(setStatusAC({status:'succeeded'}))
        }else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e))
            handleServerNetworkError(e, thunkAPI.dispatch)
    }
})


//type
type removeTodolistType = ReturnType<typeof removeTodolistAC>
// export type clearDataTodosType = ReturnType<typeof clearDataTodosAC>
type addTodolistType = ReturnType<typeof addTodolistAC>
type changeTitleTodolistType = ReturnType<typeof changeTitleTodolistAC>
type changeFilterTodolistType = ReturnType<typeof changeFilterTodolistAC>
export type setTodolistType = ReturnType<typeof setTodolistAC>
export type ChangeEntityStatusType = ReturnType<typeof changeEntityStatusAC>
export type TodoActionType = removeTodolistType |
    addTodolistType | setTodolistType | changeTitleTodolistType | changeFilterTodolistType
    | SetStatusType
    | ChangeEntityStatusType
    // | clearDataTodosType

export type FilterType = 'all' | 'active' | 'completed'


const slice = createSlice({
    name: "todolist",
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ idTodo: string }>) {
            const index=state.findIndex(todo=>todo.id===action.payload.idTodo)
            if(index!==-1) state.splice(index,1)
        },
        changeEntityStatusAC(state, action: PayloadAction<{ idTodo: string, status: RequestStatusType }>) {
            const todo=state.find(todo=>todo.id===action.payload.idTodo)
            if(todo){ todo.entityStatus=action.payload.status}

        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTitleTodolistAC(state, action: PayloadAction<{ idTodo: string, title: string }>) {
            const todo=state.find(todo=>todo.id===action.payload.idTodo)
            if(todo){ todo.title=action.payload.title}

        },

        changeFilterTodolistAC(state, action: PayloadAction<{ idTodo: string, value: FilterType }>) {
            const todo=state.find(todo=>todo.id===action.payload.idTodo)
            if(todo){ todo.filter=action.payload.value}

        },
        setTodolistAC(state, action: PayloadAction<{ todolist: TodolistType[] }>) {

            return  action.payload.todolist.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        },
        // clearDataTodosAC(state, action: PayloadAction) {
        //     state = []
        // }
    }
})
export const reducerTodo =slice.reducer
export const removeTodolistAC = slice.actions.removeTodolistAC
export const changeEntityStatusAC = slice.actions.changeEntityStatusAC
export const addTodolistAC = slice.actions.addTodolistAC
export const changeTitleTodolistAC = slice.actions.changeTitleTodolistAC
export const changeFilterTodolistAC =slice.actions.changeFilterTodolistAC
export const setTodolistAC = slice.actions.setTodolistAC
// export const clearDataTodosAC=slice.actions.clearDataTodosAC