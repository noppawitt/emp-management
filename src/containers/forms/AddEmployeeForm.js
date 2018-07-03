import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm, change } from 'redux-form';
import { Form } from 'semantic-ui-react';
import moment from 'moment';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';
import { masterTableToOptions } from '../../utils/helper';

const validate = (values) => {
  const errors = {};
  errors.startDate = validator.required(values.startDate);
  errors.endDate = validator.required(values.endDate);
  return errors;
};

const genderOptions = [
  { key: 'male', value: 'Male', text: 'Male' },
  { key: 'female', value: 'Female', text: 'Female' }
];

const engineerOptions = [
  { key: 'engineer', value: true, text: 'Engineer' },
  { key: 'non-engineer', value: false, text: 'Non-Engineer' }
];

const AddEmployeeForm = ({ handleSubmit, submitting, masterTable, setDefaultProbationDate }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="type" as={Form.Select} component={Input} label="User type" placeholder="User type" options={masterTableToOptions(masterTable.accessTypes)} disabled={submitting} />
    <Form.Group widths="equal">
      <Field name="firstName" as={Form.Input} component={Input} label="First name" placeholder="First name" disabled={submitting} />
      <Field name="lastName" as={Form.Input} component={Input} label="Last name" placeholder="Last name" disabled={submitting} />
    </Form.Group>
    <Field name="username" as={Form.Input} component={Input} label="Username" placeholder="Username" disabled={submitting} />
    <Field name="citizenId" as={Form.Input} component={Input} label="Citizen ID" placeholder="Citizen ID" disabled={submitting} />
    <Field name="gender" as={Form.Select} component={Input} label="Gender" placeholder="Gender" options={genderOptions} disabled={submitting} />
    <Field name="levelId" as={Form.Select} component={Input} label="Level" placeholder="Level" options={masterTableToOptions(masterTable.levels)} disabled={submitting} />
    <Field name="departmentId" as={Form.Select} component={Input} label="Department" placeholder="Department" options={masterTableToOptions(masterTable.departments)} disabled={submitting} />
    <Field name="engineer" as={Form.Select} component={Input} label="Engineer" placeholder="Engineer" options={engineerOptions} disabled={submitting} />
    <Field name="startDate" as={Form.Input} component={Input} type="date" label="Start date" placeholder="Start date" onChange={(e, newValue) => setDefaultProbationDate(newValue)} disabled={submitting} />
    <Field name="probationDate" as={Form.Input} component={Input} type="date" label="Probation date" placeholder="Probation date" disabled={submitting} />
  </Form>
);

AddEmployeeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  masterTable: PropTypes.object.isRequired,
  setDefaultProbationDate: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  masterTable: state.masterTable
});

const mapDispatchToProps = dispatch => ({
  setDefaultProbationDate: startDate => dispatch(change('addEmployee', 'probationDate', moment(startDate).add(120, 'days').format('YYYY-MM-DD')))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'addEmployee',
    validate
  })
);

export default enhance(AddEmployeeForm);
