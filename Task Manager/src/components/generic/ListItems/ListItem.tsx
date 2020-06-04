import React from 'react';
import { FiX } from 'react-icons/fi';
import classes from './List.module.css';

type Props = {
  todo: string;
  index: number;
  removeItem: (index: number, type: string) => void;
  type: string;
};
  
const ListItem: React.FC<Props> = ({ todo, removeItem, index, type }) => {
  return (
    <div className={classes.item}>
      {todo}
      <FiX
        style={{ marginLeft: '5px' }}
        onClick={() => {
          console.log('asdasdasdasdasd');
          removeItem(index, type);
        }}
      />
    </div>
  );
};
export default ListItem;