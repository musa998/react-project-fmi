import React from 'react';
import classes from './MainContent.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const MainContent: React.FC = ({ children }) => {
  return (
    <div className={classes.container}>
      {children}
    </div>
  );
};

export default MainContent;
