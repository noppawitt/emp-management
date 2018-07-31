import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {
  fetchProjectDetailRequest,
  deleteMemberRequest,
  downloadFileRequest,
  uploadFileRequest,
  deleteFileRequest
} from '../../actions/projectDetail';
import Loader from '../../components/Loader';
import ProjectDetail from '../../components/ProjectDetail';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';

const ProjectDetailPage = ({
  isFetching,
  projectDetail,
  onEditClick,
  onAddMemberClick,
  onDeleteMemberClick,
  handleDownloadFile,
  handleUploadFile,
  handleDeleteFile
}) => (
    <div>
      {isFetching ?
        <Loader /> :
        <ProjectDetail
          projectDetail={projectDetail}
          onEditClick={onEditClick}
          onAddMemberClick={onAddMemberClick}
          onDeleteMemberClick={onDeleteMemberClick}
          handleDownloadFile={handleDownloadFile}
          handleUploadFile={handleUploadFile}
          handleDeleteFile={handleDeleteFile}
        />}
    </div>
  );

ProjectDetailPage.defaultProps = {
  isFetching: true,
  projectDetail: {}
};

ProjectDetailPage.propTypes = {
  isFetching: PropTypes.bool,
  projectDetail: PropTypes.object,
  onEditClick: PropTypes.func.isRequired,
  onAddMemberClick: PropTypes.func.isRequired,
  onDeleteMemberClick: PropTypes.func.isRequired,
  handleDownloadFile: PropTypes.func.isRequired,
  handleUploadFile: PropTypes.func.isRequired,
  handleDeleteFile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.projectDetail.isFetching,
  projectDetail: state.projectDetail
});

const mapDispatchToProps = dispatch => ({
  fetchProjectDetail: projectId => dispatch(fetchProjectDetailRequest(projectId)),
  onEditClick: projectDetail => dispatch(openModal(modalNames.EDIT_PROJECT, { projectDetail })),
  onAddMemberClick: projectId => dispatch(openModal(modalNames.ADD_MEMBER, { projectId })),
  onDeleteMemberClick: (userId, projectId) => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this member?',
    onConfirm: () => dispatch(deleteMemberRequest(userId, projectId))
  })),
  handleDownloadFile: (fileId, fileName) => dispatch(downloadFileRequest(fileId, fileName)),
  handleUploadFile: (file, projectId) => dispatch(uploadFileRequest(file, projectId)),
  handleDeleteFile: fileId => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this file?',
    onConfirm: () => dispatch(deleteFileRequest(fileId))
  }))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchProjectDetail, match: { params } } = this.props;
      fetchProjectDetail(params.id);
    }
  })
);

export default enhance(ProjectDetailPage);
