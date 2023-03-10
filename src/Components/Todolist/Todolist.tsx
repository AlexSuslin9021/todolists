import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterType, TaskType} from "../../App";
import s from './Todolist.module.css'
import Button from "../Button/Button";
import AddItemForm from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type TodolistType = {
    idTodo: string
    task: TaskType[]
    title: string
    removeTask: (idTodo: string, idTask: string) => void
    filterTask: (idTodo: string, value: FilterType) => void
    addTask: (idTodo: string, newTitle: string) => void
    changeStatusCheck: (idTodo: string, idTask: string, isDone: boolean) => void
    filter: FilterType
    removeTodolist: (todoID: string) => void
    onChangeTitleInput:(idIdTodo:string,idTask:string, title: string)=>void
    onChangeTitleTodo:(idTodo:string, title: string)=>void
}
export const Todolist: FC<TodolistType> = (props) => {


    // REMOVE TASK
    const onClickHandler = (id: string) => {
        props.removeTask(props.idTodo, id)
    }

    /// FILTERED TASK
    const onClickFilterAll = () => {

        props.filterTask(props.idTodo, 'all')
    }
    const onClickFilterActive = () => {

        props.filterTask(props.idTodo, 'active')
    }
    const onClickFilterCompleted = () => {

        props.filterTask(props.idTodo, 'completed')
    }
    /// CHANGE STATUS CHECK
    const onChengeStatut = (id: string, isDone: boolean) => {

        props.changeStatusCheck(props.idTodo, id, isDone)
    }
    const onRemoveTodoHandler = () => {
        props.removeTodolist(props.idTodo)
    }
    const addTaskWrapper=(title:string)=>{
        debugger
        props.addTask(props.idTodo, title)
    }

    const onChangeTitleInputTitle=(id:string,title:string)=>{
        debugger
        props.onChangeTitleInput(props.idTodo,id, title)
    }
    return (
        <div>

            <h3>  <EditableSpan title={props.title} onChangeTitleInput={(title)=>props.onChangeTitleTodo(props.idTodo,title)}/>
                <Button name={'x'} callback={onRemoveTodoHandler}/></h3>

            <AddItemForm addItem={addTaskWrapper} />

            <ul>
                {props.task.map(t => <li key={t.id}>
                    <EditableSpan title={t.title} onChangeTitleInput={(title:string)=>onChangeTitleInputTitle(t.id,title)} />
                    <input className={t.isDone ? s.isDone : ''} type="checkbox" checked={t.isDone}
                           onClick={() => onChengeStatut(t.id, t.isDone)}/>
                    <Button name={'x'} callback={() => onClickHandler(t.id)}/>
                </li>)
                }
            </ul>


            <button className={props.filter === 'all' ? s.active : ''} onClick={onClickFilterAll}>All</button>
            <button className={props.filter === 'active' ? s.active : ''} onClick={onClickFilterActive}>Active</button>
            <button className={props.filter === 'completed' ? s.active : ''}
                    onClick={onClickFilterCompleted}>Completed
            </button>

        </div>
    );
};

