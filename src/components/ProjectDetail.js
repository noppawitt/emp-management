import React from 'react';
import PropTypes from 'prop-types';

const ProjectDetail = ({ match: { params } }) => (
  <div>
    {params.id}
  </div>
);

ProjectDetail.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ProjectDetail;
