import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchProjectRequest } from '../../actions/project';
import Project from '../../components/Project';

const ProjectPage = () => (
  <Project />
);

const mapDispatchToProps = dispatch => ({
  fetchProject: id => dispatch(fetchProjectRequest(id))
});

const enhance = compose(
  connect(null, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchProject } = this.props;
      fetchProject(10001);
    }
  })
);

export default enhance(ProjectPage);
