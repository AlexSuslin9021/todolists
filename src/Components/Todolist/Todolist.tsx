import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterType, TaskType} from "../../App";
import s from './Todolist.module.css'

type TodolistType = {
    task: TaskType[]
    title: string
    removeTask: (id: string) => void
    filterTask: (value: FilterType) => void
    addTask: (newTitle: string) => void
    changeStatusCheck: (id: string, isDone: boolean) => void
    filter:FilterType
}
export const Todolist: FC<TodolistType> = (props) => {
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    // REMOVE TASK
    const onClickHandler = (id: string) => {
        props.removeTask(id)
    }
    // ADD TASK
    const onClickAddTask = () => {
        if (value.trim() !== '') {
            props.addTask(value.trim())
            setValue('')
        } else {
            setError(true)
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.key === 'Enter' && value.trim() !== '') {
            props.addTask(value.trim())
            setValue('')
        } else if (value !== '') {
            setError(false)
        } else {
            setError(true)
        }


    }

    // CONTROLLED INPUT
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setValue(e.currentTarget.value)

    }

    /// FILTERED TASK
    const onClickFilterAll = () => {
        props.filterTask('all')
    }
    const onClickFilterActive = () => {
        props.filterTask('active')
    }
    const onClickFilterCompleted = () => {
        props.filterTask('completed')
    }
    /// CHANGE STATUS CHECK
    const onChengeStatut = (id: string, isDone: boolean) => {

        props.changeStatusCheck(id, isDone)
    }

    return (
        <div>

            <h3>{props.title}</h3>

            <input value={value}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyDownHandler}
            className={error ? s.errorInput:''}
            />
            <button onClick={onClickAddTask}>+</button>
            {error ? <div className={s.errorText}> Error! Title is required</div> : <div></div>}

            <ul>
                {props.task.map(t => <li key={t.id}>
                    <span>{t.title}</span>
                    <input className={t.isDone ? s.isDone:''} type="checkbox" checked={t.isDone} onClick={() => onChengeStatut(t.id, t.isDone)}/>
                    <button onClick={() => onClickHandler(t.id)}> x</button>
                </li>)
                }
            </ul>
            <button className={props.filter==='all' ? s.active:''} onClick={onClickFilterAll}>All</button>
            <button className={props.filter==='active' ? s.active:''} onClick={onClickFilterActive}>Active</button>
            <button className={props.filter==='completed' ? s.active:''} onClick={onClickFilterCompleted}>Completed</button>

        </div>
    );
};

