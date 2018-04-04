import React from 'react';
import PropTypes from 'prop-types';
import { Header as SUIHeader, Icon, Divider } from 'semantic-ui-react';

const Header = ({ text, icon }) => (
  <div>
    <SUIHeader as="h1">
      <Icon name={icon} />
      {text}
    </SUIHeader>
    <Divider />
  </div>
);

Header.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default Header;
