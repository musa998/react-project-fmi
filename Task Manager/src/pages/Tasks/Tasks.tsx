import React, { useState, useCallback } from 'react';
import { TaskModel } from 'types/models';
import * as taskmanager from 'api/taskmanager';
import Form from 'components/generic/Form';
import List from 'components/generic/ListItems/List';
import classes from './Tasks.module.css';


function Tasks() {

  const initialTasks: TaskModel[] = [
    {
      id: '1',
      title: 'Core Skills',
      description: 'none',
      status: 'active',
      grade: 4,
    },
  ];
  const allTasks = taskmanager.getAllTasks();
  const [tasks, setTasks] = useState(allTasks);

  const updateTasks = useCallback( (items) => {
    setTasks(items);
  }, []);


  return (
    <div className={classes.container}>
      <Form updateItems={updateTasks} items={tasks} type="Tasks   " />
      <List updateItems={updateTasks} arrayItems={tasks} />
     
    </div>
  );
}


export default Tasks;