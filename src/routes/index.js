import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from './history';
import AppContainer from '../containers/AppContainer';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Timesheet from '../components/Timesheet';
import LeaveRequest from '../components/LeaveRequest';
import TodoContainer from '../containers/TodoContainer';

const Routes = () => (
  <Router history={history}>
    <AppContainer>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/timesheet" />} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/timesheet" component={Timesheet} />
        <Route path="/leave-request" component={LeaveRequest} />
        <Route path="/project" component={TodoContainer} />
      </Switch>
    </AppContainer>
  </Router>
);

export default Routes;
