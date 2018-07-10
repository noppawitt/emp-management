import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ExamRoute from './ExamRoute';
import LoginPage from './pages/LoginPage';
import TimesheetPage from './pages/TimesheetPage';
import LeavePage from './pages/LeavePage';
import ProjectPage from './pages/ProjectPage';
import ProfilePage from './pages/ProfilePage';
import EmployeePage from './pages/EmployeePage';
import ExamPage from './pages/ExamPage';
import RecruitmentPage from './pages/RecruitmentPage';
import ExamLoginPage from './pages/ExamLoginPage';
import TakeExamAgreementPage from './pages/TakeExamAgreementPage';
import TakeExamPage from './pages/TakeExamPage';

// build these compenents
import GradeExamPage from './pages/GradeExamPage';
import ViewResultPage from './pages/ViewResultPage';

const Routes = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <Route exact path="/" render={() => <Redirect to="/timesheet" />} />
    <PrivateRoute path="/timesheet" component={TimesheetPage} />
    <PrivateRoute path="/leave" component={LeavePage} />
    <PrivateRoute path="/project" component={ProjectPage} />
    <PrivateRoute path="/profile/:id?" component={ProfilePage} />
    <PrivateRoute path="/employee" component={EmployeePage} />
    <PrivateRoute path="/exam/*" component={ExamPage} />
    <PrivateRoute path="/recruitment/*" component={RecruitmentPage} />
    <PrivateRoute path="/grade_exam" component={GradeExamPage} />
    <PrivateRoute path="/view_result" component={ViewResultPage} />
    <Route path="/examlogin" component={ExamLoginPage} />
    <ExamRoute path="/preparetoexam" component={TakeExamAgreementPage} />
    <ExamRoute path="/takeexam" component={TakeExamPage} />
  </Switch>
);

export default Routes;
