import React, {FC} from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import s from "../Todolist/Todolist.module.css";
import Button from "../Button/Button";
import {TaskType} from "../../App";

type PropsTaskType={
    task: TaskType[]
    idTodo: string
    removeTask: (idTodo: string, idTask: string) => void
    changeStatusCheck: (idTodo: string, idTask: string, isDone: boolean) => void
    onChangeTitleInput:(idIdTodo:string,idTask:string, title: string)=>void
}
export const Task :FC<PropsTaskType> = (props) => {
    return (
        <div>
            {props.task.map(t => <li key={t.id}>
                <EditableSpan title={t.title} onChangeTitleInput={(title:string)=>props.onChangeTitleInput(props.idTodo,t.id,title)} />
                <input readOnly={true} className={t.isDone ? s.isDone : ''} type="checkbox" checked={t.isDone}
                       onClick={() => props.changeStatusCheck(props.idTodo,t.id, t.isDone)}/>
                <Button name={'x'} callback={() => props.removeTask(props.idTodo ,t.id)}/>
            </li>)
            }

        </div>
    );
};

export default Task;