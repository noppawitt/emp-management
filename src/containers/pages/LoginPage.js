import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Form, Button, Feed, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { loginRequest } from '../../actions/auth';
import image from '../../images/Timesheet_Home.jpg';
import TelIcon from '../../images/TelIcon.jpg';
import MailIcon from '../../images/MailIcon.jpg';
import GPSIcon from '../../images/GPSIcon.jpg';

const LoginPage = ({ dispatch }) => {
  let username;
  let password;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest({
      username: username.value,
      password: password.value
    }));
    username.value = '';
    password.value = '';
  };

  const style = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    position: 'fixed',
    minHeight: '100%',
    width: '100%'
  };

  return (
    <div style={style}>
      <Grid padded columns={3} textAlign="center">
        <Grid.Row >
          <Grid.Column floated="right" style={{ paddingTop: '20%', paddingRight: '10%' }}>
            <Form onSubmit={handleSubmit}>
              <Form.Field >
                <label htmlFor="username">Username
                  <input style={{ borderRadius: '15px' }} id="username" placeholder="Username" ref={(node) => { username = node; }} />
                </label>
              </Form.Field>
              <Form.Field>
                <label htmlFor="password">Password
                  <input style={{ borderRadius: '15px' }} id="password" type="password" placeholder="Password" ref={(node) => { password = node; }} />
                </label>
              </Form.Field>
              <Button primary type="submit">Submit</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row >
          <Grid.Column floated="left" style={{ paddingTop: '2%', paddingLeft: '3%' }}>
            <Feed size="large">
              <Feed.Event>
                <Feed.Label>
                  <Image src={TelIcon} />
                </Feed.Label>
                <Feed.Content>
                  <p style={{ color: 'white' }}><b>+66(0)2-812-7877</b></p>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Label>
                  <Image src={MailIcon} />
                </Feed.Label>
                <Feed.Content>
                  <p style={{ color: 'white' }}><b>play@playtorium.co.th</b></p>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Label>
                  <Image src={GPSIcon} />
                </Feed.Label>
                <Feed.Content>
                  <p style={{ color: 'white' }}><b>349,SJ Infinite One Business Complex,<br />11th Floor,Vibhavadi-Rangsit Road,<br />Chompol, Chatuchak, Bangkok 10900</b></p>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(LoginPage);
