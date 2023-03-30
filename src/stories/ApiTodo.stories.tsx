import React, {useEffect, useState} from 'react';

import {todolistApi} from "../api/todolistApi";

export default {
    title: 'API',

}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolists()
            .then((res) => {
                return setState(res.data)
            })
            .catch(() => {
                setState('error')
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.createTodolist('What to learn')
            .then((res) => {
                return setState(res.data)
            })
            .catch(() => {
                setState('error')
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'a4d9db32-c303-4da7-9f68-9123d104a6c0'
    useEffect(() => {
        todolistApi.deleteTodolist(todolistId)
            .then((res) => {
                return setState(res.data)
            })
            .catch(() => {
                setState('error')
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'a97fca8e-7377-42d5-8a47-9b698a95bf1f'
    useEffect(() => {
        todolistApi.updateTodolist(todolistId, 'Todo2')
            .then((res) => {
                return setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}




