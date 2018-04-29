import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import todo from './todo';
import profile from './profile';

export default combineReducers({
  form: formReducer,
  auth,
  todo,
  profile
});
