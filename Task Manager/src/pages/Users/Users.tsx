import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
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
    // onSuccess: (data) => {
    //   queryCache.setQueryData('users', data); 
    // },
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
            // console.log(values.users);
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
                  <Table striped bordered hover>
                    <tbody> 
                      <FieldArray
                        name="users"
                        render={arrayHelpers => (
                          <>
                            {values.users?.map((user, index) => (
                              <>
                                                           
                                {/* {user.status ? user.status : 'Empty' } */}
                                <tr>
                                  <td>{user.username}</td>
                                  {/* <td>{timesheetentity.status ? timesheetentity.status : 'Empty' }</td> */}
                                      
                                  <td> <Button> 
                                    Edit
                                  </Button>
                                  </td>
                                  <td><Button
                                    variant='danger'
                                    onClick={() =>{
                                      setarrayIndex(index);
                                      setuserEntity(user);
                                      handleShow();
                                    }}
                                  >Delete</Button></td>
                                </tr>
                                                                  
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
                    </tbody>
                  </Table>
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