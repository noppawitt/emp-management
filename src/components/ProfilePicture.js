import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import { Image } from 'semantic-ui-react';

const ProfilePicture = ({ image, onMouseEnter, onMouseLeave, onClick }) => (
  <Image src={image} size="small" centered bordered onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
);

ProfilePicture.propTypes = {
  image: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

const enhance = compose(
  withState('isHover', 'setHover', false),
  withHandlers({
    onMouseEnter: props => () => props.setHover(true),
    onMouseLeave: props => () => props.setHover(false)
  })
);

export default enhance(ProfilePicture);
