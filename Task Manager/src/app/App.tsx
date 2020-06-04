import React from 'react';
import { Router } from 'react-router';
import NavBar from 'components/layout/NavBar';
import MainContent from 'components/layout/MainContent';
import { createBrowserHistory } from 'history';
import * as taskmanager from 'api/taskmanager';
import { queryCache, ReactQueryConfigProvider } from 'react-query';
import RootRoutes from './RootRoutes';

const history = createBrowserHistory(); 

const queryConfig = {
  refetchAllOnWindowFocus: false,
  // onError: (err: unknown) => {
  //   const apiError = taskmanager.extractApiError(err);
  //   if (apiError?.statusCode === 401) {
  //     queryCache.setQueryData('me', undefined);
  //   }
  // },
};
export default function App() {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router history={history}>
        <NavBar />
        <MainContent>
          <RootRoutes />
        </MainContent>
      </Router>
    </ReactQueryConfigProvider>
  );
}
