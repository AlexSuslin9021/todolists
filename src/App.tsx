import React from 'react';

import './App.css';
import {Todolist} from "./Components/Todolist/Todolist";

export type TaskType = {
    id: number,
    title: string
    isDone: boolean
}

function App() {
    const task1 = [
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'React', isDone: false},
        {id: 3, title: 'Redux', isDone: true}
    ]
    const task2 = [
        {id: 1, title: 'Yandex', isDone: true},
        {id: 2, title: 'Tesla', isDone: false},
        {id: 3, title: 'Coinbase', isDone: true}
    ]
    return <div>
        <Todolist task={task1} title={"What to learn"}/>
        <Todolist task={task2} title={"Stock list"}/>
    </div>
}

export default App;
