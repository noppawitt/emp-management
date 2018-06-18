import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchEmployeeRequest } from '../../actions/employee';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import Exam from '../../components/Exam';
import Loader from '../../components/Loader';

const ExamPage = ({ isFetching, onClick }) => (
  <div>
    {isFetching ? <Loader /> : <Exam onClick={onClick} />}
  </div>
);

ExamPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.employee.isFetching
});
const mapDispatchToProps = dispatch => ({
  fetchEmployee: () => dispatch(fetchEmployeeRequest()),
  onClick: () => dispatch(openModal(modalNames.ADD_NEW_EXAM))
});
const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchEmployee } = this.props;
      fetchEmployee();
    }
  })
);
export default enhance(ExamPage);

