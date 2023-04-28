
import {addTodolistAC, reducerTodo, TodolistDomainType} from "./ReducerTodo";
import {reducerTask, TasksStateType} from "../ReducerTask/ReducerTask";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState:TodolistDomainType[] = []

    const action = addTodolistAC( {todolist:{id: '3', title: 'new todolist',addedDate: '',  order: 0,}})

    const endTasksState = reducerTask(startTasksState, action)
    const endTodolistsState = reducerTodo(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolist.id)
    expect(idFromTodolists).toBe(action.payload.todolist.id)
})
