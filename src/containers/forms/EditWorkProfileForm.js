import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
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

const EditWorkProfileForm = ({ masterTable, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="departmentId" as={Form.Select} component={Input} label="Department" placeholder="Department" options={masterTableToOptions(masterTable)} />
    <Form.Group widths="equal">
      <Field name="startDate" as={Form.Input} component={Input} type="date" label="Start date" placeholder="Start date" />
      <Field name="endDate" as={Form.Input} component={Input} type="date" label="End date" placeholder="End date" />
    </Form.Group>
  </Form>
);

EditWorkProfileForm.propTypes = {
  masterTable: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  initialValues: {
    userId: state.profile.userId,
    departmentId: state.profile.departmentId,
    positionId: state.profile.positionId,
    levelId: state.profile.levelId,
    contractId: state.profile.contractId,
    startDate: moment(state.profile.startDate).format('YYYY-MM-DD'),
    endDate: moment(state.profile.endDate).format('YYYY-MM-DD'),
    probationDate: moment(state.profile.probationDate).format('YYYY-MM-DD')
  }
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'editWorkProfile',
    validate
  })
);

export default enhance(EditWorkProfileForm);
