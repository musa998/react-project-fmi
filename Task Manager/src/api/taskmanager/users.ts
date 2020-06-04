import { Me } from 'types/models';


export const getMe = async (): Promise<Me> => {
//   const res = await axios.get('/users/me');
  const res = JSON.parse(localStorage.getItem('me')!);
  return res!;
//   const res =  localStorage.getItem('me');
//   return res!;
};

export const getAllUsers = async (): Promise<Me[]> => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users;
};


export const deleteUser = async (index: number | undefined):
Promise<string> => {
  const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
  allUsers.splice(index, 1);
  localStorage.setItem('users', JSON.stringify(allUsers));

  return 'succes';
};