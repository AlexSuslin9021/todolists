import React, {useCallback, useEffect} from 'react';


import './App.css';
import {Todolist} from "./Components/Todolist/Todolist";

import AddItemForm from "./Components/AddItemForm/AddItemForm";
import {
    changeTaskStatusAC,
    changeTaskTitleAC, createTasksTC, deleteTasksTC, updateTasksTC,

} from "./state/reducer/ReducerTask/ReducerTask";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC, createTodolistTC, deleteTodolistTC, fetchTodolistTC,
    removeTodolistAC, TodolistDomainType, updateTodolistTC
} from "./state/reducer/ReducerTodo/ReducerTodo";
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "./state/Store";
import {TaskStatuses, TaskType} from "./api/taskApi";



// export type TaskType = {
//     id: string,
//     title: string
//     status:TaskStatuses
// }
export type TasksType = {
    [key: string]: TaskType[]
}


export type FilterType = 'all' | 'active' | 'completed'


 function App() {



 const dispatch = useAppDispatch()
    const todolist = useSelector<AppStateType, TodolistDomainType[]>(state => state.todolist)
    const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)


    const removeTask = useCallback((idTodo: string, idTask: string) => {

        dispatch(deleteTasksTC(idTodo, idTask))
    }, [dispatch])

    const addTask = useCallback((idTodo: string, newTitle: string) => {
        dispatch(createTasksTC(idTodo, newTitle))
    }, [dispatch])

    const filterTask = useCallback((idTodo: string, value: FilterType) => {

        dispatch(changeFilterTodolistAC(idTodo, value))
    }, [dispatch])

    const changeStatusCheck = useCallback((idTodo: string, idTask: string, status:TaskStatuses) => {
        dispatch(changeTaskStatusAC(idTodo, idTask, status))
    }, [dispatch])

    const removeTodolist = useCallback((todoID: string) => {
        dispatch(deleteTodolistTC(todoID))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    const onChangeTitleInput = useCallback((IdTodo: string, idTask: string, title: string) => {
        dispatch(updateTasksTC(IdTodo, idTask, title))
    }, [dispatch])

    const onChangeTitleTodo = useCallback((idTodo: string, title: string) => {
        dispatch(updateTodolistTC(idTodo, title))
    }, [dispatch])

     useEffect(()=>{
         dispatch(fetchTodolistTC())


     },[])

    return <div>
        <div className={'header'}></div>
        <div className={'container'}>
            <div>
                <AddItemForm addItem={addTodolist}/>
            </div>
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

    </div>
}

export default App;
