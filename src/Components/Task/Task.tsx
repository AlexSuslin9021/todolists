import React, {FC} from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import s from "../Todolist/Todolist.module.css";
import Button from "../Button/Button";
import {TaskStatuses, TaskType} from "../../api/taskApi";


type PropsTaskType={
    task: TaskType[]
    idTodo: string
    removeTask: (idTodo: string, idTask: string) => void
    changeStatusCheck: (idTodo: string, idTask: string, isDone: TaskStatuses) => void
    callback:(idIdTodo:string,idTask:string, title: string)=>void
}
export const Task :FC<PropsTaskType> = (props) => {
    return (
        <div>
            {props.task.map(t => <li key={t.id}>
                <EditableSpan title={t.title} callback={(title:string)=>props.callback(props.idTodo,t.id,title)} />
                <input readOnly={true} className={t.status ? s.isDone : ''} type="checkbox" checked={t.status===TaskStatuses.Completed}
                       onClick={() => props.changeStatusCheck(props.idTodo,t.id, t.status)}/>
                <Button name={'x'} callback={() => props.removeTask(props.idTodo ,t.id)}/>
            </li>)
            }

        </div>
    );
};

export default Task;