import * as yup from 'yup';

export const RegisterSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Must be at least 3 symbol')
    .required('Username is required !'),
  password: yup
    .string()
    .min(6, 'Must be at least 6 symbols long')
    .required('Password is required !'),
  confirmpassword: yup
    .string()
    .required('Confirm Password is required !')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});
