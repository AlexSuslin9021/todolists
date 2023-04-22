
import {addTodolistAC, removeTodolistAC, setTodolist, setTodolistType} from "../ReducerTodo/ReducerTodo";
import {taskApi, TaskPriorities, TaskStatus, TaskStatuses, TaskType} from "../../../api/taskApi";
import {Dispatch} from "redux";
import {AppActionType, AppStateType, AppThunkType} from "../../Store";
import {RequestStatusType, setErrorAC, SetErrorType, setStatusAC, SetStatusType} from "../AppReducer/AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../error-utils/error-utils";
import axios from "axios";


const removeTask = 'REMOVE-TASK'
const addTask = 'ADD-TASK'
const changeTaskStatus = 'CHANGE-TASK-STATUS'
const changeTaskTitle = 'CHANGE-TASK-TITLE'
const addTodo = 'ADD-TODOLIST'
const removeTodo = 'REMOVE-TODOLIST'
const setTasks = 'SET_TASKS'
const changeEntityStatus = 'CHANGE_ENTITY_STATUS'
const updateTitle = 'UPDATE-TITLE'

//initial state
let tasks: TasksStateType = {}

export const reducerTask = (state: TasksStateType = tasks, action: AppActionType): TasksStateType => {
    switch (action.type) {
        case removeTask:
            return {...state, [action.idTodo]: state[action.idTodo].filter(t => t.id !== action.idTask)}
        case addTask:
            return {...state, [action.task.todoListId]:[{...action.task, entityStatus:'idle'}, ...state[action.task.todoListId]]}
        // case changeTaskStatus:
        //
        //     return {
        //         ...state, [action.idTodo]:state[action.idTodo].map(t=>t.id===action.idTask ? {...t, status:action.status} : t)
        //     }
        // case  changeTaskTitle:
        //     return {
        //         ...state,
        //         [action.idTodo]: state[action.idTodo].map(t => t.id === action.idTask ? {...t, ...action.model} : t)
        //     }
        case addTodo:
            return {...state, [action.todolist.id]: []}
        case removeTodo:
            const copyState = {...state, [action.idTodo]: state[action.idTodo]}
            delete copyState[action.idTodo]
            return copyState
        case setTodolist: {
            const stateCopy = {...state}
            action.todolist.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case updateTitle:
    return {
        ...state, [action.idTodo]:
            state[action.idTodo].map(t => t.id === action.idTask ? {...t, ...action.api} : t)
    }
        case setTasks: {
            return {
                ...state, [action.idTodo]: action.task.map(tl => ({...tl, entityStatus: "idle"}))
            }
        }
        case changeEntityStatus:

            return {
                ...state,
                [action.idTodo]: state[action.idTodo].map(t => t.id === action.idTask ? {
                    ...t,
                    entityStatus: action.status
                } : t)
            }
    }
    return state
}

export const removeTaskAC = (idTodo: string, idTask: string) => {
    return {type: removeTask, idTodo, idTask,} as const
}
export const addTaskAC = (task:TaskType) => {
    return {type: addTask, task} as const
}
export const changeTaskStatusAC = (idTodo: string, idTask: string, status: TaskStatuses) => {
    return {type: changeTaskStatus, idTodo, idTask, status} as const
}
export const changeTaskTitleAC = (idTodo: string, idTask: string, model: any) => {
    return {type: changeTaskTitle, idTodo, idTask, model} as const
}
export const updateTitleTaskAC = (idTodo: string, idTask: string, api: UpdateDomainTaskType) => {
    return {
        type: updateTitle, idTodo, idTask, api
    } as const
}
export const setTasksAC = (idTodo: string, task: TaskType[]) => {
    return {type: setTasks, idTodo, task,} as const
}
export const changeEntityTaskStatusAC = (idTodo: string, idTask: string, status: RequestStatusType) => {
    return {type: changeEntityStatus, idTodo, idTask, status} as const
}

//Thunk
export const getTasksTC = (id: string): AppThunkType => (dispatch: Dispatch<TaskActionType>) => {
    dispatch(setStatusAC('loading'))

    taskApi.getTask(id).then((res) => {
        if(!res.data.error) {

            dispatch(setTasksAC(id, res.data.items))
            dispatch(setStatusAC('succeeded'))
        }
        else{
            if (res.data.error) {
                dispatch(setErrorAC(res.data.error))
            } else {
                dispatch(setErrorAC('Some error occurred'))
            }
            dispatch(setStatusAC('idle'))
        }

    })
}
export const createTasksTC = (idTodo: string, title: string): AppThunkType => (dispatch: Dispatch<TaskActionType>) => {
    dispatch(setStatusAC('loading'))
    try {
        taskApi.createTask(idTodo, title).then((res) => {
            if (res.data.resultCode === 0) {

                dispatch(addTaskAC(res.data.data.item))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
    }catch (e) {
        if(axios.isAxiosError(e))
            handleServerNetworkError(e, dispatch)
        //дописать
        }



}
export const deleteTasksTC = (idTodo: string, idTask: string): AppThunkType => (dispatch: Dispatch<TaskActionType>) => {
    dispatch(setStatusAC('loading'))
    dispatch(changeEntityTaskStatusAC(idTodo, idTask, 'loading'))
    taskApi.deleteTask(idTodo, idTask).then((res) => {
        if (res.data.resultCode === 0) {
        dispatch(removeTaskAC(idTodo, idTask))
        dispatch(setStatusAC('succeeded'))
        }
        else {
           handleServerAppError(res.data,dispatch)
        }
        dispatch(setStatusAC('idle'))
    })
}
export const updateTaskTC = (idTodo: string, idTask: string, api: UpdateDomainTaskType) => (dispatch: Dispatch, getState:()=>AppStateType) => {
    let task=getState().tasks[idTodo].find(t=>t.id===idTask)
    if(task){
        let model:TaskStatus={
            title:task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...api
        }
        dispatch(setStatusAC('loading'))
        taskApi.updateTask(idTodo, idTask, model).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(updateTitleTaskAC(idTodo, idTask, api))
                dispatch(setStatusAC('succeeded'))
            }
            else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('Some error occurred'))
                }
                dispatch(setStatusAC('failed'))
            }
            dispatch(setStatusAC('idle'))
        })
            .catch((e)=>{
            dispatch(setStatusAC('failed'))
            dispatch(setErrorAC(e.message))
        })
    }}
// type
// case updateTitleTask:
//     return {
//         ...state, [action.idTodo]:
//             state[action.idTodo].map(t => t.id === action.idTask ? {...t, ...action.api} : t)
//     }
// const updateTitleTaskAC = (idTodo: string, idTask: string, api: UpdateDomainTaskType) => {
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
type TasksDomainType=TaskType &{ entityStatus: RequestStatusType}
export type TasksStateType = { [key: string]: TasksDomainType[] }
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type AddTaskType = ReturnType<typeof addTaskAC>
type setTasksType = ReturnType<typeof setTasksAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>
type AddTodolistType = ReturnType<typeof addTodolistAC>
type RemoveTodolistType = ReturnType<typeof removeTodolistAC>

export type TaskActionType =
    RemoveTaskType
    | AddTaskType
    | setTasksType
    | setTodolistType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodolistType
    | RemoveTodolistType
    | SetStatusType
    | SetErrorType
    | ReturnType<typeof changeEntityTaskStatusAC>
| ReturnType<typeof updateTitleTaskAC>


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
