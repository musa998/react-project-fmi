import React from 'react';
import logo from 'app/logo.svg';
import { NavLink, Link } from 'react-router-dom';
import * as socialmedia from 'api/taskmanager';
import { useMutation, queryCache } from 'react-query';
import { useAuth } from 'hooks/domain/useAuth';
import { Navbar, Nav } from 'react-bootstrap';
import classes from './NavBar.module.css';

const NavBar: React.FC = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [logout] = useMutation(socialmedia.logout, {
    onSuccess: () => {
      queryCache.setQueryData('me', undefined);
    }
  });
  return (
    <Navbar className={classes.navbar} fixed="top" expand="sm">
      <img width="50px" height="50px" src={logo} alt="Logo" />
      <NavLink className={classes.title} to="/">Task Manager</NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" />
        { isAuthenticated && user ? (
          <>
            <div className={classes.buttonContainer}>
              <Link className={classes.logoutBtn} to="/">Tasks</Link>
              <Link className={classes.logoutBtn} to="/users">Users</Link>
              {/* <Link className={classes.logoutBtn} to={`/${user.username}`}>Profile</Link> */}
              <Link className={classes.logoutBtn} to="#" onClick={() => logout()}>Logout</Link>
            </div>
          </>
        ) : (
          <>
            <div className={classes.buttonContainer}>
              <Link className={classes.login} to="/login">Login</Link>
              <Link className={classes.register} to="/register">Register</Link>
            </div>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;