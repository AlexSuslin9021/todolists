import React, {ChangeEvent, useEffect, useState} from 'react';

import {todolistApi} from "../featers/Todolist/todolistApi";
import {taskApi} from "../featers/Task/taskApi";

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

    const [state, setState] = useState<any>('')
    const [title, setTitle] = useState<string>('')
    useEffect(() => {
        // todolistApi.createTodolist('Fruits')
        //     .then((res) => {
        //         return setState(res.data)
        //     })
        //     .catch(() => {
        //         setState('error')
        //     })
    }, [])

    const onClickHandler = () => {
        todolistApi.createTodolist(title)
            .then((res) => {
                return setState(res.data)
            })
            .catch(() => {
                setState('error')
            })
    }
    // const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
    //     setState(e.currentTarget.value)
    // }
    const onChangeHandlerTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return <div>

        {/*<input onChange={onChangeHandler} />*/}
        <span> Title</span>
        <input onChange={onChangeHandlerTitle}/>
        <button onClick={onClickHandler}> add</button>
        {JSON.stringify(state)}

    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, seTodolistId] = useState<string>('')

    useEffect(() => {
        // todolistApi.deleteTodolist(todolistId)
        //     .then((res) => {
        //         return setState(res.data)
        //     })
        //     .catch(() => {
        //         setState('error')
        //     })
    }, [])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        seTodolistId(e.currentTarget.value)
    }
    const onClickHandler = () => {
        todolistApi.deleteTodolist(todolistId)
            .then((res) => {
                return setState(res.data)
            })
            .catch(() => {
                setState('error')
            })

    }
    return <div>{JSON.stringify(state)}
        <span> Id</span>
        <input onChange={onChangeHandler}/>
        <button onClick={onClickHandler}> add</button>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, seTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    useEffect(() => {
        // todolistApi.updateTodolist(todolistId, 'TodoTest')
        //     .then((res) => {
        //         return setState(res.data)
        //     })
    }, [])
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        seTodolistId(e.currentTarget.value)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickHandler = () => {
        todolistApi.updateTodolist(todolistId, title)
            .then((res) => {
                return setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <span> Id</span>
            <input onChange={onChangeHandler}/>
        </div>
        <div>
            <span> Title</span>
            <input onChange={onChangeTitle}/>
        </div>

        <button onClick={onClickHandler}> add</button>
    </div>
}




