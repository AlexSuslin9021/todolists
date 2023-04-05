import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '434d1825-24d7-4c1d-8143-2edf92c40e38'
    }
})

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

export type TaskType = {
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

type GetTaskType = {
    error: string,
    items: TaskType[],
    totalCount: number,

}
type CreateTaskType = {
    resultCode: 0
    messages: [],
    data: {
        item: GetTaskType
    }
}
type DeleteTaskType = {
    resultCode: number
    messages: string[],
    data: {}
}
type UpdateTaskType = {
    title: string
}


export const taskApi = {
    getTask(todolistId: string) {
        return instance.get(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CreateTaskType>(`todo-lists/${todolistId}/tasks`, {title: title},)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)

    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<UpdateTaskType>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            {title: title}
        )

    }
}