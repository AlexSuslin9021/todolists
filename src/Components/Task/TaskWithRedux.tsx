import React, {FC, useCallback, useEffect} from 'react';
import { useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../state/Store";
import {
    changeTaskStatusAC,
    changeTaskTitleAC, deleteTasksTC, getTasksTC,
    removeTaskAC,
    TasksType, updateTasksTC
} from "../../state/reducer/ReducerTask/ReducerTask";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import s from "../Todolist/Todolist.module.css";
import Button from "../Button/Button";
import {FilterType} from "../../App";
import {TaskStatus, TaskStatuses} from "../../api/taskApi";
// import style from '../../Common/commonStyle.module.css'

type TaskWithReduxType ={
    idTodo:string
    filter: FilterType
    filterTask: (idTodo: string, value: FilterType) => void
    entityStatus:string
}

 const TaskWithRedux: FC<TaskWithReduxType> = (props) => {
   let task= useSelector<AppStateType, TasksType>(state => state.tasks)
     const dispatch=useAppDispatch()
     let tasks = task[props.idTodo]
     if (props.filter === 'active') tasks = tasks.filter(t => t.status===TaskStatuses.New)
     if (props.filter === 'completed') tasks = tasks.filter(t => t.status===TaskStatuses.Completed)

     const onClickFilterAll = useCallback(() => {

         props.filterTask(props.idTodo, 'all')
     },[props.filterTask,props.idTodo])

     const onClickFilterActive = useCallback(() => {

         props.filterTask(props.idTodo, 'active')
     },[props.filterTask,props.idTodo])

     const onClickFilterCompleted = useCallback(() => {

             props.filterTask(props.idTodo, 'completed')
         },
         [props.filterTask,props.idTodo]
     )
     const removeTask = (id: string) => {

         dispatch(deleteTasksTC(props.idTodo, id))
     }

     const onChangeStatus = (id: string, status:TaskStatuses) => {

         dispatch( updateTasksTC(props.idTodo, id, {status:status}))
     }

     const onChangeTitleInputTitle=(id:string,title:string)=>{

         dispatch( updateTasksTC(props.idTodo,id, {title}))
     }


     const buttonStyleAll =   (props.filter === 'all' ? s.active : '') +' '+ s.btn
     const buttonStyleActive = s.btn + ' ' + (props.filter === 'active' ? s.active : '')
     const buttonStyleCompleted = s.btn + ' ' + (props.filter === 'completed' ? s.active : '')

     return (
        <div>

            {tasks.map(t => <li key={t.id}>
                <EditableSpan title={t.title} onChangeTitleInput={()=>  onChangeTitleInputTitle(t.id, t.title)} />
                <input readOnly={true} className={t.status ? s.isDone : ''} type="checkbox" checked={t.status===TaskStatuses.Completed}
                       onChange={() => onChangeStatus(t.id,t.status)}/>
                <Button name={'x'} callback={() =>removeTask(t.id)} disabled={t.entityStatus==='loading'}/>
            </li>)
            }
            <div>
            <button className={buttonStyleAll} onClick={onClickFilterAll}>All</button>
            <button className={buttonStyleActive} onClick={onClickFilterActive}>Active</button>
            <button className={buttonStyleCompleted} onClick={onClickFilterCompleted}>Completed
            </button>
            </div>
        </div>
    );
};

export default TaskWithRedux;