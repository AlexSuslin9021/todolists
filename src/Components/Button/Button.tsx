import React, {FC} from 'react';
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
            <button onClick={onClickHandler}>{props.name}</button>
        </>
    );
};

export default Button;