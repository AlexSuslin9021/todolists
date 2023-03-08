import React, {useState} from 'react';

import './App.css';
import {Todolist} from "./Components/Todolist/Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string
    isDone: boolean
}
export type FilterType='all' | 'active' | 'completed'
function App() {
    const [tasks, setTasks] = useState<TaskType[]>( [
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: true}
    ])
    const [filter, setFilter]=useState<FilterType>('all')

    const removeTask=(id:string)=>{
        setTasks (tasks.filter(t=>t.id!==id))
    }
    const addTask=(newTitle:string)=>{
        const newTask={id: v1(), title: newTitle, isDone: true}
        setTasks([...tasks, newTask])
    }
    let tasksFiltered= tasks
    if(filter==='active') tasksFiltered= tasks.filter(t=>t.isDone)
    if(filter==='completed') tasksFiltered= tasks.filter(t=>!t.isDone)
    const  filterTask=(value:FilterType)=>{
        setFilter(value)
    }
    const changeStatusCheck=(id:string, isDone:boolean)=>{
       setTasks(tasks.map(el=>el.id===id ? {...el, isDone:!isDone}:el))
    }

    return <div>
        <Todolist
            task={tasksFiltered}
            title={"What to learn"}
            removeTask={removeTask}
            filterTask={filterTask}
            addTask={addTask}
            filter={filter}
            changeStatusCheck={changeStatusCheck}
        />

    </div>
}

export default App;
