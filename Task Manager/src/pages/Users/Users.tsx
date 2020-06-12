import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { Formik, FieldArray } from 'formik';
import * as taskmanager from 'api/taskmanager';
import { useQuery, useMutation, queryCache } from 'react-query';
import { Me, TaskModel } from 'types/models';
import { TextAreaField } from 'components/generic/FormControls';
import classes from './Users.module.css';

function Users() {
  const { data: users } = useQuery(['users', 'all'], (key, u) =>
    taskmanager.getAllUsers()
  );
  const [allUsers, setallUsers] = useState<Me[] | undefined>([]);
  const [arrayIndex, setarrayIndex] = useState<number>(0);
  const [userEntity, setuserEntity] = useState<Me>();
  const [userToEdit, setuserToEdit] = useState<Me>();

  const [show, setShow] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deleteUser] = useMutation(taskmanager.deleteUser, {
    onSuccess: (data) => {
      queryCache.setQueryData('users', data);
    },
  });

  // const [updateUser] = useMutation(taskmanager.updateUser, {
  //   // onSuccess: (data) => {
  //   //   queryCache.setQueryData('users', data);
  //   // },
  // });


  const editItem = (user: Me) => {
    const usersArray = allUsers;
    usersArray?.forEach(function (value, index) {
      if (usersArray[index].id === user.id) {
        usersArray[index].username = user.username;
      }
    });
    queryCache.setQueryData('users', usersArray);
  };

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
            username: userToEdit?.username,
          }}
          enableReinitialize={true}
          onSubmit={(values, actions) => {
            const userEdit = {
              id: userToEdit?.id,
              username: values.username,
            };
            editItem(userEdit);
          }}
        >
          {({
            values,
            initialValues,
            handleChange,
            handleSubmit,
            resetForm,
            isSubmitting,
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
                  <h3
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '3rem',
                    }}
                  >
                    All users:
                  </h3>
                  <Table striped bordered hover>
                    <tbody>
                      <FieldArray
                        name="users"
                        render={(arrayHelpers) => (
                          <>
                            {values.users?.map((user, index) => (
                              <>
                                {/* {user.status ? user.status : 'Empty' } */}
                                <tr>
                                  <td>{user.username}</td>
                                  {/* <td>{timesheetentity.status ? timesheetentity.status : 'Empty' }</td> */}

                                  <td>
                                    {' '}
                                    <Button
                                      onClick={() => {
                                        setuserToEdit(user);
                                        handleShowEdit();
                                      }}
                                    >
                                      Edit
                                    </Button>
                                  </td>
                                  <td>
                                    <Button
                                      variant="danger"
                                      onClick={() => {
                                        setarrayIndex(index);
                                        setuserEntity(user);
                                        handleShow();
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </td>
                                </tr>
                              </>
                            ))}
                            <Modal show={show} onHide={handleClose}>
                              <Modal.Body>
                                Are you sure you want to delete that user
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="danger"
                                  onClick={() => {
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

                            {/* Edit Modal */}
                            <Modal show={showEdit} onHide={handleCloseEdit}>
                              <Modal.Body>
                                <TextAreaField
                                  name="username"
                                  placeholder="UserName"
                                  disabled={isSubmitting}
                                  value={values.username}
                                />
                                {/* <TextAreaField
                                  name="director"
                                  placeholder="Director"
                                  disabled={isSubmitting}
                                  value={values.director}
                                /> */}
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="primary"
                                  onClick={() => {
                                    handleSubmit();
                                    handleCloseEdit();
                                  }}
                                >
                                  {isSubmitting ? 'Editing...' : 'Edit'}
                                </Button>
                                <Button variant="danger" onClick={handleCloseEdit}>
                                  Cancel
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
