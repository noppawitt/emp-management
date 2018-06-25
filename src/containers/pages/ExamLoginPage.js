import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { examLoginRequest } from '../../actions/examAuth';

const ExamLoginPage = ({ dispatch }) => {
  let userid;
  let password;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(examLoginRequest({
      userid: userid.value,
      password: password.value,
    }));
    userid.value = '';
    password.value = '';
  };

  return (
    <div>
      <Grid.Column floated="center">
        <Segment four wide center style={{ width: '300px' }}>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <br />
              <label htmlFor="username">
                <input
                  id="username"
                  placeholder="Username"
                  style={{ borderRadius: '15px' }}
                  ref={(node) => { userid = node; }}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="password">
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  style={{ borderRadius: '15px' }}
                  ref={(node) => { password = node; }}
                />
              </label>
              <br />
              <Button primary type="submit">Submit</Button>
            </Form.Field>
          </Form>
        </Segment>
      </Grid.Column>
    </div>
  );
};

ExamLoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(ExamLoginPage);
