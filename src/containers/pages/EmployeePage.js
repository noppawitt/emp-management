import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Employee from '../../components/Employee';
import { fetchEmployeeRequest } from '../../actions/employee';

const EmployeePage = () => (
  <Employee />
);

const mapDispatchToProps = dispatch => ({
  fetchEmployee: () => dispatch(fetchEmployeeRequest())
});

const enhance = compose(
  connect(null, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchEmployee } = this.props;
      fetchEmployee();
    }
  })
);

export default enhance(EmployeePage);
