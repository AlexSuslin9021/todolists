import React, {FC, useCallback} from 'react';
import {useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../state/Store";
import {deleteTasksTC, TasksStateType, updateTaskTC} from "../../state/reducer/ReducerTask/ReducerTask";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import s from "../Todolist/Todolist.module.css";
import Button from "../Button/Button";
import {TaskStatuses} from "../../api/taskApi";
import {FilterType} from "../../state/reducer/ReducerTodo/ReducerTodo";


export const TaskWithRedux: FC<TaskWithReduxType> = (props) => {
    const dispatch = useAppDispatch()
    let task = useSelector<AppStateType, TasksStateType>(state => state.tasks)
    const buttonStyleAll = (props.filter === 'all' ? s.active : '') + ' ' + s.btn
    const buttonStyleActive = s.btn + ' ' + (props.filter === 'active' ? s.active : '')
    const buttonStyleCompleted = s.btn + ' ' + (props.filter === 'completed' ? s.active : '')
    let tasks = task[props.idTodo]
    if (props.filter === 'active') tasks = tasks.filter(t => t.status === TaskStatuses.New)
    if (props.filter === 'completed') tasks = tasks.filter(t => t.status === TaskStatuses.Completed)

    const onClickFilterAll = useCallback(() => {
        props.filterTask(props.idTodo, 'all')
    }, [props.filterTask, props.idTodo])

    const onClickFilterActive = useCallback(() => {
        props.filterTask(props.idTodo, 'active')
    }, [props.filterTask, props.idTodo])

    const onClickFilterCompleted = useCallback(() => {
            props.filterTask(props.idTodo, 'completed')
        }, [props.filterTask, props.idTodo]
    )
    const removeTask = (id: string) => {
        dispatch(deleteTasksTC(props.idTodo, id))
    }

    const onChangeTaskStatus = (idTask: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(props.idTodo, idTask, {status: status}))
    }

    const onChangeTitle = (idTask: string, title: string) => {
        dispatch(updateTaskTC(props.idTodo, idTask, {title: title}))
    }

    return (
        <div>
            {tasks.map(t => <li className={s.task} key={t.id}>

                <EditableSpan key={t.id} title={t.title} callback={(title: string) => onChangeTitle(t.id, title)}/>
               <div>
                <input   className={t.status ? s.isDone : ''} type="checkbox"
                       checked={t.status === TaskStatuses.Completed}
                       onChange={(e) => onChangeTaskStatus(t.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)}
                />
                <Button name={'x'} callback={() => removeTask(t.id)} disabled={t.entityStatus === 'loading'}/>
               </div>
            </li>)
            }
            <div className={s.filter}>
                <button className={buttonStyleAll} onClick={onClickFilterAll}>All</button>
                <button className={buttonStyleActive} onClick={onClickFilterActive}>Active</button>
                <button className={buttonStyleCompleted} onClick={onClickFilterCompleted}>Completed
                </button>
            </div>
        </div>
    );
};

type TaskWithReduxType = {
    idTodo: string
    filter: FilterType
    filterTask: (idTodo: string, value: FilterType) => void
    entityStatus: string
    addTaskWrapper: (title: string) => void
}