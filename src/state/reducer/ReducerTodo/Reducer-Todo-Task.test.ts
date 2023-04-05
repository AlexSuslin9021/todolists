import {TasksType} from "../../../App";
import {addTodolistAC, reducerTodo, TodolistDomainType} from "./ReducerTodo";
import {reducerTask} from "../ReducerTask/ReducerTask";

test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState:TodolistDomainType[] = []

    const action = addTodolistAC('new todolist')

    const endTasksState = reducerTask(startTasksState, action)
    const endTodolistsState = reducerTodo(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.idTodo)
    expect(idFromTodolists).toBe(action.idTodo)
})
