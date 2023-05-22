import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '434d1825-24d7-4c1d-8143-2edf92c40e38'
    }
})
export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<{title:string} , AxiosResponse<ResponseType<{item:TodolistType}>>>('todo-lists', {title: title},)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)

    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<{title: string}, AxiosResponse<ResponseType>>(
            `todo-lists/${todolistId}`,
            {title: title}
        )
    }
}

export type ResponseType<D={}>={
    resultCode:number
    messages:string[]
    fieldsErrors:string[]
    data:D
}
export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}



