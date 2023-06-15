import {
    addTaskAC,
    changeEntityTaskStatusAC,
    reducerTask,
    removeTaskAC,
    TasksStateType,
    updateTaskAC
} from "./ReducerTask";
import {addTodolistAC, todolistID1} from "../../Todolist/ReducerTodo/ReducerTodo";
import {TaskPriorities, TaskStatuses} from "../taskApi";

let startState: TasksStateType ;
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
                id:'2', title: 'milk', status: TaskStatuses.Completed, todoListId: todolistID1, description: '',
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


    const action = removeTaskAC({idTodo:"todolistId2",idTask:"2"})

    const endState = reducerTask(startState, action)

    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId1'].length).toBe(3)
})
test('in task should be change isDone ', () => {

    const action = addTaskAC( {task:{

        id: '2', title: 'NewTask', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
        startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.High
    }})

    const endState = reducerTask(startState, action)

    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].title).toBe('NewTask')
    expect(endState['todolistId1'].length).toBe(3)

})
test('in task should be cange title ', () => {

    const action = updateTaskAC({idTodo:'todolistId2',idTask: '2',api:{  title: 'apple',
            description: '',
            status:TaskStatuses.Completed ,
            priority: TaskPriorities.High,
            startDate: '',
            deadline: '',}})
    const endState = reducerTask(startState, action)

    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId2'][1].title).toBe('apple')


})
test('new array should be added when new todolist is added', () => {


    const action = addTodolistAC({todolist:{id: '3', title: 'new todolist',addedDate: '',  order: 0,}})
    const endState = reducerTask(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('EntityStatus should be changed ', () => {

    const action = changeEntityTaskStatusAC({idTodo:'todolistId2',idTask: '2',status:"idle"})
    const endState = reducerTask(startState, action)
    expect(endState['todolistId2'][1].entityStatus).toBe("idle")
    expect(endState['todolistId1'][1].entityStatus).toEqual("loading")
})


