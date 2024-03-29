
import {reducerTask} from "../../task/reducerTask/ReducerTask";
import {authReducers, InitialStateType, setIsInitializedAC, setIsLoggedInAC} from "./autgReducers";

let startState: InitialStateType ;
beforeEach(() => {
    startState={  isLoggedIn: false,
        isInitialized:false}
})

test('isLoggedIn should be changed', () => {

    const action = setIsLoggedInAC({value:true})
    const endState = authReducers(startState, action)

    expect(endState.isLoggedIn).toBe(true)

})

test('isInitialized should be changed', () => {

    const action = setIsInitializedAC({isInitialized:true})
    const endState = authReducers(startState, action)

    expect(endState.isInitialized).toBe(true)

})

