import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchProjectRequest, filterProject, sortProject, changeProjectPage, changeHasPoNumber } from '../../actions/project';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import Project from '../../components/Project';
import Loader from '../../components/Loader';
import { getVisibleProjects, getTotalPages } from '../../selectors/project';

const ProjectPage = ({
  isFetching,
  projects,
  onAddClick,
  onSearchChange,
  sortKey,
  direction,
  sortByKey,
  currentPage,
  totalPages,
  handlePageChange,
  handleHasPoNumberChange
}) => {
  const handleSort = (key) => {
    if (sortKey !== key) {
      sortByKey(key, 'ascending');
    }
    else {
      sortByKey(key, direction === 'ascending' ? 'descending' : 'ascending');
    }
  };
  return (
    <div>
      {isFetching ?
        <Loader /> :
        <Project
          projects={projects}
          onAddClick={onAddClick}
          onSearchChange={onSearchChange}
          sortKey={sortKey}
          direction={direction}
          handleSort={handleSort}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handleHasPoNumberChange={handleHasPoNumberChange}
        />}
    </div>
  );
};

ProjectPage.defaultProps = {
  isFetching: true
};

ProjectPage.propTypes = {
  isFetching: PropTypes.bool,
  projects: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  sortByKey: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleHasPoNumberChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.project.isFetching,
  projects: getVisibleProjects(state),
  sortKey: state.project.sortKey,
  direction: state.project.direction,
  currentPage: state.project.currentPage,
  totalPages: getTotalPages(state)
});

const mapDispatchToProps = dispatch => ({
  fetchProject: id => dispatch(fetchProjectRequest(id)),
  onAddClick: () => dispatch(openModal(modalNames.ADD_PROJECT)),
  onSearchChange: e => dispatch(filterProject(e.target.value)),
  sortByKey: (key, direction) => dispatch(sortProject(key, direction)),
  handlePageChange: (e, { activePage }) => dispatch(changeProjectPage(activePage)),
  handleHasPoNumberChange: (e, { checked }) => dispatch(changeHasPoNumber(checked))
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
