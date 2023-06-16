import React, {FC, useCallback} from 'react';
import Button from "../../common/components/Button/Button";
import AddItemForm from "../../common/components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../common/components/EditableSpan/EditableSpan";
import {TaskWithRedux} from "../task/TaskWithRedux";
import { TaskType} from "../task/taskApi";
import { useAppSelector} from "../../app/store";
import {RequestStatusType} from "../../app/appReducer/appReducer";
import {FilterType} from "./reducerTodo/ReducerTodo";
import {Navigate} from "react-router-dom";

type TodolistType = {
    idTodo: string
    task: TaskType[]
    title: string
    addTask: (idTodo: string, newTitle: string) => void
    filter: FilterType
    removeTodolist: (todoID: string) => void
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
            />
        </>
    );
};

