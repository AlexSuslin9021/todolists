import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, setTodolist, setTodolistType} from "../ReducerTodo/ReducerTodo";
import {taskApi, TaskPriorities, TaskStatus, TaskStatuses, TaskType} from "../../../api/taskApi";
import {Dispatch} from "redux";
import {AppActionType, AppStateType, AppThunkType} from "../../Store";
import {RequestStatusType, setErrorAC, SetErrorType, setStatusAC, SetStatusType} from "../AppReducer/AppReducer";


const removeTask = 'REMOVE-TASK'
const addTask = 'ADD-TASK'
const changeTaskStatus = 'CHANGE-TASK-STATUS'
const changeTaskTitle = 'CHANGE-TASK-TITLE'
const addTodo = 'ADD-TODOLIST'
const removeTodo = 'REMOVE-TODOLIST'
const setTasks = 'SET_TASKS'
const changeEntityStatus = 'CHANGE_ENTITY_STATUS'

//initial state
let tasks: TasksType  = {}

export const reducerTask = (state: TasksType  = tasks, action: AppActionType): TasksType => {
    switch (action.type) {
        case removeTask:
            return {...state, [action.idTodo]: state[action.idTodo].filter(t => t.id !== action.idTask)}
        case addTask:

            return {
                ...state, [action.idTodo]: [ {
                    id: v1(),
                    title: action.title,
                    status: TaskStatuses.New,
                    todoListId: action.idTodo,
                    description: '',
                    startDate: '',
                    addedDate: '',
                    deadline: '',
                    order: 0,
                    priority: TaskPriorities.High,
                    entityStatus:'idle'
                },...state[action.idTodo],

                ]
            }
        case changeTaskStatus:

            return {
                ...state, [action.idTodo]: state[action.idTodo].map(t => t.id === action.idTask ? {...t, ... action.model} : t)}
        case  changeTaskTitle:
            return {
                ...state,
                [action.idTodo]: state[action.idTodo].map(t => t.id === action.idTask ? {...t, title: action.title} : t)
            }
        case addTodo:
            return {...state, [action.idTodo]: []}
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
        case setTasks: {
            return {...state, [action.idTodo]: action.task}
        }
        case changeEntityStatus:

            return {...state, [action.idTodo] : state[action.idTodo].map(t=>t.id===action.idTask ? {...t,entityStatus:action.status}: t)}
    }
    return state
}
//Action creator
export const removeTaskAC = (idTodo: string, idTask: string) => {
    return {type: removeTask, idTodo, idTask,} as const
}
export const addTaskAC = (idTodo: string, title: string) => {
    return {type: addTask, idTodo, title,} as const
}
export const changeTaskStatusAC = (idTodo: string, idTask: string, model: TaskUpdateModelDomainType) => {
    return {type: changeTaskStatus, idTodo, idTask, model} as const
}
export const changeTaskTitleAC = (idTodo: string, idTask: string, title: string) => {
    return {type: changeTaskTitle, idTodo, idTask, title} as const
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
        // if (res.data.resultCode === 0) {
        dispatch(setTasksAC(id, res.data.items))
        dispatch(setStatusAC('succeeded'))
        // }
     // else{
     //        if (res.data.messages.length) {
     //            dispatch(setErrorAC(res.data.messages[0]))
     //        } else {
     //            dispatch(setErrorAC('Some error occurred'))
     //        }
     //        dispatch(setStatusAC('idle'))
     //    }


    })
}
export const createTasksTC = (idTodo: string, title: string): AppThunkType => (dispatch: Dispatch<TaskActionType>) => {
    taskApi.createTask(idTodo, title).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(idTodo, title))
            dispatch(setStatusAC('succeeded'))
        }
        else {
            if (res.data.messages.length) {
                dispatch(setErrorAC(res.data.messages))
            } else {
                dispatch(setErrorAC('Some error occurred'))
            }
            dispatch(setStatusAC('failed'))
        }
        dispatch(setStatusAC('idle'))
    })
}
export const deleteTasksTC = (idTodo: string, idTask: string): AppThunkType => (dispatch: Dispatch<TaskActionType>) => {
    dispatch(setStatusAC('loading'))
    dispatch(changeEntityTaskStatusAC(idTodo,idTask,'loading'))
    taskApi.deleteTask(idTodo, idTask).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(removeTaskAC(idTodo, idTask))
            dispatch(setStatusAC('succeeded'))
        }
        else {
            if (res.data.messages.length) {
                dispatch(setErrorAC(res.data.messages))
            } else {
                dispatch(setErrorAC('Some error occurred'))
            }
            dispatch(setStatusAC('failed'))
        }
        dispatch(setStatusAC('idle'))
    })
}

export const updateTasksTC = (idTodo: string, idTask: string, domainModel:TaskUpdateModelDomainType): AppThunkType => (dispatch: Dispatch<TaskActionType>, getState:()=>AppStateType) => {
const task=getState().tasks[idTodo].find(t=>t.id===idTask)
if(task) {
    const apiModel: TaskStatus = {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        ...domainModel
    }

    taskApi.updateTask(idTodo, idTask, apiModel).then((res) => {

        dispatch(changeTaskStatusAC(idTodo, idTask, domainModel))
    })
}
}

// type

export type TaskUpdateModelDomainType= {
    title?: string,
    startDate?: string,
    priority?: TaskPriorities,
    description?: string,
    deadline?: string,
    status?: TaskStatuses
}
export type TasksType = { [key: string]: TaskType[] }
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
    |ReturnType<typeof changeEntityTaskStatusAC>

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
