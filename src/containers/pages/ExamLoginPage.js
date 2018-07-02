import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { examLoginRequest } from '../../actions/examAuth';

const ExamLoginPage = ({ dispatch }) => {
  let id;
  let password;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(examLoginRequest({
      id: id.value,
      password: password.value,
    }));
    id.value = '';
    password.value = '';
  };

  return (
    <div>
      {console.log('exam login page')}
      <Grid.Column>
        <Segment four wide center style={{ width: '300px' }}>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <br />
              <label htmlFor="username">
                <input
                  id="username"
                  placeholder="Username"
                  style={{ borderRadius: '15px' }}
                  ref={(node) => { id = node; }}
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
