import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '434d1825-24d7-4c1d-8143-2edf92c40e38'
    }
})

type ItemsType={
    description: string
    title: string
    completed: boolean
    status: any
    priority:any
    // startDate: datetime
    // deadline: required(datetime)
    id: string
    todoListId: string
    order:string
    // addedDate: required(datetime)
}

type GetTaskType= {
        error: string,
        items:ItemsType[],
        totalCount: number,

    }
    type CreateTaskType={
        resultCode: 0
        messages: [],
        data: {
            item:   GetTaskType
        }
    }
type DeleteTaskType={
    resultCode: number
    messages: string[],
    data: {}
}
type UpdateTaskType={
    title:string
}



export const taskApi = {
    getTask(todolistId:string) {
        return instance.get(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string,title: string) {
        return instance.post<CreateTaskType>(`todo-lists/${todolistId}/tasks`, {title: title},)
    },
    deleteTask(todolistId: string,taskId:string) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)

    },
    updateTask(todolistId: string,taskId:string, title: string) {
        return instance.put<UpdateTaskType>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            {title: title}
        )

    }
}