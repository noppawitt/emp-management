import React from 'react';
// import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';
// import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SideNav from 'react-sidenav';
// import logo from '../images/vertical-logo.png';

const ExamSlideBar = () => (
  <div>
    <SideNav highlightColor="#E91E63" highlightBgColor="#00bcd4" defaultSelected="sales">
      <Container>
        <Menu.Item as={NavLink} to="/examlogin" name="login">
          Login
        </Menu.Item>
        <Menu.Item as={Link} to="/preparetoexam" name="prepare">
          Prepare
        </Menu.Item>
      </Container>
    </SideNav>
  </div>
);

// ExamNavBar.propTypes = {
//   userid: PropTypes.string.isRequired,
//   onLogout: PropTypes.func.isRequired,
// };

export default ExamSlideBar;
