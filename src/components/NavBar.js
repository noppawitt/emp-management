import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';

const Navbar = ({ auth, onLogout }) => (
  <Menu size="huge">
    <Menu.Item as={NavLink} to="/timesheet" name="timesheet">
      Timesheet
    </Menu.Item>
    <Menu.Item as={NavLink} to="/leave-request" name="leaveRequest">
      Leave Request
    </Menu.Item>
    <Menu.Item as={NavLink} to="/project" name="project">
      Project
    </Menu.Item>
    <Menu.Item as={NavLink} to="/report" name="report">
      Report
    </Menu.Item>
    <Menu.Menu position="right">
      <Dropdown item text={auth.username}>
        <Dropdown.Menu>
          <Dropdown.Item text="Profile" as={Link} to="/profile" />
          <Dropdown.Item text="Log out" onClick={onLogout} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);

Navbar.propTypes = {
  auth: PropTypes.shape({
    isFetching: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    id: PropTypes.number,
    username: PropTypes.string,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
