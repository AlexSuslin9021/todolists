import React from 'react';
import './App.css';
import {ErrorSnackbar} from "./Components/ErrorSnaskBar/ErrorSnaskBar";
import {Login} from "./Components/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistList} from "./Components/TodolistList/TodolistList";
import s from '/Common/commonStyle.module.css'


 function App() {
    return <div>
        <div className={'header'}></div>
        <Routes>
            <Route path={'/'} element={  <TodolistList/>} />
            <Route path={'login'} element={<Login/>} />
            <Route path={'/404'} element={<h1>NOT FOUND 404</h1>} />
            <Route path={'*'} element={<Navigate to={'/404'} />} />
        </Routes>
      <ErrorSnackbar />
    </div>
}


export default App;
