import React, {FC} from 'react';
import {FilterType, TaskType} from "../../App";

type TodolistType = {
    task: TaskType[]
    title: string
    removeTask: (id:number)=>void
    filterTask:(value:FilterType)=>void
}
export const Todolist: FC<TodolistType> = (props) => {
    const onClickHandler=(id:number)=>{
        props.removeTask(id)
    }
    const onClickFilter=(value:FilterType)=>{
        props.filterTask(value)
    }
    return (
        <div>

            <h3>{props.title}</h3>
            <ul>
                {props.task.map(t=><li key={t.id}>
                    <span>{t.title}</span>
                    <input type="checkbox" checked={t.isDone}/>
                <button onClick={()=>onClickHandler(t.id)}> x </button>
                </li>)
                }
            </ul>
            <button onClick={()=>onClickFilter('all')} >All</button>
            <button onClick={()=>onClickFilter('completed')}>Completed</button>
            <button onClick={()=>onClickFilter('active')}>active</button>

        </div>
    );
};

