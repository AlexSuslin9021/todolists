import React, {FC, useCallback, useEffect} from 'react';
import {FilterType, } from "../../App";
import s from './Todolist.module.css'
import Button from "../Button/Button";
import AddItemForm from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";

import TaskWithRedux from "../Task/TaskWithRedux";
import {TaskStatus, TaskStatuses, TaskType} from "../../api/taskApi";

import {getTasksTC} from "../../state/reducer/ReducerTask/ReducerTask";
import {useAppDispatch} from "../../state/Store";
import {RequestStatusType} from "../../state/reducer/AppReducer/AppReducer";

type TodolistType = {
    idTodo: string
    task: TaskType[]
    title: string
    removeTask: (idTodo: string, idTask: string) => void
    filterTask: (idTodo: string, value: FilterType) => void
    addTask: (idTodo: string, newTitle: string) => void
    changeStatusCheck: (idTodo: string, idTask: string, domainModel:TaskStatuses) => void
    filter: FilterType
    removeTodolist: (todoID: string) => void
    callback: (idIdTodo: string, idTask: string, api:any) => void
    onChangeTitleTodo: (idTodo: string, title: string) => void
    entityStatus:RequestStatusType
}
export const Todolist: FC<TodolistType> = React.memo((props) => {

    const dispatch = useAppDispatch()
    console.log('todolist')

    const onRemoveTodoHandler = () => {
        props.removeTodolist(props.idTodo)
    }
    const addTaskWrapper = useCallback((title: string) => {

        props.addTask(props.idTodo, title)
    }, [props.addTask, props.idTodo])


    useEffect(()=>{

        dispatch(getTasksTC(props.idTodo))

    },[])

    return (
        <div className={s.todo} >

            <h3><EditableSpan title={props.title}
                              callback={(title) => props.onChangeTitleTodo(props.idTodo, title)}/>
                <Button name={'x'} callback={onRemoveTodoHandler} disabled={props.entityStatus==='loading'}/>
            </h3>
            {/*<AddItemForm addItem={addTaskWrapper} disabled={props.entityStatus==='loading'} />*/}
            <TaskWithRedux

                idTodo={props.idTodo}
                filter={props.filter}
                filterTask={props.filterTask}
                entityStatus={props.entityStatus}
                addTaskWrapper={addTaskWrapper}

            />

        </div>
    );
});

