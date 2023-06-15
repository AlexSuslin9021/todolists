import {AppStateType, useAppDispatch} from "../../App/Store";
import {useSelector} from "react-redux";
import {deleteTasksTC, TasksStateType, updateTaskTC} from "./ReducerTask/ReducerTask";
import s from "../Todolist/Todolist.module.css";
import {useCallback} from "react";
import {TaskStatuses} from "./taskApi";
import {changeFilterTodolistAC, FilterType} from "../Todolist/ReducerTodo/ReducerTodo";

export const useTask = (
    idTodo: string,
    filter: FilterType,
) => {
    const dispatch = useAppDispatch()
    let task = useSelector<AppStateType, TasksStateType>(state => state.tasks)
    const buttonStyleAll = (filter === 'all' ? s.active : '') + ' ' + s.btn
    const buttonStyleActive = s.btn + ' ' + (filter === 'active' ? s.active : '')
    const buttonStyleCompleted = s.btn + ' ' + (filter === 'completed' ? s.active : '')
    let tasks = task[idTodo]
    if (filter === 'active') tasks = tasks.filter(t => t.status === TaskStatuses.New)
    if (filter === 'completed') tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    const filterTask = useCallback((idTodo: string, value: FilterType) => {

        dispatch(changeFilterTodolistAC({idTodo, value}))
    }, [dispatch])
    const onClickFilterAll = useCallback(() => {
        filterTask(idTodo, 'all')
    }, [filterTask, idTodo])

    const onClickFilterActive = useCallback(() => {
        filterTask(idTodo, 'active')
    }, [filterTask, idTodo])


    const onClickFilterCompleted = useCallback(() => {
            filterTask(idTodo, 'completed')
        }, [filterTask, idTodo]
    )
    const removeTask = (id: string) => {
        dispatch(deleteTasksTC(idTodo, id))
    }

    const onChangeTaskStatus = (idTask: string, status: TaskStatuses) => {
        debugger
        dispatch(updateTaskTC(idTodo, idTask, {status: status}))
    }

    const onChangeTitle = (idTask: string, title: string) => {
        dispatch(updateTaskTC(idTodo, idTask, {title: title}))
    }
return{removeTask,onClickFilterActive,onClickFilterAll,onChangeTitle,buttonStyleCompleted,
    buttonStyleAll,filterTask,buttonStyleActive,tasks,onChangeTaskStatus,onClickFilterCompleted
}
}