import React from 'react';
import PropTypes from 'prop-types';

const ProjectDetail = ({ projectDetail }) => (
  <div>
    {projectDetail.name}
  </div>
);

ProjectDetail.propTypes = {
  projectDetail: PropTypes.object.isRequired,
};

export default ProjectDetail;
