import axios, {AxiosResponse} from "axios";
import {RequestStatusType} from "../state/reducer/AppReducer/AppReducer";


//api
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '434d1825-24d7-4c1d-8143-2edf92c40e38'
    }
})
export const taskApi = {

    getTask(todolistId: string) {

        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {

        return instance.post<{ title:string },AxiosResponse<ResponseType<{item: GetTasksResponse}>>>(`todo-lists/${todolistId}/tasks`, {title: title},)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)

    },
    updateTask(todolistId: string, taskId: string, model: TaskStatus) {

        return instance.put<TaskStatus, AxiosResponse<ResponseType<{items:TaskType}>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)

    }
}

export type TaskStatus= {
    title: string,
    startDate: string,
    priority: TaskPriorities,
    description: string,
    deadline: string,
    status: TaskStatuses
}
//types
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed,

    Draft = 3

}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High,

    Urgently = 3,
    Later=4,

}
type TasksType={
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type TaskType = TasksType & { entityStatus: RequestStatusType}
type GetTasksResponse = {
    error: string |null,
    items: TaskType[],
    totalCount: number,

}

type ResponseType<D={}>={
    resultCode: number
    messages: string[],
    data: D
}
