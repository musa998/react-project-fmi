import React from 'react';
import { Formik } from 'formik';
import { useMutation, queryCache } from 'react-query';
import * as taskmanager from 'api/taskmanager';
import { TextInputField } from 'components/generic/FormControls';
import Button from 'react-bootstrap/Button';
import { LoginSchema } from './shema';
import classes from './Login.module.css';

type FormValues = {
  username: string;
  password: string;
};

function Login() {
  const [login] = useMutation(taskmanager.login, {
    onSuccess: (data) => {
      queryCache.setQueryData('me', data); 
    },
  });
  
  return (
    <div className={classes.container}>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          login(values);
          actions.setSubmitting(false);
        }}
      >
        {({
          values,
          isSubmitting,
          handleSubmit,
          errors,
        }) => {
          // console.log(errors, touched, values.password);
          return (
            <form
              name="Login"
              className={classes.formHorizontal}
              action=""
              onSubmit={handleSubmit}
            >
              <h2>Login from here</h2>
              <div className={classes.formGroup}>
                <TextInputField labelName="Username" name="username" />
                <TextInputField type="password" labelName="Password" name="password" />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={classes.input}
                >
                  {isSubmitting ? 'Loading...' : 'Login'}
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
export default Login;
