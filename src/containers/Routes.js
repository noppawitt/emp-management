import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from './pages/LoginPage';
import TimesheetPage from './pages/TimesheetPage';
import LeavePage from './pages/LeavePage';
import ProjectPage from './pages/ProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProfilePage from './pages/ProfilePage';
import EmployeePage from './pages/EmployeePage';
import ReportPage from './pages/ReportPage';

const Routes = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route exact path="/" render={() => <Redirect to="/timesheet" />} />
    <PrivateRoute path="/timesheet" component={TimesheetPage} />
    <PrivateRoute path="/leave" component={LeavePage} />
    <PrivateRoute exact path="/project" component={ProjectPage} />
    <PrivateRoute path="/project/:id" component={ProjectDetailPage} />
    <PrivateRoute path="/profile/:id?" component={ProfilePage} />
    <PrivateRoute path="/employee" component={EmployeePage} />
    <PrivateRoute path="/report" component={ReportPage} />
  </Switch>
);

export default Routes;
