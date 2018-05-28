import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as modalNames from '../constants/modalNames';
import EditGeneralProfileModal from './modals/EditGeneralProfileModal';
import EditWorkProfileModal from './modals/EditWorkProfileModal';
import EditEducationProfileModal from './modals/EditEducationProfileModal';
import CreateEmployeeModal from './modals/CreateEmployeeModal';
import AddEducationProfileModal from './modals/AddEducationProfileModal';
import AddProjectModal from './modals/AddProjectModal';
import CreateLeaveRequestModal from './modals/CreateLeaveRequestModal';

const ModalContainer = ({ name, props }) => {
  switch (name) {
    case modalNames.EDIT_GENERAL_PROFILE:
      return <EditGeneralProfileModal {...props} />;
    case modalNames.EDIT_WORK_PROFILE:
      return <EditWorkProfileModal {...props} />;
    case modalNames.EDIT_EDUCATION_PROFILE:
      return <EditEducationProfileModal {...props} />;
    case modalNames.CREATE_EMPLOYEE:
      return <CreateEmployeeModal {...props} />;
    case modalNames.ADD_EDUCATION_PROFILE:
      return <AddEducationProfileModal {...props} />;
    case modalNames.ADD_PROJECT:
      return <AddProjectModal {...props} />;
    case modalNames.CREATE_LEAVE_REQUEST:
      return <CreateLeaveRequestModal {...props} />;
    default:
      return <div />;
  }
};

ModalContainer.defaultProps = {
  name: null,
  props: null
};

ModalContainer.propTypes = {
  name: PropTypes.string,
  props: PropTypes.object
};

const mapStateToProps = state => ({
  name: state.modal.name,
  props: state.modal.props
});

export default connect(mapStateToProps)(ModalContainer);
