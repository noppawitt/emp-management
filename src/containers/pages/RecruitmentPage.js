import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {
  fetchRecruitmentRequest,
  yearFilterRecruitment,
  monthFilterRecruitment
} from '../../actions/recruitment';
import Recruitment from '../../components/Recruitment';
import Loader from '../../components/Loader';
import { getVisibleRecruitment } from '../../selectors/recruitment';

const RecruitmentPage = ({ isFetching, recruitments, onYearChange, onMonthChange }) => (
  <div>
    {isFetching ?
      <Loader /> :
      <Recruitment
        recruitments={recruitments}
        onYearChange={onYearChange}
        onMonthChange={onMonthChange}
      />}
  </div>
);

RecruitmentPage.defaultProps = {
  isFetching: true
};

RecruitmentPage.propTypes = {
  isFetching: PropTypes.bool,
  recruitments: PropTypes.array.isRequired,
  onYearChange: PropTypes.func.isRequired,
  onMonthChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.recruitment.isFetching,
  recruitments: getVisibleRecruitment(state)
});

const mapDispatchToProps = dispatch => ({
  fetchRecruitment: () => dispatch(fetchRecruitmentRequest()),
  onYearChange: e => dispatch(yearFilterRecruitment(e.target.value)),
  onMonthChange: e => dispatch(monthFilterRecruitment(e.target.value))
  // add 'Start evaluate' function
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
