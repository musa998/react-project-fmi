import React, { useState } from 'react';
import { TaskModel } from 'types/models/Task';
import * as taskmanager from 'api/taskmanager';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {
  arrayMove,
  SortableContainer,
  SortableElement
} from 'react-sortable-hoc';
import { FormGroup } from 'react-bootstrap';
import classes from './List.module.css';

interface ListProps {
  arrayItems: TaskModel[];
  updateItems: (items: TaskModel[]) => void;
}

const List: React.FC<ListProps> = ({ arrayItems, updateItems }) => {

  const SortableItem = SortableElement((
    { task, onRemove, index }: { task: TaskModel; onRemove: Function; index: number },
  ) =>
    // <ListItem type={type} index={index} key={index} task={value} removeItem={removeItem} />
    <div className={classes.item}>
    
      <button type="button" className={classes.dragCloseBtn} onClick={() => onRemove(task.title, index)}>
        {' '}
        X{' '}
      </button>
      <button 
        type="button"
        className={classes.dragEditBtn}
        onClick={() =>{
          // setarrayIndex(index);
          // settimeSheet(timesheetentity);
          handleShow();
        }}
      >
        {' '}
        Edit{' '}
      </button>
      <h5>Task</h5>
      <hr />
      <div className={classes.taskContainer}>
        <div>Title: {task.title}</div>
        <div>Description: {task.description}</div>
        <div>Status: {task.status}</div>
        <div>Grade: {task.grade}</div>
      </div>

      
    </div>
  );

  const SortableList = SortableContainer(({ items, onRemove }: {items: TaskModel[]; onRemove: Function}) => {
    return (
      <ul className="row">
        {items.map((task, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SortableItem onRemove={onRemove} key={`item-${index}`} index={index} task={task} />
        ))}
      </ul>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }: {oldIndex: number, newIndex: number}) => {
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <FormGroup>
            <input
              type="text"
              placeholder="Title"
            />
          </FormGroup>
          <FormGroup>
            <input
              type="text"
              placeholder="Description"
            />
          </FormGroup>
          <FormGroup>
            <input
              type="text"
              placeholder="Grade"
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() =>{
              // deleteTimesheet(timeSheet!.id);
              // arrayHelpers.remove(arrayIndex);
              handleClose();
            }}
          >
            Edit
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default List;