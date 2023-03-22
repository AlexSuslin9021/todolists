import React, {FC, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../state/Store";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksType
} from "../../state/reducer/ReducerTask/ReducerTask";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import s from "../Todolist/Todolist.module.css";
import Button from "../Button/Button";
import {FilterType} from "../../App";
import style from '../../Common/commonStyle.module.css'

type TaskWithReduxType ={
    idTodo:string
    filter: FilterType
    filterTask: (idTodo: string, value: FilterType) => void
}

 const TaskWithRedux: FC<TaskWithReduxType> = (props) => {
   let task= useSelector<AppStateType, TasksType>(state => state.tasks)
     const dispatch=useDispatch()
     let tasks = task[props.idTodo]
     if (props.filter === 'active') tasks = tasks.filter(t => t.isDone)
     if (props.filter === 'completed') tasks = tasks.filter(t => !t.isDone)

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
         dispatch(removeTaskAC(props.idTodo, id))
     }

     const onChangeStatus = (id: string, isDone: boolean) => {

         dispatch( changeTaskStatusAC(props.idTodo, id, isDone))
     }

     const onChangeTitleInputTitle=(id:string,title:string)=>{

         dispatch( changeTaskTitleAC(props.idTodo,id, title))
     }

     const buttonStyleAll = style.btn + ' ' + (props.filter === 'all' ? s.active : '')
     const buttonStyleActive = style.btn + ' ' + (props.filter === 'active' ? s.active : '')
     const buttonStyleCompleted = style.btn + ' ' + (props.filter === 'completed' ? s.active : '')
    return (
        <div>
            {tasks.map(t => <li key={t.id}>
                <EditableSpan title={t.title} onChangeTitleInput={()=>onChangeTitleInputTitle(t.id, t.title)} />
                <input readOnly={true} className={t.isDone ? s.isDone : ''} type="checkbox" checked={t.isDone}
                       onClick={() => onChangeStatus(t.id,t.isDone)}/>
                <Button name={'x'} callback={() =>removeTask(t.id)}/>
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