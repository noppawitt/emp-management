import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Employee from '../../components/Employee';
import { fetchEmployeeRequest, filterEmployee, filterDepartment } from '../../actions/employee';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import Loader from '../../components/Loader';
import { getFilteredEmployee } from '../../selectors/employee';

const EmployeePage = ({ isFetching, employees, onChange, onClick, departments, onDepartmentChange }) => (
  <div>
    {isFetching ?
      <Loader /> :
      <Employee
        employees={employees}
        onChange={onChange}
        onClick={onClick}
        departments={departments}
        onDepartmentChange={onDepartmentChange}
      />}
  </div>
);

EmployeePage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  employees: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  departments: PropTypes.array.isRequired,
  onDepartmentChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.employee.isFetching,
  departments: state.masterTable.departments,
  employees: getFilteredEmployee(state)
});

const mapDispatchToProps = dispatch => ({
  fetchEmployee: () => dispatch(fetchEmployeeRequest()),
  onClick: () => dispatch(openModal(modalNames.ADD_EMPLOYEE)),
  onChange: e => dispatch(filterEmployee(e.target.value)),
  onDepartmentChange: (e, { value }) => dispatch(filterDepartment(value))
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
