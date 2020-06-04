import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  username: yup.string()
    .min(3, 'Must be at least 3 symbol')
    .required('User name is required !'),
  password: yup.string().required('Password is required !'),
});