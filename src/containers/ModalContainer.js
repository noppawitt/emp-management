import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as modalNames from '../constants/modalNames';
import EditGeneralProfileModal from './modals/EditGeneralProfileModal';
import EditWorkProfileModal from './modals/EditWorkProfileModal';
import CreateEmployeeModal from './modals/CreateEmployeeModal';

const ModalContainer = ({ name }) => {
  switch (name) {
    case modalNames.EDIT_GENERAL_PROFILE:
      return <EditGeneralProfileModal />;
    case modalNames.EDIT_WORK_PROFILE:
      return <EditWorkProfileModal />;
    case modalNames.CREATE_EMPLOYEE:
      return <CreateEmployeeModal />;
    default:
      return <div />;
  }
};

ModalContainer.defaultProps = {
  name: null
};

ModalContainer.propTypes = {
  name: PropTypes.string
};

const mapStateToProps = state => ({
  name: state.modal.name
});

export default connect(mapStateToProps)(ModalContainer);
