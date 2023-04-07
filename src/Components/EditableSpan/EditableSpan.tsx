import React, {ChangeEvent, FC, useState} from 'react';
import style from '../../Common/commonStyle.module.css'
import s from './EditableSpan.module.css'

type EditableSpanType = {
    title: string
    onChangeTitleInput: (title: string) => void
}

export const EditableSpan: FC<EditableSpanType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(true)
    const [title, setTitle] = useState<string>(props.title)
    const onClickHandler = () => {
        setEditMode(!editMode)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        props.onChangeTitleInput(e.currentTarget.value)
        setTitle(e.currentTarget.value)

    }

    return (<>
            {editMode ? <span className={s.span} onDoubleClick={onClickHandler}>{title}</span>
                :
                <input className={style.input} onBlur={onClickHandler} autoFocus onChange={onChangeHandler}
                       value={title}/>}</>
    );
};

