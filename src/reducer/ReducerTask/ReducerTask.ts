import {v1} from "uuid";
import {todolistID1, todolistID2} from "../ReducerTodo/ReducerTodo";
import {TaskType} from "../../App";

const removeTask = 'REMOVE-TASK'
const addTask = 'ADD-TASK'
const changeTaskStatus='CHANGE-TASK-STATUS'
const changeTaskTitle='CHANGE-TASK-TITLE'

type TasksType = {
    [key: string]: TaskType[]
}

let tasks: TasksType = {
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},

    ],
    [todolistID2]: [
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]
}

type ActionType= ReturnType<typeof removeTaskAC> |ReturnType<typeof addTaskAC> |ReturnType<typeof changeTaskStatusAC> | ReturnType<typeof changeTaskTitleAC>
export const reducerTask = (state: TasksType, action: ActionType): TasksType => {
    switch (action.type){
        case removeTask:
            return {...state, [action.idTodo]: state[action.idTodo].filter(t => t.id !== action.idTask) }
        case addTask:


            return {...state, [action.idTodo]: [...state[action.idTodo], {id: v1(), title: action.title, isDone: true}]}

        case changeTaskStatus:
            return {...state, [action.idTodo]: state[action.idTodo].map(t => t.id === action.idTask ? {...t, isDone: !action.isDone} : t)}
        case  changeTaskTitle:
            return {...state, [action.idTodo]: state[action.idTodo].map(t=>t.id===action.idTask ? {...t, title:action.title}: t)}

    }
    return state
}

// REMOVE TASK
type RemoveTaskType = {
    type: 'REMOVE-TASK'
    idTodo: string
    idTask:string


}
export const removeTaskAC = (idTodo: string, idTask: string): RemoveTaskType => {
    return {
        type: removeTask,
        idTodo,
        idTask,
    }
}
// ADD TASK
type AddTaskType = {
    type: 'ADD-TASK'
    idTodo: string
    title:string


}
export const addTaskAC = (idTodo: string, title: string): AddTaskType => {
    return {
        type: addTask,
        idTodo,
        title,
    }
}
// CHANGE TASK STATUS
type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    idTodo: string
    idTask:string
    isDone:boolean


}
export const changeTaskStatusAC = (idTodo: string, idTask: string, isDone: boolean): ChangeTaskStatusType => {
    return {
        type: changeTaskStatus,
        idTodo,
        idTask,
        isDone
    }
}
// CHANGE TASK STATUS
type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    idTodo: string
    idTask:string
    title:string


}
export const changeTaskTitleAC = (idTodo: string, idTask: string, title: string): ChangeTaskTitleType => {
    return {
        type: changeTaskTitle,
        idTodo,
        idTask,
        title
    }
}