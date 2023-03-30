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
        todolistApi.createTodolist('Fruits')
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
    const todolistId = 'de9fd8eb-e2de-4ca8-bc0b-3811727c20e9'
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
    const todolistId = 'f3dcc47a-fe0b-4b9c-94eb-ed4775e3fe29'
    useEffect(() => {
        todolistApi.updateTodolist(todolistId, 'TodoTest')
            .then((res) => {
                return setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}




