import React, {FC} from 'react';
import style from '../../Common/commonStyle.module.css'
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
            <button className={style.buttonX} onClick={onClickHandler}>{props.name}</button>
        </>
    );
};

export default Button;