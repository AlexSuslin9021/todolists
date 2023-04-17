import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import Button from "../Button/Button";
import s from './AddItemForm.module.css'
// import style from '../../Common/commonStyle.module.css'

type AddItemFormType = {

    addItem: (title: string) => void
    disabled?:boolean
}
export const AddItemForm: FC<AddItemFormType> = React.memo((props) => {

    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        setError(false)
    }

    const onKeyDownHandler = (e: KeyboardEvent< HTMLInputElement>) => {
        // if (error) setError(false)
        if (e.key === 'Enter' && value.trim() !== '') {
            props.addItem(value.trim())
            setValue('')

        }
        else if (value !== '') {
            setError(false)
        }
        else if(e.key === 'Enter' && value.trim() === '') {
            setError(true)
        }


    }
    // ADD TASK
    const onClickAddTask = () => {

        if (value.trim() !== '') {
            props.addItem(value.trim())
            setValue('')
        } else {
            setError(true)
        }
    }

    const inputClass = (error ? s.errorInput : '') + " " + s.input
    return (
        <div>
            <input value={value}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyDownHandler}
                   className={inputClass}
                   placeholder="  Title"
            />
            <Button name={'+'} callback={onClickAddTask} disabled={props.disabled}/>
            {error ? <div  className={ s.errorText}> Error! Title is required</div> : <div></div>}
        </div>
    );
});

export default AddItemForm;