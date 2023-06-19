import React from "react";
import error from '../../Icon/error.svg'
import s from './error.module.css'

export const Error = () => {
    return (

            <div className={s.error}>

                <img src={error} alt=""/>

            </div>


    );
};