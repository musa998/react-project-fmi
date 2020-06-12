/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { TaskModel } from 'types/models/Task';
import * as taskmanager from 'api/taskmanager';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';
import { FormGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { Formik } from 'formik';
import { queryCache } from 'react-query';
import classes from './List.module.css';
import { TextAreaField } from '../FormControls';

interface ListProps {
  arrayItems: TaskModel[];
  updateItems: (items: TaskModel[]) => void;
}

const List: React.FC<ListProps> = ({ arrayItems, updateItems }) => {
  const SortableItem = SortableElement(
    ({
      task,
      onRemove,
      index,
    }: {
      task: TaskModel;
      onRemove: Function;
      index: number;
    }) => (
      // <ListItem type={type} index={index} key={index} task={value} removeItem={removeItem} />
      <div className={classes.item}>
        <button
          type="button"
          className={classes.dragCloseBtn}
          onClick={() => onRemove(task.title, index)}
        >
          {' '}
          X{' '}
        </button>
        <button
          type="button"
          className={classes.dragEditBtn}
          onClick={() => {
            // setarrayIndex(index);
            // settimeSheet(timesheetentity);
            settaskToEdit(task);
            handleShow();
          }}
        >
          {' '}
          Edit{' '}
        </button>
        <h5>{task.title}</h5>
        <hr />
        <div className={classes.taskContainer}>
          {/* <div>Title: {task.title}</div> */}
          <div>Description: {task.description}</div>
          <div>Status: {task.status}</div>
          <div>Grade: {task.grade}</div>
        </div>
      </div>
    )
  );

  const SortableList = SortableContainer(
    ({ items, onRemove }: { items: TaskModel[]; onRemove: Function }) => {
      return (
        <ul className="row">
          {items.map((task, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <SortableItem
              onRemove={onRemove}
              key={`item-${index}`}
              index={index}
              task={task}
            />
          ))}
        </ul>
      );
    }
  );

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    updateItems(arrayMove(arrayItems, oldIndex, newIndex));
  };

  const onRemove = (title: string, index?: number) => {
    console.log(title);
    let array = [...arrayItems];
    array = array.filter((item: TaskModel) => item.title !== title);
    console.log(array);
    taskmanager.deleteTask(index);
    updateItems(array);
  };

  const deleteItem = (index: number) => {
    const taskArray = [...arrayItems];
    taskArray?.splice(index, 1);
    queryCache.setQueryData('films', taskArray);
  };

  const editItem = (task: TaskModel) => {
    const taskArray = [...arrayItems];
    taskArray?.forEach(function (value, index) {
      if (taskArray[index].id === task.id) {
        console.log(taskArray[index].title, task.title);
        taskArray[index].title = task.title;
        taskArray[index].description = task.description;
        taskArray[index].grade = task.grade;
      }
    });
    updateItems(taskArray);
    // queryCache.setQueryData('tasks', taskArray);
  };

  const [taskToEdit, settaskToEdit] = useState<TaskModel>();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ul className="row">
        <SortableList
          axis="xy"
          items={arrayItems}
          onSortEnd={onSortEnd}
          onRemove={onRemove}
        />
      </ul>

      <Formik
        initialValues={{
          title: taskToEdit?.title,
          description: taskToEdit?.description,
          grade: taskToEdit?.grade,
        }}
        onSubmit={async (values, actions) => {
          console.log(values.title);
          const taskEdit = {
            id: taskToEdit?.id,
            title: values?.title,
            description: values.description,
            grade: values.grade,
          };
          await editItem(taskEdit);
          actions.setSubmitting(false);
          handleClose();
        }}
      >
        {({ isSubmitting, handleSubmit, values, initialValues }) => {
          console.log(values.title);
          return (
            <Modal show={show} onHide={handleClose}>
              <Modal.Body>
                <TextAreaField
                  name="title"
                  placeholder="Title"
                  disabled={isSubmitting}
                  value={values.title}
                />
                <TextAreaField
                  name="description"
                  placeholder="Description"
                  disabled={isSubmitting}
                  value={values.description}
                />
                <TextAreaField
                  name="grade"
                  placeholder="Grade"
                  disabled={isSubmitting}
                  value={values.grade}
                />
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Status"
                >
                  <Dropdown.Item href="#/action-1">Active</Dropdown.Item>
                  <Dropdown.Item href="#/action-1">Complited</Dropdown.Item>
                </DropdownButton>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleSubmit();
                    handleClose();
                  }}
                  disabled={isSubmitting || !values.title}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={handleClose}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          );
        }}
      </Formik>
    </>
  );
};
export default List;
