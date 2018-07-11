import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { closeModal } from '../../actions/modal';
import {
  activatePasswordRequest,
  updateLifetimesValue,
  updateLifetimesUnit,
  randomExam,
} from '../../actions/recruitment';
import DisplayField from '../forms/DisplayField';
import ExamModal from '../../components/ExamModal';

const ActivateUserModal = ({
  onClose,
  onClickActivate,
  passwordObject,
  isFetching,
  userStatus,
  userStatusCode,
  onLifetimesValueChange,
  onLifetimesUnitChange,
  lifetimesValue,
  lifetimesUnit }) =>
  (
    <ExamModal
      header="Activate Candidate User"
      isFetching={isFetching}
      onClose={onClose}
      onClickActivate={onClickActivate}
      passwordObject={passwordObject}
      onLifetimesValueChange={onLifetimesValueChange}
      onLifetimesUnitChange={onLifetimesUnitChange}
      lifetimesValue={lifetimesValue}
      lifetimesUnit={lifetimesUnit}
    >
      <DisplayField
        isFetching={isFetching}
        passwordObject={passwordObject}
        userStatus={userStatus}
        userStatusCode={userStatusCode}
      />
    </ExamModal>
  );

ActivateUserModal.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onClickActivate: PropTypes.func.isRequired,
  passwordObject: PropTypes.object.isRequired,
  userStatus: PropTypes.string.isRequired,
  userStatusCode: PropTypes.string.isRequired,
  onLifetimesValueChange: PropTypes.func.isRequired,
  onLifetimesUnitChange: PropTypes.func.isRequired,
  lifetimesValue: PropTypes.string.isRequired,
  lifetimesUnit: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  passwordObject: state.recruitment.passwordObject,
  isFetching: state.recruitment.isModalFetching,
  userStatus: state.recruitment.userStatus,
  userStatusCode: state.recruitment.userStatusCode,
  lifetimesValue: state.recruitment.lifetimesValue,
  lifetimesUnit: state.recruitment.lifetimesUnit,
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onClickActivate: (id, activationLifetimes) => compose(
    dispatch(activatePasswordRequest(id, activationLifetimes)),
    dispatch(randomExam(id)),
  ),
  onLifetimesValueChange: e => dispatch(updateLifetimesValue(e.target.value)),
  onLifetimesUnitChange: unit => dispatch(updateLifetimesUnit(unit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivateUserModal);
