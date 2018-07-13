import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
<<<<<<< HEAD
import { fetchProjectDetailRequest } from '../../actions/projectDetail';
=======
import { fetchProjectDetailRequest, deleteMemberRequest } from '../../actions/projectDetail';
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
import Loader from '../../components/Loader';
import ProjectDetail from '../../components/ProjectDetail';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';

<<<<<<< HEAD
const ProjectDetailPage = ({ isFetching, projectDetail, onEditClick, onAddMemberClick }) => (
  <div>
    {isFetching ? <Loader /> : <ProjectDetail projectDetail={projectDetail} onEditClick={onEditClick} onAddMemberClick={onAddMemberClick} />}
=======
const ProjectDetailPage = ({ isFetching, projectDetail, onEditClick, onAddMemberClick, onDeleteMemberClick }) => (
  <div>
    {isFetching ? <Loader /> : <ProjectDetail projectDetail={projectDetail} onEditClick={onEditClick} onAddMemberClick={onAddMemberClick} onDeleteMemberClick={onDeleteMemberClick} />}
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
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
<<<<<<< HEAD
  onAddMemberClick: PropTypes.func.isRequired
=======
  onAddMemberClick: PropTypes.func.isRequired,
  onDeleteMemberClick: PropTypes.func.isRequired
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
};

const mapStateToProps = state => ({
  isFetching: state.projectDetail.isFetching,
  projectDetail: state.projectDetail
});

const mapDispatchToProps = dispatch => ({
  fetchProjectDetail: projectId => dispatch(fetchProjectDetailRequest(projectId)),
  onEditClick: projectDetail => dispatch(openModal(modalNames.EDIT_PROJECT, { projectDetail })),
<<<<<<< HEAD
  onAddMemberClick: projectId => dispatch(openModal(modalNames.ADD_MEMBER, { projectId }))
=======
  onAddMemberClick: projectId => dispatch(openModal(modalNames.ADD_MEMBER, { projectId })),
  onDeleteMemberClick: (userId, projectId) => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this member?',
    onConfirm: () => dispatch(deleteMemberRequest(userId, projectId))
  }))
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
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
