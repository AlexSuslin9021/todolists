import React, {useState} from 'react';

import './App.css';
import {Todolist} from "./Components/Todolist/Todolist";

export type TaskType = {
    id: number,
    title: string
    isDone: boolean
}
export type FilterType='all' | 'active' | 'completed'
function App() {
    const [tasks, setTasks] = useState<TaskType[]>( [
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'React', isDone: false},
        {id: 3, title: 'Redux', isDone: true}
    ])
    const [filter, setFilter]=useState<FilterType>('all')
    const removeTask=(id:number)=>{
        setTasks (tasks.filter(t=>t.id!==id))
    }
    let tasksFiltered= tasks
    if(filter==='active') tasksFiltered= tasks.filter(t=>t.isDone)
    if(filter==='completed') tasksFiltered= tasks.filter(t=>!t.isDone)
    const  filterTask=(value:FilterType)=>{
        setFilter(value)
    }

    return <div>
        <Todolist
            task={tasksFiltered}
            title={"What to learn"}
            removeTask={removeTask}
            filterTask={filterTask}
        />

    </div>
}

export default App;
