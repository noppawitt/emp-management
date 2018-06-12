import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import { Image, Icon } from 'semantic-ui-react';

const wrapper = {
  position: 'relative',
};

const overlay = {
  position: 'absolute',
};

const ProfileImage = ({ image, onMouseEnter, onMouseLeave }) => (
  <div style={wrapper}>
    <Image src={image} size="small" centered bordered onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
    <div style={overlay}>
      <Icon name="edit" style={{ position: 'absolute' }} />
    </div>
  </div>
);

ProfileImage.propTypes = {
  image: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired
};

const enhance = compose(
  withState('isHover', 'setHover', false),
  withHandlers({
    onMouseEnter: props => () => props.setHover(true),
    onMouseLeave: props => () => props.setHover(false)
  })
);

export default enhance(ProfileImage);
