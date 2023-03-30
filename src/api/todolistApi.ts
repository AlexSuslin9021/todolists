import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '434d1825-24d7-4c1d-8143-2edf92c40e38'
    }
})

type GetTodolistType= {
        id: string,
        title:string,
        addedDate: string,
        order: number
    }
    type createTodolistType={
        resultCode: 0
        messages: [],
        data: {
            item:   GetTodolistType
        }
    }
type deleteTodolist={
    resultCode: number
    messages: string[],
    data: {}
}
type updateTodolistType={
    title:string
}
export const todolistApi = {
    getTodolists() {
        return instance.get<GetTodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<createTodolistType>('todo-lists', {title: title},)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<deleteTodolist>(`todo-lists/${todolistId}`)

    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<updateTodolistType>(
            `todo-lists/${todolistId}`,
            {title: title}
        )

    }
}


