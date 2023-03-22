import React, {useCallback} from 'react';


import './App.css';
import {Todolist} from "./Components/Todolist/Todolist";

import AddItemForm from "./Components/AddItemForm/AddItemForm";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from "./state/reducer/ReducerTask/ReducerTask";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC, TodolistsType
} from "./state/reducer/ReducerTodo/ReducerTodo";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./state/Store";


export type TaskType = {
    id: string,
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: TaskType[]
}


export type FilterType = 'all' | 'active' | 'completed'

function App() {


    const dispatch = useDispatch()
    const todolist = useSelector<AppStateType, TodolistsType[]>(state => state.todolist)
    const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)

    const removeTask = useCallback((idTodo: string, idTask: string) => {
        dispatch(removeTaskAC(idTodo, idTask))
    },[dispatch])

    const addTask = useCallback((idTodo: string, newTitle: string) => {
        dispatch(addTaskAC(idTodo, newTitle))
    },[dispatch])

    const filterTask = useCallback((idTodo: string, value: FilterType) => {
        dispatch(changeFilterTodolistAC(idTodo, value))
    },[dispatch])

    const changeStatusCheck = useCallback((idTodo: string, idTask: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(idTodo, idTask, isDone))
    },[dispatch])

    const removeTodolist = useCallback((todoID: string) => {
        dispatch(removeTodolistAC(todoID))
    },[dispatch])

    const addTodolist = useCallback ((title: string) => {
        dispatch(addTodolistAC(title))
    },[dispatch])

    const onChangeTitleInput = useCallback((IdTodo: string, idTask: string, title: string) => {
        dispatch(changeTaskTitleAC(IdTodo, idTask, title))
    },[dispatch])

    const onChangeTitleTodo = useCallback((idTodo: string, title: string) => {
        dispatch(changeTitleTodolistAC(idTodo, title))
    },[dispatch])

    return <div>
        <div className={'header'}>

        </div>
        <AddItemForm addItem={addTodolist}/>
        {todolist.map((t) => {

            return <Todolist
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
                onChangeTitleInput={onChangeTitleInput}
                onChangeTitleTodo={onChangeTitleTodo}
            />
        })}


    </div>
}

export default App;
