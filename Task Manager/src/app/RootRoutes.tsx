import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { useAuth } from 'hooks/domain/useAuth';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Tasks from 'pages/Tasks';
import Users from 'pages/Users';



function RootRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if(isAuthenticated){
    return (
      <Switch>
        <Redirect path="/register" to="/" />
        <Redirect path="/login" to="/" />

        <Route exact path="/users" component={Users} />
        <Route exact path="/" component={Tasks} />

      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Redirect to="/login" />
    </Switch>
  );
}

export default RootRoutes;