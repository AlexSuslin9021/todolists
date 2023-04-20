import React, {FC, useCallback} from 'react';
import { useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "../../state/Store";
import {deleteTasksTC, TasksType, updateTaskTC} from "../../state/reducer/ReducerTask/ReducerTask";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import s from "../Todolist/Todolist.module.css";
import Button from "../Button/Button";
import {FilterType} from "../../App";
import { TaskStatuses} from "../../api/taskApi";
import AddItemForm from "../AddItemForm/AddItemForm";


type TaskWithReduxType ={
    idTodo:string
    filter: FilterType
    filterTask: (idTodo: string, value: FilterType) => void
    entityStatus:string
    addTaskWrapper:(title: string)=>void
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



     const onChangeTitle=( idTask:string, title:string)=>{
         dispatch(updateTaskTC( props.idTodo,idTask,{title:title}))
     }


     const buttonStyleAll =   (props.filter === 'all' ? s.active : '') +' '+ s.btn
     const buttonStyleActive = s.btn + ' ' + (props.filter === 'active' ? s.active : '')
     const buttonStyleCompleted = s.btn + ' ' + (props.filter === 'completed' ? s.active : '')
     // let newIsDoneValue = e.currentTarget.checked
     // checked={props.task.status === TaskStatuses.Completed}
     // props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)

     return (
        <div>
            <AddItemForm addItem={props.addTaskWrapper} disabled={props.entityStatus==='loading'} />
            {tasks.map(t => <li key={t.id}>
                <EditableSpan key={t.id} title={t.title} callback={(title:string)=>onChangeTitle(t.id,title)}/>
                <input  className={t.status ? s.isDone : ''} type="checkbox" checked={t.status===TaskStatuses.Completed}
                     />
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