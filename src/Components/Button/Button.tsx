import React, {FC} from 'react';
import s from './Button.module.css'
import trash from '../../Common/Icon/trash.png'
type ButtonType={
    name:string
    callback:()=>void
    disabled?:boolean
}
export const Button:FC<ButtonType> = (props) => {
    const onClickHandler=()=>{
        props.callback()
    }
    return (
        <>
            <button className={props.disabled ? s.disabled : s.btn} disabled={props.disabled}    onClick={onClickHandler}>{props.name==='+'?<span className={s.add}>{props.name}</span> : <img className={s.icon} src={trash} alt="delete"/>}</button>
        </>
    );
};

export default Button;