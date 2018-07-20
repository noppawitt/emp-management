import React from 'react';
import PropTypes from 'prop-types';
import { withState } from 'recompose';
import { Button } from 'semantic-ui-react';

const UploadFile = ({ onUploadSubmit, file, setFile, args }) => (
  <div>
    <input type="file" onChange={e => setFile(e.target.files[0])} />
    <Button onClick={() => onUploadSubmit(file, ...args)}>Upload</Button>
  </div>
);

UploadFile.defaultProps = {
  args: []
};

UploadFile.propTypes = {
  onUploadSubmit: PropTypes.func.isRequired,
  file: PropTypes.any.isRequired,
  setFile: PropTypes.func.isRequired,
  args: PropTypes.array
};

export default withState('file', 'setFile', null)(UploadFile);
