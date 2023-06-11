import React, {FC, useCallback} from 'react';
import Button from "../Button/Button";
import AddItemForm from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {TaskWithRedux} from "../Task/TaskWithRedux";
import { TaskType} from "../../api/taskApi";
import { useAppSelector} from "../../state/Store";
import {RequestStatusType} from "../../state/reducer/AppReducer/AppReducer";
import {FilterType} from "../../state/reducer/ReducerTodo/ReducerTodo";
import {Navigate} from "react-router-dom";

type TodolistType = {
    idTodo: string
    task: TaskType[]
    title: string
    removeTask: (idTodo: string, idTask: string) => void
    filterTask: (idTodo: string, value: FilterType) => void
    addTask: (idTodo: string, newTitle: string) => void
    filter: FilterType
    removeTodolist: (todoID: string) => void
    callback: (idIdTodo: string, idTask: string, api:any) => void
    onChangeTitleTodo: (idTodo: string, title: string) => void
    entityStatus:RequestStatusType
}
export const Todolist: FC<TodolistType> = (props) => {
   const isLoggedIn=useAppSelector<boolean>(state => state.auth.isLoggedIn)

    const onRemoveTodoHandler = () => {
        props.removeTodolist(props.idTodo)
    }

    const addTaskWrapper = useCallback((title: string) => {
        props.addTask(props.idTodo, title)
    }, [props.addTask, props.idTodo])

    if(!isLoggedIn) {return <Navigate to={'/login'}/>}

    return (
        < >
            <h3><EditableSpan title={props.title} callback={(title) => props.onChangeTitleTodo(props.idTodo, title)}/>
                <Button name={'x'} callback={onRemoveTodoHandler} disabled={props.entityStatus==='loading'}/>
            </h3>
            <AddItemForm addItem={addTaskWrapper} disabled={props.entityStatus==='loading'} />
            <TaskWithRedux
                idTodo={props.idTodo}
                filter={props.filter}
                filterTask={props.filterTask}
                entityStatus={props.entityStatus}
                addTaskWrapper={addTaskWrapper}
            />
        </>
    );
};

