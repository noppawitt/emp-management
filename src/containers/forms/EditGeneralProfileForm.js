import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';
import { updateProfileRequest } from '../../actions/profile';

const validate = (values) => {
  const errors = {};
  errors.firstName = validator.required(values.firstName);
  errors.lastName = validator.required(values.lastName);
  errors.email = validator.email(values.email);
  return errors;
};

const EditGeneralProfileForm = ({ handleSubmit, updateProfile }) => (
  <Form onSubmit={handleSubmit((values) => { updateProfile(1, values); })}>
    <Form.Group widths="equal">
      <Field name="firstName" component={Input} label="First name" placeholder="First name" />
      <Field name="lastName" component={Input} label="Last name" placeholder="Last name" />
    </Form.Group>
    <Field name="nickName" component={Input} label="Nick name" placeholder="Nick name" />
    <Field name="citizenId" component={Input} label="Citizen ID" placeholder="Citizen ID" />
    <Field name="mobileNumber" component={Input} label="Mobile No." placeholder="Mobile No." />
    <Field name="email" component={Input} label="Email" placeholder="Email" />
    <Field name="facebookId" component={Input} label="Facebook" placeholder="Facebook" />
    <Field name="lineId" component={Input} label="Line ID" placeholder="Line ID" />
    <input type="submit" />
  </Form>
);

EditGeneralProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  initialValues: state.profile
});

const mapDispatchToProps = dispatch => ({
  updateProfile: (id, form) => dispatch(updateProfileRequest(id, form))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'editGeneralProfile',
    validate
  })
);

export default enhance(EditGeneralProfileForm);
