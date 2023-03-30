import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '434d1825-24d7-4c1d-8143-2edf92c40e38'
    }
})


export const todolistApi = {
    getTodolists() {
        return instance.get('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post('todo-lists', {title: title},)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)

    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put(
            `todo-lists/${todolistId}`,
            {title: title}
        )

    }
}


