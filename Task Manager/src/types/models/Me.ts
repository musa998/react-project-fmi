import { TaskModel } from './Task';


export type Me = {
  id: string;
  username: string;
  password: string;
  isAdmin: boolean;
  tasks?: TaskModel[]; 
};