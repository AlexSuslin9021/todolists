import React, {FC} from 'react';
import Button from "../Button/Button";
import s from './AddItemForm.module.css'
import {useAddItemForm} from "./selectors";

export const AddItemForm: FC<AddItemFormType> = React.memo(({addItem,disabled}) => {
    const{
        onChangeHandler,
        value,
        error,
        inputClass,
        onKeyDownHandler,
        onClickAddTask,
    }=useAddItemForm(addItem)

    return (
        <div >
            <input value={value}
                   onChange={onChangeHandler}
                   onKeyUp={onKeyDownHandler}
                   className={inputClass}
                   placeholder="  Title"
            />
            <Button name={'+'} callback={onClickAddTask} disabled={disabled}/>
            {error ? <div  className={ s.errorText}> Error! Title is required</div> : <div></div>}
        </div>
    );
});

export default AddItemForm;

type AddItemFormType = {
    addItem: (title: string) => void
    disabled?:boolean
}