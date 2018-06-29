import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {
  fetchRecruitmentRequest,
  sortRecruitment,
  filterRecruitment,
  filterStartDateRecruitment,
  filterEndDateRecruitment,
  checkPasswordStatusRequest,
} from '../../actions/recruitment';
import Recruitment from '../../components/Recruitment';
import Loader from '../../components/Loader';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import { getVisibleRecruitment } from '../../selectors/recruitment';

const RecruitmentPage = ({
  isFetching,
  recruitments,
  onSearchChange,
  sortByKey,
  sortKey,
  direction,
  onStartDateChange,
  onEndDateChange,
  startDate,
  endDate,
  onClickActivate,
  alivePassword }) => {
  const handleSort = (key) => {
    if (sortKey !== key) {
      sortByKey(key, 'ascending');
    }
    else {
      sortByKey(key, direction === 'ascending' ? 'descending' : 'ascending');
    }
  };
  return (
    <div>
      {isFetching ?
        <Loader /> :
        <Recruitment
          recruitments={recruitments}
          onSearchChange={onSearchChange}
          handleSort={handleSort}
          sortKey={sortKey}
          direction={direction}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
          startDate={startDate}
          endDate={endDate}
          onClickActivate={onClickActivate}
          alivePassword={alivePassword}
        />}
    </div>
  );
};

RecruitmentPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  recruitments: PropTypes.array.isRequired,
  direction: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  sortByKey: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  onClickActivate: PropTypes.func.isRequired,
  alivePassword: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.recruitment.isFetching,
  recruitments: getVisibleRecruitment(state),
  direction: state.recruitment.direction,
  sortKey: state.recruitment.sortKey,
  startDate: state.startDate,
  endDate: state.endDate,
  alivePassword: state.recruitment.alivePassword,
});

const mapDispatchToProps = dispatch => ({
  fetchRecruitment: () => dispatch(fetchRecruitmentRequest()),
  sortByKey: (key, direction) => dispatch(sortRecruitment(key, direction)),
  onSearchChange: e => dispatch(filterRecruitment(e.target.value)),
  // moment use .format({some time format})
  // instead of .target.value to get value of time
  onStartDateChange: date => dispatch(filterStartDateRecruitment(date)),
  onEndDateChange: date => dispatch(filterEndDateRecruitment(date)),
  // code Activate function following this rule or fix it maybe
  // Activate order is
  // -is there alive password within have enough time to do exam?
  // -do nothing : generate new password
  // -query that alive password to state
  // -openModal and display it
  onClickActivate: cid => compose(
    dispatch(checkPasswordStatusRequest(cid)),
    dispatch(openModal(modalNames.DISPLAY_PASSWORD)),
  ),
  // check here any password alive and
  // its Remaining time enought?
  // now we get api >> fetchCandidatePassword
  // console.log(cid),
  // (dispatch(checkPasswordStatusSuccess(cid)).password === null ?
  //   // do nothing
  //   // dispatch(isUsablePasswordExist(cid)) :
  //   console.log('Yes, It\'s null', cid) :
  //   console.log('No, It\'s not null', cid))
  // console.log('>>> ', dispatch(checkPasswordStatusRequest(cid)))
  // generate here!
  // dispatch(generatePassword(cid)),


  // query to store new password
  // and set new remaining time
  // dispatch(isUsablePasswordExist(cid)),
  // show password here
  // dispatch(openModal(modalNames.SHOW_PASSWORD), { cid }) `\n then ),`

  // add Grade function
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchRecruitment } = this.props;
      fetchRecruitment();
    }
  })
);

export default enhance(RecruitmentPage);
