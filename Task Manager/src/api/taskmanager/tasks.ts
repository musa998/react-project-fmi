/* eslint-disable @typescript-eslint/no-explicit-any */
import { TaskModel } from 'types/models';

export const getAllTasks = (): TaskModel[] => {
  const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  return allTasks;
};

export const createTask = async (arr: any[]): Promise<string> => {
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks = [...arr, tasks];
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return 'succes';
};

export const deleteTask = async (index: number | undefined): Promise<string> => {
  const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  allTasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(allTasks));

  return 'succes';
};