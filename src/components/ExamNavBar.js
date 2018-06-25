import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Container, Dropdown } from 'semantic-ui-react';
// import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
// import logo from '../images/vertical-logo.png';

// const toggleSidebar = () => (
//   isSidebarVisible = !isSidebarVisible
// );

const ExamNavBar = ({ userid, onLogout }) => (
  <div>
    <Menu attached borderless inverted size="huge">
      <Container>
        <Menu.Item as={NavLink} to="/examlogin/" name="Login">
          Login (Test)
        </Menu.Item>
        <Menu.Item as={NavLink} to="/preparetoexam/" name="Prepare to Exam">
          Prepare to Exam (Test)
        </Menu.Item>
        <Menu.Item as={NavLink} to="/takeexam/" name="Take Exam">
          Take Exam (Test)
        </Menu.Item>
        <Menu.Menu position="right">
          <Dropdown item pointing text={userid}>
            <Dropdown.Menu>
              <Dropdown.Item text="Profile" as={Link} to="/profile" />
              <Dropdown.Item text="Log out" onClick={onLogout} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Container>
    </Menu>
  </div>
);

ExamNavBar.propTypes = {
  userid: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default ExamNavBar;
