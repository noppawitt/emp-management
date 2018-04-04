import * as actionTypes from '../constants/actionTypes';

const initialState = {};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_FETCH_REQUEST:
      return {
        id: action.id
      };
    case actionTypes.PROFILE_FETCH_SUCCESS:
      return {
        id: action.profile.id,
        name: action.profile.name
      };
    default:
      return state;
  }
};

export default profile;
