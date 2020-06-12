import { TaskModel } from './Task';


export type Me = {
  id?: string;
  username: string | undefined;
  password?: string;
  isAdmin?: boolean;
  tasks?: TaskModel[]; 
};