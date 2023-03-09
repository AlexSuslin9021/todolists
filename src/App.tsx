import React, {useState} from 'react';

import './App.css';
import {Todolist} from "./Components/Todolist/Todolist";
import {v1} from "uuid";
import AddItemForm from "./Components/AddItemForm/AddItemForm";

export type TaskType = {
    id: string,
    title: string
    isDone: boolean
}
type TasksType = {
    [key: string]: TaskType[]
}

type TodolistsType = {
    id: string, title: string, filter: FilterType
}
export type FilterType = 'all' | 'active' | 'completed'

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()
    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ]
    )


    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    const removeTask = (idTodo: string, idTask: string) => {
        setTasks({...tasks, [idTodo]: tasks[idTodo].filter(t => t.id !== idTask)})
    }
    const addTask = (idTodo: string, newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: true}
        setTasks({...tasks, [idTodo]: [...tasks[idTodo], newTask]})

    }

    const filterTask = (idTodo: string, value: FilterType) => {

        setTodolists(todolists.map(t => t.id === idTodo ? {...t, filter: value} : t))
    }
    const changeStatusCheck = (idTodo: string, idTask: string, isDone: boolean) => {
        setTasks({...tasks, [idTodo]: tasks[idTodo].map(t => t.id === idTask ? {...t, isDone: !isDone} : t)})
        // setTasks(tasks.map(el=>el.id===id ? {...el, isDone:!isDone}:el))
    }
    const removeTodolist = (todoID: string) => {
        setTodolists(todolists.filter(t => t.id !== todoID))
        setTasks({...tasks, [todoID]:[]})

    }
    const addTodolist=(title: string)=>{
        debugger
        const newIdTodo=v1()
        const newTodo:TodolistsType={id: newIdTodo, title: title, filter: 'all'}
        setTodolists([...todolists,newTodo])
        setTasks({...tasks, [newIdTodo]:[]})
    }
    return <div>
        <AddItemForm addItem={addTodolist} />
        {todolists.map((t) => {
            let tasksFiltered = tasks[t.id]
            if (t.filter === 'active') tasksFiltered = tasks[t.id].filter(t => t.isDone)
            if (t.filter === 'completed') tasksFiltered = tasks[t.id].filter(t => !t.isDone)
            return <Todolist
                key={t.id}
                idTodo={t.id}
                task={tasksFiltered}
                title={t.title}
                removeTask={removeTask}
                filterTask={filterTask}
                addTask={addTask}
                filter={t.filter}
                changeStatusCheck={changeStatusCheck}
                removeTodolist={removeTodolist}
            />
        })}


    </div>
}

export default App;
