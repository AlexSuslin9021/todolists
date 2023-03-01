import React, {FC} from 'react';
import {TaskType} from "../../App";

type TodolistType = {
    task: TaskType[]
    title: string
}
export const Todolist: FC<TodolistType> = (props) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <ul>
                <li><span>{props.task[0].title}</span> <input type="checkbox" checked={props.task[0].isDone}/></li>
                <li><span>{props.task[1].title}</span> <input type="checkbox" checked={props.task[1].isDone}/></li>
                <li><span>{props.task[2].title}</span> <input type="checkbox" checked={props.task[2].isDone}/></li>

            </ul>
            <button>All</button>
            <button>True</button>
            <button>False</button>

        </div>
    );
};

