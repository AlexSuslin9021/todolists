
import {addTodolistAC, reducerTodo, TodolistDomainType} from "./ReducerTodo";
import {reducerTask, TasksType} from "../ReducerTask/ReducerTask";

test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState:TodolistDomainType[] = []

    const action = addTodolistAC( {id: '3', title: 'new todolist',addedDate: '',  order: 0,})

    const endTasksState = reducerTask(startTasksState, action)
    const endTodolistsState = reducerTodo(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})
