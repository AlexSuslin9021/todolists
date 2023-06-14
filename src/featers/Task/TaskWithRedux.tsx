import React, {FC} from 'react';
import {EditableSpan} from "../../Components/EditableSpan/EditableSpan";
import s from "../Todolist/Todolist.module.css";
import Button from "../../Components/Button/Button";
import {TaskStatuses} from "../../api/taskApi";
import {FilterType} from "../../state/reducer/ReducerTodo/ReducerTodo";
import {useTask} from "./useTask";


export const TaskWithRedux: FC<TaskWithReduxType> = ({idTodo,filter}) => {
const{removeTask,onClickFilterAll,onChangeTitle,buttonStyleCompleted,onClickFilterActive,
    buttonStyleAll,buttonStyleActive,tasks,onChangeTaskStatus,filterTask,onClickFilterCompleted}=useTask(idTodo,filter)


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

}