import React, { useState, useCallback, useEffect } from 'react';
import { TaskModel } from 'types/models';
import * as taskmanager from 'api/taskmanager';
import Form from 'components/generic/Form';
import List from 'components/generic/ListItems/List';
import { useAuth } from 'hooks/domain/useAuth';
import { useQuery } from 'react-query';
import classes from './Tasks.module.css';

function Tasks() {
  const { isAuthenticated, user } = useAuth();

  const initialTasks: TaskModel[] = [
    {
      id: '1',
      title: 'Core Skills',
      description: 'none',
      status: 'active',
      userId: 'none',
      grade: 4,
    },
  ];
  const allTasks = taskmanager.getAllTasks();
  // const { data: allTasks } = useQuery(['tasks', 'all'], (key, u) =>  taskmanager.getAllTasks());
 
  const [tasks, setTasks] = useState<TaskModel[]>(allTasks);

  const updateTasks = useCallback( (items) => {
    setTasks(items);
  }, []);
  
  const filteredArray = tasks.filter(t => t.userId === user?.id);

  return (
    <div className={classes.container}>
      {user?.isAdmin ? 
        <>
          <Form updateItems={updateTasks} items={tasks} type="Tasks   " />
          <List updateItems={updateTasks} arrayItems={tasks} />
        </>
        :
        <>
          <Form updateItems={updateTasks} items={filteredArray} type="Tasks   " />
          <List updateItems={updateTasks} arrayItems={filteredArray} />
        </>}
    </div>
  );
}


export default Tasks;