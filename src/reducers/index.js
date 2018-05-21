import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import todo from './todo';
import modal from './modal';
import profile from './profile';
import masterTable from './masterTable';
import employee from './employee';
import project from './project';

export default combineReducers({
  form: formReducer,
  auth,
  todo,
  modal,
  profile,
  masterTable,
  employee,
  project
});
