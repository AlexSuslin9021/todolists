import {AppStateType, useAppDispatch, useAppSelector} from "../../state/Store";
import {useSelector} from "react-redux";
import {
    createTodolistTC,
    deleteTodolistTC,
    TodolistDomainType,
    updateTodolistTC
} from "../../state/reducer/ReducerTodo/ReducerTodo";
import {createTasksTC, TasksStateType} from "../../state/reducer/ReducerTask/ReducerTask";
import {useCallback} from "react";

export const useTodolist=()=>{
    const dispatch = useAppDispatch()
    const todolist = useSelector<AppStateType, TodolistDomainType[]>(state => state.todolist)
    const tasks = useSelector<AppStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn=useAppSelector< boolean>(state=>state.auth.isLoggedIn)



    const addTask = useCallback((idTodo: string, newTitle: string) => {
        dispatch(createTasksTC({idTodo, title: newTitle}))
    }, [dispatch])


    const removeTodolist = useCallback((todoID: string) => {
        dispatch(deleteTodolistTC(todoID))
    }, [dispatch])



    const onChangeTitleTodo = useCallback((idTodo: string, title: string) => {
        dispatch(updateTodolistTC({todoId:idTodo, title:title}))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [])

    return{
        dispatch,
        todolist,
        tasks,
        isLoggedIn,
        addTask,
        removeTodolist,
        onChangeTitleTodo,
        addTodolist



    }
}