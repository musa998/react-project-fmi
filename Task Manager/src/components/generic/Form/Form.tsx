/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import * as taskmanager from 'api/taskmanager';
import uniqid from 'uniqid';
import { TaskModel } from 'types/models';
import { useAuth } from 'hooks/domain/useAuth';


const addItem = (title: string, description: string, grade: number,
  items: TaskModel[], updateItems: any, userId: string | undefined) => {
  if(title === ''){
    return;
  }
  const newItem = { id: uniqid(), title, description,
    grade, status: 'active', userId };
  const arr = [...items, newItem];
  taskmanager.createTask(arr);
  updateItems(arr);
};

type AddItemProps = {
  items: TaskModel[];
  updateItems: (items: any[]) => void
  type: string;
};
    
const Form: React.FC<AddItemProps> = ({ type, updateItems, items }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const [grade, setgrade] = useState(2);
    
  return (
    <form>
      <span>
        {type}
      </span>
      <input
        type="text"
        value={title}
        onChange={e => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="text"
        value={description}
        onChange={e => {
          setdescription(e.target.value);
        }}
      />
      <input
        type="text"
        value={grade}
        onChange={e => {
          setgrade( + e.target.value);
        }}
      />
      <button
        type="submit"
        onClick={e => {
          e.preventDefault();
          addItem(title, description, grade, items, updateItems, user?.id);
          setTitle('');
          setdescription('');
          setgrade(0);
        }}
      >
        Add
      </button>
    </form>
  );
};
export default Form;