import React, {FC} from 'react';
import s from './Button.module.css'
import tras from "../../Common/Icon/trash_bin_icon-icons.com_67981.png"
type ButtonType={
    name:string
    callback:()=>void
}
export const Button:FC<ButtonType> = (props) => {
    const onClickHandler=()=>{
        props.callback()
    }
    return (
        <>
            <button className={s.btn}    onClick={onClickHandler}>{props.name==='+'?<span className={s.add}>{props.name}</span> : <img className={s.icon} src={tras} alt=""/>}</button>
        </>
    );
};

export default Button;