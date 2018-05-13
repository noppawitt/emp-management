import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Employee from '../../components/Employee';
import { fetchEmployeeRequest } from '../../actions/employee';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import Loader from '../../components/Loader';

const EmployeePage = ({ employee, onClick }) => (
  <div>
    {employee.isFetching ?
      <Loader /> :
      <div>
        <Employee />
        <button onClick={onClick}>create user</button>
        {employee.lists.map(e => <p>{e.firstName} {e.lastName} {e.mobileNumber}</p>)}
      </div>}
  </div>
);

EmployeePage.propTypes = {
  employee: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  employee: state.employee
});

const mapDispatchToProps = dispatch => ({
  fetchEmployee: () => dispatch(fetchEmployeeRequest()),
  onClick: () => dispatch(openModal(modalNames.CREATE_EMPLOYEE))
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

export default enhance(EmployeePage);
