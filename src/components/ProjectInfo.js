import React from 'react';
import PropTypes from 'prop-types';

const ProjectInfo = ({ match: { params } }) => (
  <div>
    {params.id}
  </div>
);

ProjectInfo.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ProjectInfo;
