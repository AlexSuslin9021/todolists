import React from 'react';

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

// type TodolistsType = {
//     id: string, title: string, filter: FilterType
// }
export type FilterType = 'all' | 'active' | 'completed'

function App() {


    const dispatch = useDispatch()
    const todolist = useSelector<AppStateType, TodolistsType[]>(state => state.todolist)
    const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)

    const removeTask = (idTodo: string, idTask: string) => {
        dispatch(removeTaskAC(idTodo, idTask))
    }
    const addTask = (idTodo: string, newTitle: string) => {
        dispatch(addTaskAC(idTodo, newTitle))

    }

    const filterTask = (idTodo: string, value: FilterType) => {

        dispatch(changeFilterTodolistAC(idTodo, value))

    }
    const changeStatusCheck = (idTodo: string, idTask: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(idTodo, idTask, isDone))

    }
    const removeTodolist = (todoID: string) => {
        dispatch(removeTodolistAC(todoID))


    }
    const addTodolist = (title: string) => {

        dispatch(addTodolistAC(title))

    }
    const onChangeTitleInput = (IdTodo: string, idTask: string, title: string) => {
        dispatch(changeTaskTitleAC(IdTodo, idTask, title))
    }
    const onChangeTitleTodo = (idTodo: string, title: string) => {
        dispatch(changeTitleTodolistAC(idTodo, title))
    }

    return <div>
        <AddItemForm addItem={addTodolist}/>
        {todolist.map((t) => {
            let tasksFiltered = tasks[t.id]
            if (t.filter === 'active') tasksFiltered = tasks[t.id].filter(t => t.isDone)
            if (t.filter === 'completed') tasksFiltered = tasks[t.id].filter(t => !t.isDone)
            return <Todolist
                key={t.id}
                idTodo={t.id}
                task={tasksFiltered}
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
