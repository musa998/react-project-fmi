import uniqid from 'uniqid';
import { Me } from 'types/models';

export type RegisterData = {
  username: string;
  password: string;
  confirmpassword: string;
};
  
export type LoginData = {
  username: string;
  password: string;
};
  
export const register = async (data: RegisterData): Promise<string> => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = {
    id: uniqid(),
    username:  data.username,
    password: data.password,
    isAdmin: false
  }; 
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('me', JSON.stringify(data.username));
  return JSON.stringify(data);
};
  
export const login = async (data: LoginData): Promise<string | null> => {
//   const res = await axios.post('/signin', data);
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  let succes = false;
  console.log(users);
  
  users.forEach(function (user:  Me) {
    console.log(typeof(user));
    // const userr = { username: user.username!, password: user.password};
    if(JSON.stringify(user.username) === JSON.stringify(data.username)
    && JSON.stringify(user.password) === JSON.stringify(data.password)){
      console.log('Equal');
      succes = true;
    }
  });

  if(succes){
    localStorage.setItem('me', JSON.stringify(data.username));
    return JSON.stringify(data);
  }
  return null;
};
  
export const logout = async (): Promise<string> => {
  localStorage.removeItem('me');
  return 'logout';
};
  