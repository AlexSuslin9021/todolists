import {TasksType} from "../../../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, reducerTask, removeTaskAC} from "./ReducerTask";
import {addTodolistAC, removeTodolistAC} from "../ReducerTodo/ReducerTodo";

let startState:TasksType;
beforeEach(()=>{
  startState= {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }
})
test('correct task should be deleted from correct array', () => {
    // const startState: TasksType = {
    //     'todolistId1': [
    //         {id: '1', title: 'CSS', isDone: false},
    //         {id: '2', title: 'JS', isDone: true},
    //         {id: '3', title: 'React', isDone: false}
    //     ],
    //     'todolistId2': [
    //         {id: '1', title: 'bread', isDone: false},
    //         {id: '2', title: 'milk', isDone: true},
    //         {id: '3', title: 'tea', isDone: false}
    //     ]
    // }

    const action = removeTaskAC('todolistId2', '2')

    const endState = reducerTask(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})

test('task sgould be add in array', () => {
    // const startState: TasksType = {
    //     'todolistId1': [
    //         {id: '1', title: 'CSS', isDone: false},
    //         {id: '2', title: 'JS', isDone: true},
    //         {id: '3', title: 'React', isDone: false}
    //     ],
    //     'todolistId2': [
    //         {id: '1', title: 'bread', isDone: false},
    //         {id: '2', title: 'milk', isDone: true},
    //         {id: '3', title: 'tea', isDone: false}
    //     ]
    // }

    const action = changeTaskStatusAC('todolistId1', '3', false)

    const endState = reducerTask(startState, action)

    expect(endState['todolistId2'][2].isDone).toBe(false)
    expect(endState['todolistId1'][2].isDone).toBe(true)
    expect(endState['todolistId1'].length).toBe(3)


})

test('in task should be change isDone ', () => {
    // const startState: TasksType = {
    //     'todolistId1': [
    //         {id: '1', title: 'CSS', isDone: false},
    //         {id: '2', title: 'JS', isDone: true},
    //         {id: '3', title: 'React', isDone: false}
    //     ],
    //     'todolistId2': [
    //         {id: '1', title: 'bread', isDone: false},
    //         {id: '2', title: 'milk', isDone: true},
    //         {id: '3', title: 'tea', isDone: false}
    //     ]
    // }

    const action = addTaskAC('todolistId2', 'NewTask')

    const endState = reducerTask(startState, action)

    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][3].title).toBe('NewTask')
    expect(endState['todolistId1'].length).toBe(3)

})

test('in task should be cange title ', () => {
    // const startState: TasksType = {
    //     'todolistId1': [
    //         {id: '1', title: 'CSS', isDone: false},
    //         {id: '2', title: 'JS', isDone: true},
    //         {id: '3', title: 'React', isDone: false}
    //     ],
    //     'todolistId2': [
    //         {id: '1', title: 'bread', isDone: false},
    //         {id: '2', title: 'milk', isDone: true},
    //         {id: '3', title: 'tea', isDone: false}
    //     ]
    // }

    const action = changeTaskTitleAC('todolistId2', '2', 'apple')

    const endState = reducerTask(startState, action)

    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId2'][1].title).toBe('apple')


})


test('new array should be added when new todolist is added', () => {


    const action = addTodolistAC('new todolist')

    const endState = reducerTask(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})


