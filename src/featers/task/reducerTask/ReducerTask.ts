import {addTodolistAC, removeTodolistAC, setTodolistAC, setTodolistType} from "../../todolist/reducerTodo/ReducerTodo";
import {taskApi, TaskPriorities, TaskStatus, TaskStatuses, TaskType} from "../taskApi";
import {Dispatch} from "redux";
import { AppStateType, AppThunkType} from "../../../app/store";
import {RequestStatusType, setErrorAC, SetErrorType, setStatusAC, SetStatusType} from "../../../app/appReducer/appReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../common/error-utils/error-utils";
import axios from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

let tasks: TasksStateType = {}
const slice = createSlice(({
    name: "task",
    initialState: tasks,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ idTodo: string, idTask: string }>) {
            const task = state[action.payload.idTodo]
            const index = task.findIndex(t => t.id === action.payload.idTask)
            if (index !== -1) task.splice(index, 1)
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId] = [{
                ...action.payload.task,
                entityStatus: 'idle'
            }, ...state[action.payload.task.todoListId]]
        },
        updateTaskAC(state, action: PayloadAction<{ idTodo: string, idTask: string, api: UpdateDomainTaskType }>) {
            state[action.payload.idTodo] = state[action.payload.idTodo].map(t => t.id === action.payload.idTask ? {...t, ...action.payload.api} : t)
        },
        setTasksAC(state, action: PayloadAction<{ idTodo: string, task: TaskType[] }>) {
            state[action.payload.idTodo] = action.payload.task.map((tl: any) => ({...tl, entityStatus: "idle"}))
        },
        changeEntityTaskStatusAC(state, action: PayloadAction<{ idTodo: string, idTask: string, status: RequestStatusType }>) {
            const task = state[action.payload.idTodo]
            const index = task.findIndex(t => t.id === action.payload.idTask)
            if (index !== -1) {
                task[index]={...task[index],entityStatus: action.payload.status }
            }
        },

    },
    extraReducers: builder => {
        builder
            .addCase(addTodolistAC, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(removeTodolistAC, (state, action,) => {
                delete state[action.payload.idTodo]
            })
            .addCase(setTodolistAC, (state, action) => {
                action.payload.todolist.forEach((tl) => {
                    state[tl.id] = []
                })
            })
    }

}))
export const reducerTask = slice.reducer
export const removeTaskAC = slice.actions.removeTaskAC
export const addTaskAC = slice.actions.addTaskAC

export const updateTaskAC = slice.actions.updateTaskAC
export const setTasksAC = slice.actions.setTasksAC
export const changeEntityTaskStatusAC = slice.actions.changeEntityTaskStatusAC


export const getTasksTC=createAsyncThunk('task/getTask', async (arg:string, thunkAPI)=> {
    thunkAPI.dispatch(setStatusAC({status: 'loading'}))
    let res= await taskApi.getTask(arg)
        if (!res.data.error) {
            thunkAPI.dispatch(setTasksAC({idTodo: arg, task: res.data.items}))
            thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
        }

})

export const createTasksTC= createAsyncThunk('task/createTasksTC,',async (arg:{idTodo: string, title: string}, thunkAPI)=>{
    thunkAPI.dispatch(setStatusAC({status: 'loading'}))
    try {
      let res = await taskApi.createTask(arg.idTodo, arg.title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(addTaskAC({task: res.data.data.item}))
                thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
            }
    } catch (e) {
        if (axios.isAxiosError(e))
            handleServerNetworkError(e, thunkAPI.dispatch)
    }
})

export const deleteTasksTC = (idTodo: string, idTask: string): AppThunkType => (dispatch: Dispatch<TaskActionType>) => {
    dispatch(setStatusAC({status: 'loading'}))
    dispatch(changeEntityTaskStatusAC({idTodo, idTask, status: 'loading'}))
    taskApi.deleteTask(idTodo, idTask).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(removeTaskAC({idTodo: idTodo, idTask: idTask}))
            dispatch(setStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
        dispatch(setStatusAC({status: 'idle'}))
    })
}
export const updateTaskTC = (idTodo: string, idTask: string, domainModel: UpdateDomainTaskType) => (dispatch: Dispatch, getState: () => AppStateType) => {
   debugger
    let task = getState().tasks[idTodo].find(t => t.id === idTask)
    if (task) {
        let model: TaskStatus = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        dispatch(setStatusAC({status: 'loading'}))
        taskApi.updateTask(idTodo, idTask, model).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC({idTodo, idTask,api:domainModel}))
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC({error: res.data.messages[0]}))
                } else {
                    dispatch(setErrorAC({error: 'Some error occurred'}))
                }
                dispatch(setStatusAC({status: 'failed'}))
            }
            dispatch(setStatusAC({status: 'idle'}))
        })
            .catch((e) => {
                dispatch(setStatusAC({status: 'failed'}))
                dispatch(setErrorAC(e.message))
            })
    }
}

export type UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type TasksDomainType = TaskType & { entityStatus: RequestStatusType }
export type TasksStateType = { [key: string]: TasksDomainType[] }
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type setTasksType = ReturnType<typeof setTasksAC>
type AddTodolistType = ReturnType<typeof addTodolistAC>
type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type TaskActionType =
    RemoveTaskType
    | AddTaskType
    | setTasksType
    | setTodolistType
    | AddTodolistType
    | RemoveTodolistType
    | SetStatusType
    | SetErrorType
    | ReturnType<typeof changeEntityTaskStatusAC>
    | ReturnType<typeof updateTaskAC>
