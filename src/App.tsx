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
     const isLoggedIn=useAppSelector< boolean>(state=>state.auth.isLoggedIn)
const logOut=()=>{
         debugger
         dispatch(setLogoutTC())}

     if (!isInitialized) {

         return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
             <CircularProgress/>
         </div>
     }
    return <div>
        <div className={'header'}> <span onClick={logOut}>{!isLoggedIn ? '' : 'Logout'}</span>  </div>
        {status==='loading' && <LinearProgress  color={'secondary'}
             sx={ {position: "fixed", top: 50, left: 0, right: 0 }}
        />}
        <Routes>
            <Route path={'/'} element={  <TodolistList />} />
            <Route path={'/login'} element={<Login/>} />
            <Route path={'/404'} element={<h1>NOT FOUND 404</h1>} />
            <Route path={'*'} element={<Navigate to={'/404'} />} />
        </Routes>
      <ErrorSnackbar />
    </div>
}


export default App;


