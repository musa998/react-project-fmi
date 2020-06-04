import React from 'react';
import { Formik } from 'formik';
import { TextInputField } from 'components/generic/FormControls';
import { useMutation, queryCache } from 'react-query';
import * as taskmanager from 'api/taskmanager';
import Button from 'react-bootstrap/Button';
import classes from './Register.module.css';
import { RegisterSchema } from './schema';

function Register(){

  const [register] = useMutation(taskmanager.register, {
    onSuccess: (data) => {
      queryCache.setQueryData('me', data); 
    },
  });
  
  return (
    <div className={classes.container}>
      <Formik
        initialValues={{
          confirmpassword: '',
          username: '',
          password: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          register(values);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
        }) => {
          console.log(errors, touched, values.password);
          return (
            <form
              name="Register"
              className={classes.formHorizontal}
              action=""
              onSubmit={handleSubmit}
            >
              <h2>Register from here</h2>
              <div className={classes.formGroup}>
                <TextInputField labelName="Username" name="username" />
                <TextInputField type="password" labelName="Password" name="password" />
                <TextInputField type="password" labelName="Confirm Password" name="confirmpassword" />
                <Button
                  className={classes.input}
                  type="submit"
                  value="Register"
                >
                  Register
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
export default Register;