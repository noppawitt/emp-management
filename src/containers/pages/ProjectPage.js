import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchProjectRequest } from '../../actions/project';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import Project from '../../components/Project';

const ProjectPage = ({ onAddClick }) => (
  <Project onAddClick={onAddClick} />
);

ProjectPage.propTypes = {
  onAddClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  projects: state.project.lists
});

const mapDispatchToProps = dispatch => ({
  fetchProject: id => dispatch(fetchProjectRequest(id)),
  onAddClick: () => dispatch(openModal(modalNames.ADD_PROJECT))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchProject } = this.props;
      fetchProject(10001);
    }
  })
);

export default enhance(ProjectPage);
