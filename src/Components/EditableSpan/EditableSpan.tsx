import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanType={
    title:string
    onChangeTitleInput:(title: string)=>void
}
export const EditableSpan: FC<EditableSpanType> = (props) => {
    const [editMode, setEditMode]=useState<boolean>(true)
    const[title, setTitle]=useState<string>(props.title)
const onClickHandler=()=>{
    setEditMode(!editMode)
    }
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        props.onChangeTitleInput(e.currentTarget.value)
        setTitle(e.currentTarget.value)

    }

    return (<>
        {editMode ?   <span onDoubleClick={onClickHandler}>{props.title}</span>
            :
            <input onBlur={onClickHandler}  autoFocus onChange={onChangeHandler} value={title}/>}</>
    );
};

