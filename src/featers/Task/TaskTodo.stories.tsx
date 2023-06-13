import React, {ChangeEvent, useEffect, useState} from 'react';
import {taskApi, TaskPriorities, TaskStatuses} from "../../api/taskApi";
import {todolistApi} from "../../api/todolistApi";



export default {
    title: 'APITask',

}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, seTodolistId] = useState<string>('')
    useEffect(() => {


        // taskApi.getTask(todolistId)
        //     .then((res) => {
        //
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
        taskApi.getTask(todolistId)
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
export const CreateTask = () => {

    const [data, setData] = useState<object | string>({})
    const [todolistId, seTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    useEffect(() => {
        // taskApi.createTask(todolistId,title)
        //     .then((res) => {
        //
        //         return setState(res.data)
        //     })
        //     .catch(() => {
        //         setState('error')
        //     })
    }, [])

    const onChangeHandlerID = (e: ChangeEvent<HTMLInputElement>) => {
        seTodolistId(e.currentTarget.value)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickHandler = () => {
        taskApi.createTask(todolistId,title)
            .then((res) => {
                return setData(res.data)
            })
            .catch(() => {
                setData('error')
            })
    }
    return <div>{JSON.stringify(data)}
        <div>
            <span> Id</span>
            <input onChange={onChangeHandlerID}/>
        </div>
        <div>
            <span> Title</span>
            <input onChange={onChangeTitle}/>
        </div>

        <button onClick={onClickHandler}> add</button>
    </div>
}
export const DeleteTasks = () => {
    const [data, setData] = useState<any>(null)
    const [todolistId, seTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    // useEffect(() => {
    //     // taskApi.deleteTask(todolistId,'d8a747b3-b3aa-4a7d-b537-455bcb6ad16a')
    //     //     .then((res) => {
    //     //         return setState(res.data)
    //     //     })
    //     //     .catch(() => {
    //     //         setState('error')
    //     //     })
    // }, [])

    const onChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
        seTodolistId(e.currentTarget.value)
    }
    const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    const onClickHandler = () => {
        taskApi.deleteTask(todolistId,taskId)
            .then((res) => {
                return setData(res.data)
            })
            .catch(() => {
                setData('error')
            })
    }

    return <div>{JSON.stringify(data)}
        <div>
            <span> IdTodo</span>
            <input onChange={onChangeTodo}/>
        </div>
        <div>
            <span> TaskId</span>
            <input onChange={onChangeTaskId}/>
        </div>

        <button onClick={onClickHandler}> add</button>
    </div>
}
export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, seTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    useEffect(() => {
        // taskApi.updateTask(todolistId, taskId,title)
        //     .then((res) => {
        //         return setState(res.data)
        //     })
        //     .catch(() => {
        //         setState('error')
        //     })
    }, [])
    const onChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
        seTodolistId(e.currentTarget.value)
    }
    const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickHandler=()=>{
        taskApi.updateTask(todolistId, taskId,{
            title:title,
            startDate: '',
            priority: TaskPriorities.High,
            description: '',
            deadline: '',
            status: TaskStatuses.Completed
        })
            .then((res) => {
                return setState(res.data)
            })
            .catch(() => {
                setState('error')
            })
    }


    return <div>{JSON.stringify(state)}
        <div>
            <span> idTodo</span>
            <input onChange={onChangeTodo}/>
        </div>

<div>
    <span>
        idTask
    </span>
    <input onChange={onChangeTaskId}/>
</div>
        <div>
    <span>
      TitleTask
    </span>
            <input onChange={onChangeTitle}/>
        </div>
<button onClick={onClickHandler} > add</button>
    </div>
}




