import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import modal from './modal';
import profile from './profile';
import masterTable from './masterTable';
import employee from './employee';
import project from './project';
import projectDetail from './projectDetail';
import leave from './leave';
import timesheet from './timesheet';
import holiday from './holiday';
import report from './report';
import accessControl from './accessControl';
import erp from './erp';
import addrow from './addrow';
import erpdetail from './erpdetail';
import erpapprove from './erpapprove';

export default combineReducers({
  form: formReducer,
  auth,
  modal,
  profile,
  masterTable,
  employee,
  project,
  projectDetail,
  leave,
  timesheet,
  holiday,
  report,
  accessControl,
  erp,
  addrow,
  erpdetail,
  erpapprove,
});
