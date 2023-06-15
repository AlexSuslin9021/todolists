import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
// import s from './AddItemForm.module.css'
import { AddItemForm } from "./AddItemForm"
import {action} from "@storybook/addon-actions";
import s from "./AddItemForm.module.css";
import Button from "../Button/Button";
import axios from "axios";



export default {
  title: 'Todolist',
  component: AddItemForm,
  argTypes: {
    addItem: {
      description: 'Button '
    }
  },
} as ComponentMeta<typeof AddItemForm>;


 const  Input: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}  />;

export const AddItemFormStory = Input.bind({});

AddItemFormStory.args = {

  addItem:action('Button clicked inside form')
};

 const  Input1: ComponentStory<typeof AddItemForm> = (args) =>{

  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<boolean>(true)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    setError(false)
  }

  const onKeyDownHandler = (e: KeyboardEvent< HTMLInputElement>) => {
    // if (error) setError(false)
    if (e.key === 'Enter' && value.trim() !== '') {
      args.addItem(value.trim())
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
      args.addItem(value.trim())
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
        <Button name={'+'} callback={onClickAddTask}/>
        {error ? <div  className={ s.errorText}> Error! Title is required</div> : <div></div>}
      </div>
  );
}
export const AddItemFormStoryError = Input1.bind({});











