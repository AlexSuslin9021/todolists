import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import Button from "../Button/Button";
import s from "../Todolist/Todolist.module.css";

type AddItemFormType = {

    addItem:(title:string)=>void
}
export const AddItemForm: FC<AddItemFormType> = (props) => {
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.key === 'Enter' && value.trim() !== '') {
            props.addItem( value.trim())
            setValue('')
        } else if (value !== '') {
            setError(false)
        } else {
            setError(true)
        }


    }
    // ADD TASK
    const onClickAddTask = () => {
        debugger
        if (value.trim() !== '') {
            props.addItem(value.trim())
            setValue('')
        } else {
            setError(true)
        }
    }

    return (
        <div>


            <input value={value}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyDownHandler}
                   className={error ? s.errorInput : ''}
            />
            <Button name={'+'} callback={onClickAddTask}/>
            {error ? <div className={s.errorText}> Error! Title is required</div> : <div></div>}
        </div>
    );
};

export default AddItemForm;