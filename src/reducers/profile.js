import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  page: 'general'
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        id: action.id
      };
    case actionTypes.PROFILE_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        id: action.profile.id,
        firstName: action.profile.firstName,
        lastName: action.profile.lastName,
        nickName: action.profile.nickName,
        citizenId: action.profile.citizenId,
        mobileNo: action.profile.mobileNo,
        email: action.profile.email,
        facebook: action.profile.facebook,
        lineId: action.profile.lineId,
        pictureSrc: action.profile.pictureSrc
      };
    default:
      return state;
  }
};

export default profile;
