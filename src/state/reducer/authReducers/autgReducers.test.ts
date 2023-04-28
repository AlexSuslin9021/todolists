
import {reducerTask} from "../ReducerTask/ReducerTask";
import {AuthReducers, InitialStateType, setIsInitializedAC, setIsLoggedInAC} from "./autgReducers";

let startState: InitialStateType ;
beforeEach(() => {
    startState={  isLoggedIn: false,
        isInitialized:false}
})

test('isLoggedIn should be changed', () => {

    const action = setIsLoggedInAC({value:true})
    const endState = AuthReducers(startState, action)

    expect(endState.isLoggedIn).toBe(true)

})

test('isInitialized should be changed', () => {

    const action = setIsInitializedAC({isInitialized:true})
    const endState = AuthReducers(startState, action)

    expect(endState.isInitialized).toBe(true)

})

