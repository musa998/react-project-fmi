import { Me } from 'types/models';


export const getMe = async (): Promise<Me | null> => {
//   const res = await axios.get('/users/me');
  const res = JSON.parse(localStorage.getItem('me')!);
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  let me: Me = { id: '', username: '', password: '', isAdmin: false };

  users.forEach(function (user:  Me) {
    if(JSON.stringify(user.username) === JSON.stringify(res)){
      me = user;
    }
  });

  return me;
};

export const getAllUsers = async (): Promise<Me[]> => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users;
};

export const deleteUser = async (index: number | undefined):
Promise<Me[]> => {
  console.log('delete user');
  const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
  allUsers.splice(index, 1);
  localStorage.setItem('users', JSON.stringify(allUsers));

  return allUsers;
};

export const updateUser = async (index: number, user: Me):
Promise<Me[]> => {
  console.log('update user');
  const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
  allUsers[index].username = user.username;
  localStorage.setItem('users', JSON.stringify(allUsers));

  return allUsers;
};