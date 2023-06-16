import {appReducer, InitialStateType, setErrorAC, setStatusAC} from "./appReducer";


let startState: InitialStateType ;
beforeEach(() => {
    startState={  error: null,
        status:'idle'}
})

test('isLoggedIn should be changed', () => {

    const action = setStatusAC({status:'succeeded'})
    const endState = appReducer(startState, action)

    expect(endState.status).toBe('succeeded')

})

test('Error should be changed', () => {

    const action = setErrorAC({error:'error'})
    const endState = appReducer(startState, action)

    expect(endState.error).toBe('error')

})