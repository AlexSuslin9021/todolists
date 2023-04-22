import {AppStateType, useAppDispatch, useAppSelector} from "../../state/Store";
import {useSelector} from "react-redux";
import {
    changeFilterTodolistAC, createTodolistTC,
    deleteTodolistTC, fetchTodolistTC, FilterType,
    TodolistDomainType, updateTodolistTC
} from "../../state/reducer/ReducerTodo/ReducerTodo";
import React, {useCallback, useEffect} from "react";
import {
    changeTaskStatusAC,
    createTasksTC,
    deleteTasksTC, TasksStateType,
    updateTaskTC
} from "../../state/reducer/ReducerTask/ReducerTask";
import {TaskStatuses} from "../../api/taskApi";
import {Todolist} from "../Todolist/Todolist";

import AddItemForm from "../AddItemForm/AddItemForm";
import {LinearProgress} from "@mui/material";
import {RequestStatusType} from "../../state/reducer/AppReducer/AppReducer";
import s from '../TodolistList/TodolistList.module.css'


export const TodolistList=()=>{

    const dispatch = useAppDispatch()
    const todolist = useSelector<AppStateType, TodolistDomainType[]>(state => state.todolist)
    const tasks = useSelector<AppStateType, TasksStateType>(state => state.tasks)
    const status=useAppSelector< RequestStatusType>((state)=>state.app.status)

    const removeTask = useCallback((idTodo: string, idTask: string) => {

        dispatch(deleteTasksTC(idTodo, idTask))
    }, [dispatch])

    const addTask = useCallback((idTodo: string, newTitle: string) => {
        dispatch(createTasksTC(idTodo, newTitle))
    }, [dispatch])

    const filterTask = useCallback((idTodo: string, value: FilterType) => {

        dispatch(changeFilterTodolistAC(idTodo, value))
    }, [dispatch])

    const changeStatusCheck = useCallback((idTodo: string, idTask: string, domainModel:TaskStatuses) => {
        dispatch(changeTaskStatusAC(idTodo, idTask, domainModel))
    }, [dispatch])

    const removeTodolist = useCallback((todoID: string) => {
        dispatch(deleteTodolistTC(todoID))
    }, [dispatch])



    const callback = useCallback((IdTodo: string, idTask: string, title:string) => {
        dispatch(updateTaskTC(IdTodo, idTask, {title}))
    }, [dispatch])

    const onChangeTitleTodo = useCallback((idTodo: string, title: string) => {
        dispatch(updateTodolistTC(idTodo, title))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [])

    useEffect(()=>{
        dispatch(fetchTodolistTC())


    },[])

    return<div className={s.container}>
        {status==='loading' && <LinearProgress color={'secondary'} />}
        <AddItemForm addItem={addTodolist}/>
        {todolist.map((t) => {
            return(<div className={s.containerTodo}>
                <Todolist
                entityStatus={t.entityStatus}
                key={t.id}
                idTodo={t.id}
                task={tasks[t.id]}
                title={t.title}
                removeTask={removeTask}
                filterTask={filterTask}
                addTask={addTask}
                filter={t.filter}
                changeStatusCheck={changeStatusCheck}
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