import {fetchTodolistTC} from "../../state/reducer/ReducerTodo/ReducerTodo";
import React, { useEffect} from "react";
import {Todolist} from "../../featers/Todolist/Todolist";
import AddItemForm from "../AddItemForm/AddItemForm";
import s from '../TodolistList/TodolistList.module.css'
import {Navigate} from "react-router-dom";
import {useTodolist} from "../../featers/Todolist/useTodolist";

export const TodolistList=()=>{
  const{   dispatch,
      todolist,
      tasks,
      isLoggedIn,
      addTask,
      removeTodolist,
      onChangeTitleTodo,
      addTodolist}=useTodolist()

    useEffect(()=>{
        if(isLoggedIn)   dispatch(fetchTodolistTC())
    },[])
    
    if(!isLoggedIn) {return <Navigate to={'/login'}/>}
    return<div className={s.container}>
        <div className={s.addItemForm}>
        <AddItemForm addItem={addTodolist}/>
        </div>
        {todolist.map((t) => {
            return(<div key={t.id} className={s.containerTodo}>
                <Todolist
                entityStatus={t.entityStatus}
                key={t.id}
                idTodo={t.id}
                task={tasks[t.id]}
                title={t.title}
                addTask={addTask}
                filter={t.filter}
                removeTodolist={removeTodolist}
                onChangeTitleTodo={onChangeTitleTodo}
            />
                </div>
            )
        })
        }
    </div>
}