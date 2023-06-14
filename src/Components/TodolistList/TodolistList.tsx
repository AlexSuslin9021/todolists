import {AppStateType, useAppDispatch, useAppSelector} from "../../state/Store";
import {useSelector} from "react-redux";
import {
    changeFilterTodolistAC, createTodolistTC,
    deleteTodolistTC, fetchTodolistTC, FilterType,
    TodolistDomainType, updateTodolistTC
} from "../../state/reducer/ReducerTodo/ReducerTodo";
import React, {useCallback, useEffect} from "react";
import {

    createTasksTC,
    deleteTasksTC, TasksStateType,
    updateTaskTC
} from "../../state/reducer/ReducerTask/ReducerTask";

import {Todolist} from "../../featers/Todolist/Todolist";
import AddItemForm from "../AddItemForm/AddItemForm";
import s from '../TodolistList/TodolistList.module.css'
import {Navigate} from "react-router-dom";

export const TodolistList=()=>{
    const dispatch = useAppDispatch()
    const todolist = useSelector<AppStateType, TodolistDomainType[]>(state => state.todolist)
    const tasks = useSelector<AppStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn=useAppSelector< boolean>(state=>state.auth.isLoggedIn)

    const removeTask = useCallback((idTodo: string, idTask: string) => {

        dispatch(deleteTasksTC(idTodo, idTask))
    }, [dispatch])

    const addTask = useCallback((idTodo: string, newTitle: string) => {
        dispatch(createTasksTC({idTodo, title: newTitle}))
    }, [dispatch])


    const removeTodolist = useCallback((todoID: string) => {
        dispatch(deleteTodolistTC(todoID))
    }, [dispatch])

    const callback = useCallback((IdTodo: string, idTask: string, title:string) => {
        dispatch(updateTaskTC(IdTodo, idTask, {title}))
    }, [dispatch])

    const onChangeTitleTodo = useCallback((idTodo: string, title: string) => {
        dispatch(updateTodolistTC({todoId:idTodo, title:title}))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [])

    useEffect(()=>{
        if(isLoggedIn)   dispatch(fetchTodolistTC())
    },[])
    
    if(!isLoggedIn) {return <Navigate to={'/login'}/>}
    return<div className={s.container}>
        <div className={s.addItemForm}>
        <AddItemForm addItem={addTodolist}/>
        </div>
        {todolist.map((t) => {
            return(<div key={t.id} className={s.containerTodo}>
                <Todolist
                entityStatus={t.entityStatus}
                key={t.id}
                idTodo={t.id}
                task={tasks[t.id]}
                title={t.title}
                removeTask={removeTask}
                // filterTask={filterTask}
                addTask={addTask}
                filter={t.filter}
                removeTodolist={removeTodolist}
                callback={callback}
                onChangeTitleTodo={onChangeTitleTodo}
            />
                </div>
            )
        })
        }
    </div>
}