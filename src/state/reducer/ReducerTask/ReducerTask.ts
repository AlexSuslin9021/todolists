import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, setTodolistAC, todolistID1, todolistID2} from "../ReducerTodo/ReducerTodo";
import {taskApi, TaskPriorities, TaskStatuses, TaskType} from "../../../api/taskApi";
import {Dispatch} from "redux";
import {todolistApi} from "../../../api/todolistApi";


const removeTask = 'REMOVE-TASK'
const addTask = 'ADD-TASK'
const changeTaskStatus='CHANGE-TASK-STATUS'
const changeTaskTitle='CHANGE-TASK-TITLE'
const addTodo='ADD-TODOLIST'
const removeTodo='REMOVE-TODOLIST'

export type TasksType = {
    [key: string]: TaskType[]
}

let tasks: TasksType = {
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', status:TaskStatuses.Completed, todoListId:todolistID1,description:'',
        startDate:'', addedDate:'', deadline:'', order:0,priority:TaskPriorities.High },
        {id: v1(), title: 'JS',status:TaskStatuses.Completed, todoListId:todolistID1,description:'',
            startDate:'', addedDate:'', deadline:'', order:0,priority:TaskPriorities.High}


    ],
    [todolistID2]: [
        {id: v1(), title: 'Rest api', status:TaskStatuses.Completed, todoListId:todolistID2,description:'',
            startDate:'', addedDate:'', deadline:'', order:0,priority:TaskPriorities.High},
        {id: v1(), title: 'GraphQL', status:TaskStatuses.Completed, todoListId:todolistID2,description:'',
            startDate:'', addedDate:'', deadline:'', order:0,priority:TaskPriorities.High},
    ]
}

type ActionType= ReturnType<typeof removeTaskAC> |ReturnType<typeof addTaskAC> | ReturnType<typeof setTodolistAC>  |ReturnType<typeof changeTaskStatusAC> | ReturnType<typeof changeTaskTitleAC> | ReturnType<typeof addTodolistAC> | ReturnType<typeof removeTodolistAC>
export const reducerTask = (state: TasksType=tasks, action: ActionType): TasksType => {

    switch (action.type){

        case removeTask:

            return {...state, [action.idTodo]: state[action.idTodo].filter(t => t.id !== action.idTask) }
        case addTask:
            return {...state, [action.idTodo]: [...state[action.idTodo], {id: v1(), title: action.title, status:TaskStatuses.New, todoListId:todolistID1,description:'',
                    startDate:'', addedDate:'', deadline:'', order:0,priority:TaskPriorities.High}]}

        case changeTaskStatus:

            return {...state, [action.idTodo]: state[action.idTodo].map(t => t.id === action.idTask ? {...t, status: action.status ?TaskStatuses.New :TaskStatuses.Completed} : {...t})}
        case  changeTaskTitle:
            debugger
            return {...state, [action.idTodo]: state[action.idTodo].map(t=>t.id===action.idTask ? {...t, title:action.title}: t)}
        case addTodo:
            return {...state, [action.idTodo]:[]}
        case removeTodo:
            const copyState={...state, [action.idTodo]:state[action.idTodo]}
           delete copyState[action.idTodo]
            return copyState
         case 'SET-TODOLIST': {
            const stateCopy = {...state}
            action.todolist.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }

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
   status:TaskStatuses


}
export const changeTaskStatusAC = (idTodo: string, idTask: string, status:TaskStatuses): ChangeTaskStatusType => {
    return {
        type: changeTaskStatus,
        idTodo,
        idTask,
       status
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

export const getTasksTC=(id:string)=>(dispatch:Dispatch)=>{
    // : ThunkAction<Promise<void>, TodolistDomainType[], unknown, ActionType>=>{
// return (dispatch:Dispatch)=> {
    taskApi.getTask(id).then((res) => {
        dispatch(setTodolistAC(res.data))

    })
// }
}