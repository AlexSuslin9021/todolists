import axios, {AxiosResponse} from "axios";
import {ResponseType} from "./todolistApi";


//api
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '434d1825-24d7-4c1d-8143-2edf92c40e38'
    }
})
export const authApi = {

    login(data:LoginType) {

        return instance.post<any,AxiosResponse<ResponseType<{userId: number}>>, LoginType>(`/auth/login`, data)
    },
    me(){
        return instance.get<ResponseType<{id: number, email: string, login: string}>>('/auth/me')
    },
    logout(){
        return instance.delete<ResponseType>('/auth/login')
    }

}


export type LoginType={
        email: string,
    password:string,
    rememberMe:boolean


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
export type TaskType={
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

type GetTasksResponse = {
    error: string |null,
    items: TaskType[],
    totalCount: number,

}

// type ResponseType<D={}>={
//     resultCode: number
//     messages: string[],
//     data: D
// }
