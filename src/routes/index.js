import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from './history';
import AppContainer from '../containers/AppContainer';
import LoginPage from '../containers/pages/LoginPage';
import SignupPage from '../containers/pages/SignupPage';
import Timesheet from '../components/Timesheet';
import LeavePage from '../containers/pages/LeavePage';
import ProfilePage from '../containers/pages/ProfilePage';
import EmployeePage from '../containers/pages/EmployeePage';
import ProjectPage from '../containers/pages/ProjectPage';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={LoginPage} />
      <AppContainer>
        <Route exact path="/" render={() => <Redirect to="/timesheet" />} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/timesheet" component={Timesheet} />
        <Route path="/leave" component={LeavePage} />
        <Route path="/project" component={ProjectPage} />
        <Route path="/profile/:id?" component={ProfilePage} />
        <Route path="/employee" component={EmployeePage} />
      </AppContainer>
    </Switch>
  </Router>
);

export default Routes;
