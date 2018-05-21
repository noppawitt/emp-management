import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from './history';
import AppContainer from '../containers/AppContainer';
import LoginPage from '../containers/pages/LoginPage';
import SignupPage from '../containers/pages/SignupPage';
import Timesheet from '../components/Timesheet';
import LeaveRequest from '../components/LeaveRequest';
import ProfilePage from '../containers/pages/ProfilePage';
import EmployeePage from '../containers/pages/EmployeePage';
import ProjectPage from '../containers/pages/ProjectPage';

const Routes = () => (
  <Router history={history}>
    <AppContainer>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/timesheet" />} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/timesheet" component={Timesheet} />
        <Route path="/leave-request" component={LeaveRequest} />
        <Route path="/project" component={ProjectPage} />
        <Route path="/profile/:id?" component={ProfilePage} />
        <Route path="/employee" component={EmployeePage} />
      </Switch>
    </AppContainer>
  </Router>
);

export default Routes;
