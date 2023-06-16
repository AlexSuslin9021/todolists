import {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./addItemForm.module.css";

export const useAddItemForm=(addItem: (title: string)=>void)=>{
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        setError(false)
    }
    const onKeyDownHandler = (e: KeyboardEvent< HTMLInputElement>) => {
        if (e.key === 'Enter' && value.trim() !== '') {
            addItem(value.trim())
            setValue('')
        }
        else if (value !== '') {
            setError(false)
        }
        else if(e.key === 'Enter' && value.trim() === '') {
            setError(true)
        }
    }
    const onClickAddTask = () => {

        if (value.trim() !== '') {
            addItem(value.trim())
            setValue('')
        } else {
            setError(true)
        }
    }
    const inputClass = (error ? s.errorInput : '') + " " + s.input

    return{
        onChangeHandler,
        value,
        error,
        inputClass,
        onKeyDownHandler,
        onClickAddTask,
    }
}