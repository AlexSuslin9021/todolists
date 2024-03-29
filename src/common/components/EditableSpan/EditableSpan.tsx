import React, {ChangeEvent, FC, useState} from 'react';
import style from '../../style/commonStyle.module.css'
import s from './editableSpan.module.css'



export const EditableSpan: FC<EditableSpanType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(true)
    const [title, setTitle] = useState<string>(props.title)
    const onClickHandler = () => {setEditMode(!editMode)}
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.value)
        setTitle(e.currentTarget.value)
    }
    return (<>
            {editMode ? <span className={s.span} onDoubleClick={onClickHandler}>{title}</span>
                :
                <input className={style.input} onBlur={onClickHandler} autoFocus onChange={onChangeHandler}
                       value={title}/>}</>
    );
};

type EditableSpanType = {
    title: string
    callback: (title: string) => void
}