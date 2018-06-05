import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from './pages/LoginPage';
import Timesheet from '../components/Timesheet';
import LeavePage from './pages/LeavePage';
import ProjectPage from './pages/ProjectPage';
import ProfilePage from './pages/ProfilePage';
import EmployeePage from './pages/EmployeePage';

const Routes = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route exact path="/" render={() => <Redirect to="/timesheet" />} />
    <PrivateRoute path="/timesheet" component={Timesheet} />
    <PrivateRoute path="/leave" component={LeavePage} />
    <PrivateRoute path="/project" component={ProjectPage} />
    <PrivateRoute path="/profile/:id?" component={ProfilePage} />
    <PrivateRoute path="/employee" component={EmployeePage} />
  </Switch>
);

export default Routes;
