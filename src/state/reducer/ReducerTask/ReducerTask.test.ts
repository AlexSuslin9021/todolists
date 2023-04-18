import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, reducerTask, removeTaskAC, TasksType} from "./ReducerTask";
import {addTodolistAC, todolistID1} from "../ReducerTodo/ReducerTodo";
import {TaskPriorities, TaskStatuses} from "../../../api/taskApi";

let startState: TasksType;
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.Completed, todoListId: todolistID1, description: '',
                startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.High, entityStatus:'loading'
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: todolistID1, description: '',
                startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.High, entityStatus:'loading'
            },
            {
                id: '3', title: 'React', status: TaskStatuses.Completed, todoListId: todolistID1, description: '',
                startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.High, entityStatus:'loading'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.Completed, todoListId: todolistID1, description: '',
                startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.High, entityStatus:'loading'
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: todolistID1, description: '',
                startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.High,entityStatus:'loading'
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.Completed, todoListId: todolistID1, description: '',
                startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.High, entityStatus:'loading'
            }
        ]
    }
})
test('correct task should be deleted from correct array', () => {


    const action = removeTaskAC('todolistId2', '2')

    const endState = reducerTask(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.Completed, todoListId: todolistID1, description: '',
                startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.High
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: todolistID1, description: '',
                startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.High
            },
            {
                id: '3', title: 'React', status: TaskStatuses.Completed, todoListId: todolistID1, description: '',
                startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.High
            },
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.Completed, todoListId: todolistID1, description: '',
                startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.High
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.Completed, todoListId: todolistID1, description: '',
                startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.High
            },
        ]
    })
})

// test('task should be add in array', () => {
//
//
//     const action = changeTaskStatusAC('todolistId1', '3', 1)
//
//     const endState = reducerTask(startState, action)
//
//     expect(endState['todolistId2'][2].status).toBe(TaskStatuses.Completed)
//     expect(endState['todolistId1'][2].status).toBe(TaskStatuses.New)
//     expect(endState['todolistId1'].length).toBe(3)
//
//
// })

test('in task should be change isDone ', () => {

    const action = addTaskAC('todolistId2', 'NewTask')

    const endState = reducerTask(startState, action)

    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][3].title).toBe('NewTask')
    expect(endState['todolistId1'].length).toBe(3)

})

test('in task should be cange title ', () => {

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



