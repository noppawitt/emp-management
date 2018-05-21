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
    case actionTypes.FETCH_PROJECT_FAILURE:
      return {
        isFetching: false,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default Project;
