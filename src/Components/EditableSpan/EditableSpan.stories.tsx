import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';



import {EditableSpan} from "./EditableSpan";



export default {
  title: 'Todolist',
  component: EditableSpan,
  argTypes: {
    backgroundColor: { control: 'color' },
  },

} as ComponentMeta<typeof EditableSpan>;


export const  Input: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}  />;

export const EditableSpanStory = Input.bind({});
//
EditableSpanStory.args = {

  title: 'new',
  onChangeTitleInput: ()=>{
    console.log(EditableSpanStory.args?.title) }
};
















