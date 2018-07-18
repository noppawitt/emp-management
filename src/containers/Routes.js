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
import AddTaskPage from './pages/AddTaskPage';
import ManageLeave from './pages/ManageLeave';
import ErpPage from './pages/ErpPage';
import ErpApprovePage from './pages/ErpApprovePage';
import ErpAddPage from './pages/ErpAddPage';
import ErpBillRecord from './forms/EditBillRecord';
import HolidayPage from './pages/HolidayPage';

const Routes = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route exact path="/" render={() => <Redirect to="/timesheet" />} />
    <PrivateRoute exact path="/timesheet" component={TimesheetPage} />
    <PrivateRoute path="/timesheet/new" component={AddTaskPage} />
    <PrivateRoute path="/leave" component={LeavePage} />
    <PrivateRoute exact path="/project" component={ProjectPage} />
    <PrivateRoute path="/project/:id" component={ProjectDetailPage} />
    <PrivateRoute path="/profile/:id" component={ProfilePage} />
    <PrivateRoute path="/employee" component={EmployeePage} />
    <PrivateRoute path="/report" component={ReportPage} />
    <PrivateRoute path="/manageleave" component={ManageLeave} />
<<<<<<< HEAD
    <PrivateRoute exact path="/erp" component={ErpPage} />
    <PrivateRoute path="/erp/:id" component={ErpBillRecord} />
    <PrivateRoute path="/erpApprove" component={ErpApprovePage} />
    <PrivateRoute path="/add" component={ErpAddPage} />
=======
    <PrivateRoute path="/holiday" component={HolidayPage} />
>>>>>>> 358698f4b6808cbba978eb9ac942cda19c155ad6
  </Switch>
);

export default Routes;
