import { Form } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { rejectErpRequest } from '../../actions/erpapprove';
import Input from '../../components/Input';
// import { handleReduxFormSubmit } from '../../utils/helper';
// const renderTextArea = ({input, meta: { touched, error, warning }}) => (
//     <div>
//         <label>Content</label>
//         <div>
//             <textarea {...input} placeholder="Content" rows="10" cols="40"/>
//             {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
//         </div>
//     </div>
// );

const ApproveRejectForm = ({ id, onSubmit }) => (
  <Form >
    <Form.Group onSubmit={onSubmit} widths="equal" >
      <Field name="comment" as={Form.TextArea} component={Input} />
      {/* <Field name="id" as={Form.Input} component={Input} value={id} placeholeder="..." /> */}
    </Form.Group>
  </Form>
);

ApproveRejectForm.propTypes = {
  id: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  initialValues: {
    id: state.modal.stack[1].props.id
  }
});// const mapDispatchToProps = dispatch => ({
//   onClose: () => dispatch(closeModal()),
//   onClick: () => dispatch(submit('rejectApprove'))
// });

const enhance = compose(
  connect(mapStateToProps, null),
  reduxForm({
    form: 'ApproveReject'
  })
);
export default enhance(ApproveRejectForm);
