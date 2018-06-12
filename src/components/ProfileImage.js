import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState, withHandlers } from 'recompose';
import { Image, Icon } from 'semantic-ui-react';

const wrapper = {
  position: 'relative',
  width: '150px',
  marginLeft: 'auto',
  marginRight: 'auto'
};

const overlay = {
  position: 'absolute',
  top: '75%',
  bottom: '0%',
  left: '0%',
  right: '0%',
  height: '25%',
  width: '100%',
  zIndex: '2', 
  opacity: '0.75',
  backgroundColor: 'black'

};

const ProfileImage = ({ image, isHover, onMouseEnter, onMouseLeave }) => (
  <div style={wrapper}>
    {isHover && <div style={overlay}><Icon style={{ position: 'absolute', color: 'white', zIndex: '2', width: '100%', marginTop: '10px'}} name="photo">&nbsp; Edit Profile</Icon></div>}
    <Image style={{ display: 'block' }} src={image} size="small" centered onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
  </div>
);

ProfileImage.propTypes = {
  image: PropTypes.string.isRequired,
  isHover: PropTypes.bool.isRequired,
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
