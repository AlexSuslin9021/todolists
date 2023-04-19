
import {
    addTodolistAC, changeEntityStatusAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    reducerTodo,
    removeTodolistAC,
    TodolistDomainType
} from "./ReducerTodo";

let startState: TodolistDomainType[];
beforeEach(()=>{
    startState =
        [
            {id: '1', title: 'What to learn', filter: 'all',addedDate: '',  order: 0,entityStatus:'idle'},
            {id: '2', title: 'What to buy', filter: 'all', addedDate: '',  order: 0,entityStatus:'idle'},
        ]
})

test('one todo should be removed',()=> {
        // let startState: TodolistsType[] =
        //     [
        //         {id: '1', title: 'What to learn', filter: 'all'},
        //         {id: '2', title: 'What to buy', filter: 'all'},
        //     ]

    const action=removeTodolistAC('1')
    const newState= reducerTodo(startState, action)

    expect(newState.length).toBe(1)
    expect(newState[0].id).toBe('2')

    }

)

test('should be add todo',()=> {
        // let startState: TodolistsType[] =
        //     [
        //         {id: '1', title: 'What to learn', filter: 'all'},
        //         {id: '2', title: 'What to buy', filter: 'all'},
        //     ]

        const action=addTodolistAC({id: '3', title: 'test',addedDate: '',  order: 0,})
        const newState= reducerTodo(startState, action)

        expect(newState.length).toBe(3)
        expect(newState[0].title).toBe('test')
        expect(newState[2].title).toBe('What to buy')
        expect(newState[0].id).toBe('3')

    }

)
test('need change title Todo',()=> {
        // let startState: TodolistsType[] =
        //     [
        //         {id: '1', title: 'What to learn', filter: 'all'},
        //         {id: '2', title: 'What to buy', filter: 'all'},
        //     ]

        const action=changeTitleTodolistAC('1','What to read')
        const newState= reducerTodo(startState, action)

        expect(newState.length).toBe(2)
        expect(newState[0].title).toBe('What to read')
        expect(newState[1].title).toBe('What to buy')
        expect(newState[0].id).toBe('1')

    }
)

test('need change filter Todo',()=> {
        // let startState: TodolistsType[] =
        //     [
        //         {id: '1', title: 'What to learn', filter: 'all'},
        //         {id: '2', title: 'What to buy', filter: 'all'},
        //     ]

        const action=changeFilterTodolistAC('1','completed')

        const newState= reducerTodo(startState, action)

        expect(newState.length).toBe(2)
        expect(newState[0].filter).toBe('completed')
        expect(newState[1].filter).toBe('all')


    }

)

test('need change entity status',()=> {
        // let startState: TodolistsType[] =
        //     [
        //         {id: '1', title: 'What to learn', filter: 'all'},
        //         {id: '2', title: 'What to buy', filter: 'all'},
        //     ]

        const action=changeEntityStatusAC('1','loading')

        const newState= reducerTodo(startState, action)

        expect(newState.length).toBe(2)
        expect(newState[0].entityStatus).toBe('loading')
        expect(newState[1].entityStatus).toBe('idle')


    }

)


