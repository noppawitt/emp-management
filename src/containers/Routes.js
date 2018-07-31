import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ExamRoute from './ExamRoute';
import LoginPage from './pages/LoginPage';
import TimesheetPage from './pages/TimesheetPage';
import LeavePage from './pages/LeavePage';
import ProjectPage from './pages/ProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProfilePage from './pages/ProfilePage';
import EmployeePage from './pages/EmployeePage';
import ExamPage from './pages/ExamPage';
import RecruitmentPage from './pages/RecruitmentPage';
import RecruitmentDetailPage from './pages/RecruitmentDetailPage';
import ExamLoginPage from './pages/ExamLoginPage';
import TakeExamAgreementPage from './pages/TakeExamAgreementPage';
import TakeExamPage from './pages/TakeExamPage';
import ReportPage from './pages/ReportPage';
import AddTaskPage from './pages/AddTaskPage';
import ManageLeave from './pages/ManageLeavePage';
import HolidayPage from './pages/HolidayPage';
import LeaveApprovalPage from './pages/LeaveApprovalPage';
import Can from './Can';

const Routes = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route exact path="/" render={() => <Redirect to="/timesheet" />} />
    <PrivateRoute exact path="/timesheet" component={TimesheetPage} />
    <PrivateRoute path="/timesheet/new" component={AddTaskPage} />
    <PrivateRoute path="/leave" component={LeavePage} />
    <PrivateRoute exact path="/project" component={ProjectPage} />
    <PrivateRoute path="/project/:id" component={ProjectDetailPage} />
    <PrivateRoute path="/exam/*" component={ExamPage} />
    <PrivateRoute exact path="/recruitment" component={RecruitmentPage} />
    <PrivateRoute path="/recruitment/:id" component={RecruitmentDetailPage} />
    <Route path="/examlogin" component={ExamLoginPage} />
    <ExamRoute path="/takeexam_agreement" component={TakeExamAgreementPage} />
    <ExamRoute path="/takeexam" component={TakeExamPage} />
    <PrivateRoute path="/profile/:id" component={ProfilePage} />
    <PrivateRoute path="/employee" component={EmployeePage} />
    <PrivateRoute path="/report" component={ReportPage} />
    <PrivateRoute path="/manageleave" component={ManageLeave} />
    <PrivateRoute path="/holiday" component={HolidayPage} />
    <Can activity="leaveRequestApprove">
      <PrivateRoute path="/leave-approval" component={LeaveApprovalPage} />
    </Can>
  </Switch>
);

export default Routes;
