import * as actionTypes from '../constants/actionTypes';

const Project = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PROJECT_FETCH_REQUEST:
      return {
        isFetching: true
      };
    case actionTypes.PROJECT_FETCH_SUCCESS:
      return {
        isFetching: false,
        lists: action.payload.projects
      };
    case actionTypes.PROJECT_FETCH_FAILURE:
      return {
        isFetching: false,
        message: action.payload.message
      };
    case actionTypes.PROJECT_CREATE_REQUEST:
      return {
        isFetching: true,
        form: action.payload.form
      };
    case actionTypes.PROJECT_CREATE_SUCCESS:
      return {
        isFetching: false,
        lists: action.payload.projects
      };
    case actionTypes.PROJECT_CREATE_FAILURE:
      return {
        isFetching: false,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default Project;
