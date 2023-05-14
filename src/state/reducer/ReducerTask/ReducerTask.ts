import {addTodolistAC, removeTodolistAC, setTodolistAC, setTodolistType} from "../ReducerTodo/ReducerTodo";
import {taskApi, TaskPriorities, TaskStatus, TaskStatuses, TaskType} from "../../../api/taskApi";
import {Dispatch} from "redux";
import { AppStateType, AppThunkType} from "../../Store";
import {RequestStatusType, setErrorAC, SetErrorType, setStatusAC, SetStatusType} from "../AppReducer/AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../error-utils/error-utils";
import axios from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


//initial state
let tasks: TasksStateType = {}
const slice = createSlice(({
    name: "task",
    initialState: tasks,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ idTodo: string, idTask: string }>) {
            const task = state[action.payload.idTodo]
            const index = task.findIndex(t => t.id !== action.payload.idTask)
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
            const index = task.findIndex(t => t.id == action.payload.idTask)
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

//Thunk
export const getTasksTC=createAsyncThunk('task/getTask',(arg:string, thunkAPI)=> {
    thunkAPI.dispatch(setStatusAC({status: 'loading'}))
    taskApi.getTask(arg).then((res) => {
        if (!res.data.error) {
            thunkAPI.dispatch(setTasksAC({idTodo: arg, task: res.data.items}))
            thunkAPI.dispatch(setStatusAC({status: 'succeeded'}))
        } else {
            // handleServerAppError(res.data, thunkAPI.dispatch)
        }
    })
})
// export const _getTasksTC = (id: string): AppThunkType => (dispatch: Dispatch<TaskActionType>) => {
//     dispatch(setStatusAC({status: 'loading'}))
//     taskApi.getTask(id).then((res) => {
//         if (!res.data.error) {
//             dispatch(setTasksAC({idTodo: id, task: res.data.items}))
//             dispatch(setStatusAC({status: 'succeeded'}))
//         }  else {
//             // handleServerAppError(res.data, dispatch)
//         }
//
//     })
// }
export const createTasksTC = (idTodo: string, title: string): AppThunkType => (dispatch: Dispatch<TaskActionType>) => {
    dispatch(setStatusAC({status: 'loading'}))
    try {
        taskApi.createTask(idTodo, title).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
    } catch (e) {
        if (axios.isAxiosError(e))
            handleServerNetworkError(e, dispatch)
        //дописать
    }


}
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
// type
// case updateTitleTask:
//     return {
//         ...state, [action.idTodo]:
//             state[action.idTodo].map(t => t.id === action.idTask ? {...t, ...action.api} : t)
//     }
// const updateTaskAC = (idTodo: string, idTask: string, api: UpdateDomainTaskType) => {
//     return {
//         type: updateTitleTask, idTodo, idTask, api
//     } as const
// }

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

// type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type AddTodolistType = ReturnType<typeof addTodolistAC>
type RemoveTodolistType = ReturnType<typeof removeTodolistAC>

export type TaskActionType =
    RemoveTaskType
    | AddTaskType
    | setTasksType
    | setTodolistType
    // | ChangeTaskStatusType
    // | clearDataTodosType
    | AddTodolistType
    | RemoveTodolistType
    | SetStatusType
    | SetErrorType
    | ReturnType<typeof changeEntityTaskStatusAC>
    | ReturnType<typeof updateTaskAC>


// switch (action.type) {
//     case 'REMOVE-TASK':
//         return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
//     case 'ADD-TASK':
//         return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//     case 'UPDATE-TASK':
//         return {
//             ...state,
//             [action.todolistId]: state[action.todolistId]
//                 .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
//         }
//     case 'ADD-TODOLIST':
//         return {...state, [action.todolist.id]: []}
//     case 'REMOVE-TODOLIST':
//         const copyState = {...state}
//         delete copyState[action.id]
//         return copyState
//     case 'SET-TODOLISTS': {
//         const copyState = {...state}
//         action.todolists.forEach(tl => {
//             copyState[tl.id] = []
//         })
//         return copyState
//     }
//     case 'SET-TASKS':
//         return {...state, [action.todolistId]: action.tasks}
//     default:
//         return state
// }


// export const updateTasksTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
//     return (dispatch: Dispatch, getState: () => AppRootStateType) => {
//
// // так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// // те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва
//
//         const allTasksFromState = getState().tasks;
//         const tasksForCurrentTodolist = allTasksFromState[todolistId]
//         const task = tasksForCurrentTodolist.find(t => {
//             return t.id === taskId
//         })
//
//
//         if (task) {
//             todolistApi.updateTodolist(todolistId, taskId,
//                 // {
//                 // title: task.title,
//                 // startDate: task.startDate,
//                 // priority: task.priority,
//                 // description: task.description,
//                 // deadline: task.deadline,
//                 // status: status
//             }).then(() => {
//                 const action = changeTaskStatusAC(taskId, status, todolistId)
//                 dispatch(action)
//             })
//         }
//     }
// }
