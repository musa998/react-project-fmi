import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Formik, FieldArray } from 'formik';
import * as taskmanager from 'api/taskmanager';
import { useQuery, useMutation, queryCache } from 'react-query';
import { Me } from 'types/models';
import classes from './Users.module.css';

function Users() {
  const { data: users } = useQuery(['users', 'all'], (key, u) =>  taskmanager.getAllUsers());  
  const [allUsers, setallUsers] = useState<Me[] | undefined>([]); 
  const [arrayIndex, setarrayIndex] = useState<number>(0);
  const [userEntity, setuserEntity] = useState<Me>();


  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deleteUser] = useMutation(taskmanager.deleteUser, {
    onSuccess: (data) => {
      queryCache.setQueryData('users', data); 
    },
  });

  useEffect(() => {
    setallUsers(users);
    queryCache.refetchQueries('users');
    // allUsers?.reverse();
  }, [allUsers, users]);
  
  return (
    <div>
      <div className={classes.container}>
        <Formik
          initialValues={{
            users: allUsers,
          }}
          enableReinitialize={true}
          onSubmit={(values, actions) => {}}
        >
          {({
            values,
            initialValues,
            handleChange,
            handleSubmit,
            resetForm,
            setFieldValue,
          }) => {
            console.log(values.users);
            return (
              <>
                <form
                  name="Submit"
                  className={classes.formHorizontal}
                  action=""
                  onSubmit={handleSubmit}
                >
                  <h3 style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
                    All users:</h3>
                  <FieldArray
                    name="users"
                    render={arrayHelpers => (
                      <>
                        {values.users?.map((user, index) => (
                          <>
                                                           
                            {/* {user.status ? user.status : 'Empty' } */}
                                                                  
                            
                            <div className={classes.userContainer}>
                              <h4 className={classes.username}>{user.username}</h4>
                              <Button>
                                Edit
                              </Button>
                              <Button
                                variant='danger'
                                onClick={() =>{
                                  setarrayIndex(index);
                                  setuserEntity(user);
                                  handleShow();
                                }}
                              >Delete</Button>
                            </div>
                          </>
                        ))}
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Body>Are you sure you want to delete that user</Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="danger"
                              onClick={() =>{
                                deleteUser(arrayIndex);
                                arrayHelpers.remove(arrayIndex);
                                handleClose();
                              }}
                            >
                              Yes
                            </Button>
                            <Button variant="success" onClick={handleClose}>
                              No
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </>
                    )}
                  />
                </form>
              </>
            );
          }}
        </Formik>
      </div> 
    </div>    
  );
}

export default Users;