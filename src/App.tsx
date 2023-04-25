import React, {useEffect} from 'react';
import './App.css';
import {ErrorSnackbar} from "./Components/ErrorSnaskBar/ErrorSnaskBar";
import {Login} from "./Components/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistList} from "./Components/TodolistList/TodolistList";
import {CircularProgress, LinearProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "./state/Store";
import {RequestStatusType} from "./state/reducer/AppReducer/AppReducer";
import {initializedTC,  setLogoutTC} from "./state/reducer/authReducers/autgReducers";


 function App() {

     const dispatch=useAppDispatch()
     useEffect(()=>{
         dispatch(initializedTC())
     },[])
     
     const status=useAppSelector< RequestStatusType>((state)=>state.app.status)
     const isInitialized=useAppSelector< boolean>(state=>state.auth.isInitialized)
const logOut=()=>{dispatch(setLogoutTC())}

     if (!isInitialized) {
         return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
             <CircularProgress/>
         </div>
     }
    return <div>
        <div className={'header'}> <span onClick={logOut}>{ isInitialized ? '' : 'Logout'}</span>  </div>
        {status==='loading' && <LinearProgress  color={'secondary'}
             sx={ {position: "fixed", top: 50, left: 0, right: 0 }}
        />}
        <Routes>
            <Route path={'/'} element={  <TodolistList/>} />
            <Route path={'/login'} element={<Login/>} />
            <Route path={'/404'} element={<h1>NOT FOUND 404</h1>} />
            <Route path={'*'} element={<Navigate to={'/404'} />} />
        </Routes>
      <ErrorSnackbar />
    </div>
}


export default App;


// import React, { useEffect } from 'react'
// import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
// import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
// import axios from 'axios';
//
//
// // Utils
// console.log = () => {
// };
//
// // Api
// const instance = axios.create({
//     baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api'
// })
//
// const api = {
//     getUsers() {
//         return instance.get('/users')
//     }
// }
//
//
// // Reducer
// const initState = {
//     isLoading: false,
//     users: [] as any[]
// }
//
// type InitStateType = typeof initState
//
// const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
//     switch (action.type) {
//         case 'APP/SET-USERS':
//             /* 1 */
//             return {...state, users: action.users}
//         case 'APP/IS-LOADING':
//             /* 2 */
//             return {...state, isLoading: action.isLoading}
//         default:
//             return state
//     }
// }
//
// // Actions
// const setUsersAC = (users: any[]) => ({type: 'APP/SET-USERS', users} as const)
// const setLoadingAC = (isLoading: boolean) => ({type: 'APP/IS-LOADING', isLoading} as const)
// type ActionsType = | ReturnType<typeof setUsersAC> | ReturnType<typeof setLoadingAC>
//
//
// // Thunk
// const getUsersTC = (): AppThunk => (dispatch) => {
//     /* 3 */
//     dispatch(setLoadingAC(true))
//     api.getUsers()
//         .then((res) => {
//             /* 4 */
//             dispatch(setLoadingAC(false))
//             /* 5 */
//             dispatch(setUsersAC(res.data.data.items))
//         }).catch(()=>{
//         console.log('catch')
//     })
// }
//
// // Store
// const rootReducer = combineReducers({
//     app: appReducer,
// })
//
// const store = createStore(rootReducer, applyMiddleware(thunk))
// type RootState = ReturnType<typeof store.getState>
// type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>
// const useAppDispatch = () => useDispatch<AppDispatch>()
// const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
//
//
// // Loader
// export const Loader = () => {
//     /* 6 */
//     return (
//         <h1>Loading ...</h1>
//     )
// }
//
//
// // Login
// export const Login = () => {
//     /* 7 */
//
//     const users = useAppSelector(state => state.app.users)
//     const isLoading = useAppSelector(state => state.app.isLoading)
//
//     return (
//         <div>
//             {isLoading && <Loader/>}
//             {users.map((u) => <p key={u.id}>{u.email}</p>)}
//             <h1>В данном задании на экран смотреть не нужно. Рекомендуем взять ручку, листик и последовательно, спокойно
//                 расставить цифры в нужном порядке. Прежде чем давать ответ обязательно посчитайте к-во цифр и сверьте с
//                 подсказкой. Удачи 🚀
//             </h1>
//         </div>
//     );
// }
//
// // App
// export const App = () => {
//     /* 8 */
//     const dispatch = useAppDispatch()
//
//     useEffect(() => {
//         /* 9 */
//         dispatch(getUsersTC())
//     }, [])
//
//     /* 10 */
//     return (
//         <Routes>
//             <Route path={'/'} element={<Login/>}/>
//         </Routes>
//     )
// }
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>)