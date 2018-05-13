import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../../components/Input';
import { masterTableToOptions } from '../../../utils/helper';

const SecondPage = ({ masterTable, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="levelId" as={Form.Select} component={Input} label="Level" placeholder="Level" options={masterTableToOptions(masterTable.levels)} />
    <Field name="departmentId" as={Form.Select} component={Input} label="Department" placeholder="Department" options={masterTableToOptions(masterTable.departments)} />
    <Field name="positionId" as={Form.Select} component={Input} label="Position" placeholder="Position" options={masterTableToOptions(masterTable.positions)} />
    <Field name="contractId" as={Form.Select} component={Input} label="Contract" placeholder="Contract" options={masterTableToOptions(masterTable.contracts)} />
    <Form.Group widths="equal">
      <Field name="startDate" as={Form.Input} component={Input} type="date" label="Start date" placeholder="Start date" />
      <Field name="endDate" as={Form.Input} component={Input} type="date" label="End date" placeholder="End date" />
    </Form.Group>
    <Field name="probationDate" as={Form.Input} component={Input} type="date" label="Probation date" placeholder="Probation date" />
  </Form>
);

SecondPage.propTypes = {
  masterTable: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'createEmployee',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(SecondPage);
