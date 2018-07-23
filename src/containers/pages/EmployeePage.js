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

const EmployeePage = ({ isFetching, employees, onChange, onClick, masterTable, onDepartmentChange }) => (
  <div>
    {isFetching ? <Loader /> : <Employee employees={employees} onChange={onChange} onClick={onClick} masterTable={masterTable} onDepartmentChange={onDepartmentChange} />}
  </div>
);

EmployeePage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  employees: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  masterTable: PropTypes.object.isRequired,
  onDepartmentChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.employee.isFetching,
  masterTable: state.masterTable,
  employees: getFilteredEmployee(state.employee.lists, state.employee.filter, state.employee.department)
});

const mapDispatchToProps = dispatch => ({
  fetchEmployee: () => dispatch(fetchEmployeeRequest()),
  onClick: () => dispatch(openModal(modalNames.ADD_EMPLOYEE)),
  onChange: e => dispatch(filterEmployee(e.target.value)),
  onDepartmentChange: e => dispatch(filterDepartment(e.target.value))
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
