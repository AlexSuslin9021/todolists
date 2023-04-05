import React, {FC, useCallback} from 'react';
import {FilterType, } from "../../App";
import s from './Todolist.module.css'
import Button from "../Button/Button";
import AddItemForm from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";

import TaskWithRedux from "../Task/TaskWithRedux";
import {TaskStatuses, TaskType} from "../../api/taskApi";

type TodolistType = {
    idTodo: string
    task: TaskType[]
    title: string
    removeTask: (idTodo: string, idTask: string) => void
    filterTask: (idTodo: string, value: FilterType) => void
    addTask: (idTodo: string, newTitle: string) => void
    changeStatusCheck: (idTodo: string, idTask: string, status:TaskStatuses) => void
    filter: FilterType
    removeTodolist: (todoID: string) => void
    onChangeTitleInput: (idIdTodo: string, idTask: string, title: string) => void
    onChangeTitleTodo: (idTodo: string, title: string) => void
}
export const Todolist: FC<TodolistType> = React.memo((props) => {


    console.log('todolist')

    const onRemoveTodoHandler = () => {
        props.removeTodolist(props.idTodo)
    }
    const addTaskWrapper = useCallback((title: string) => {

        props.addTask(props.idTodo, title)
    }, [props.addTask, props.idTodo])


    return (
        <div className={s.todo} >

            <h3><EditableSpan title={props.title}
                              onChangeTitleInput={(title) => props.onChangeTitleTodo(props.idTodo, title)}/>
                <Button name={'x'} callback={onRemoveTodoHandler}/>
            </h3>
            <AddItemForm addItem={addTaskWrapper}/>
            <TaskWithRedux
                idTodo={props.idTodo}
                filter={props.filter}
                filterTask={props.filterTask}
            />

        </div>
    );
});

