import React, {useEffect} from 'react';
import './app.css';
import {ErrorSnackbar} from "../common/components/ErrorSnaskBar/ErrorSnaskBar";
import {Login} from "../common/components/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistList} from "../common/components/TodolistList/TodolistList";
import {CircularProgress, LinearProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "./store";
import {RequestStatusType} from "./appReducer/appReducer";
import {initializedTC, setLogoutTC} from "../featers/auth/authReducers/autgReducers";
import {Error} from "../common/components/Error/Error";


function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializedTC())
    }, [])

    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.auth.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const logOut = () => {dispatch(setLogoutTC())}

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return <div className={'app'}>
        <div className={'header'}><span onClick={logOut}>{!isLoggedIn ? '' : 'Logout'}</span></div>
        {status === 'loading' && <LinearProgress color={'secondary'}
                                                 sx={{position: "fixed", top: 50, left: 0, right: 0}}
        />}
        <Routes>
            <Route path={'/'} element={<TodolistList/>}/>
            {/*<Route path={"/"} element={<Navigate to="/todolists"/>} />*/}
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/404'} element={<Error/>}/>
            <Route path={'/*'} element={<Navigate to={'/404'}/>}/>
        </Routes>
        <ErrorSnackbar/>
    </div>
}


export default App;


