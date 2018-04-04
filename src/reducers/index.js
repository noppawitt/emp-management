import { combineReducers } from 'redux';
import auth from './auth';
import todo from './todo';
import profile from './profile';

export default combineReducers({
  auth,
  todo,
  profile
});
