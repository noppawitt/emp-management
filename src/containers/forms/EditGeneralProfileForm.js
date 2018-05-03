import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';

const validate = (values) => {
  const errors = {};
  errors.firstName = validator.required(values.firstName);
  errors.lastName = validator.required(values.lastName);
  errors.email = validator.email(values.email);
  return errors;
};

const EditGeneralProfileForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group widths="equal">
      <Field name="firstName" component={Input} as={Form.Input} type="text" label="First name" placeholder="First name" />
      <Field name="lastName" component={Input} as={Form.Input} type="text" label="Last name" placeholder="Last name" />
    </Form.Group>
    <Form.Group widths="equal">
      <Field name="firstNameTh" component={Input} as={Form.Input} type="text" label="ชื่อ" placeholder="ชื่อ" />
      <Field name="lastNameTh" component={Input} as={Form.Input} type="text" label="นามสกุล" placeholder="นามสกุล" />
    </Form.Group>
    <Field name="nickName" component={Input} as={Form.Input} type="text" label="Nick name" placeholder="Nick name" />
    <Field name="birthday" component={Input} as={Form.Input} type="date" label="Birth date" placeholder="Birth date" />
    <Field name="citizenId" component={Input} as={Form.Input} type="text" label="Citizen ID" placeholder="Citizen ID" />
    <Field name="mobileNumber" component={Input} as={Form.Input} type="text" label="Mobile No." placeholder="Mobile No." />
    <Field name="email" component={Input} as={Form.Input} type="text" label="Email" placeholder="Email" />
    <Field name="facebookId" component={Input} as={Form.Input} type="text" label="Facebook" placeholder="Facebook" />
    <Field name="lineId" component={Input} as={Form.Input} type="text" label="Line ID" placeholder="Line ID" />
    <Field name="address" component={Input} as={Form.Input} type="text" label="Address" placeholder="Address" />
  </Form>
);

EditGeneralProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  initialValues: {
    userId: state.profile.userId,
    firstName: state.profile.firstName,
    lastName: state.profile.lastName,
    firstNameTh: state.profile.firstNameTh,
    lastNameTh: state.profile.lastNameTh,
    nickName: state.profile.nickName,
    citizenId: state.profile.citizenId,
    mobileNumber: state.profile.mobileNumber,
    email: state.profile.email,
    facebookId: state.profile.facebookId,
    lineId: state.profile.lineId,
    birthday: state.profile.birthday,
    address: state.profile.address,
    picture: state.profile.picture
  }
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'editGeneralProfile',
    validate
  })
);

export default enhance(EditGeneralProfileForm);
