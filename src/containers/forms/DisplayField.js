import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { compose } from 'recompose';
import { Table } from 'semantic-ui-react';
import Loader from '../../components/Loader';

const DisplayField = ({ isFetching, passwordObject, userStatus, userStatusCode }) => (
  isFetching ?
    <Loader /> :
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>User ID</Table.HeaderCell>
          <Table.HeaderCell>Password</Table.HeaderCell>
          <Table.HeaderCell>Last activated</Table.HeaderCell>
          <Table.HeaderCell>Approximately lifetimes (day)</Table.HeaderCell>
          <Table.HeaderCell>Password status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{passwordObject.id}</Table.Cell>
          <Table.Cell>{passwordObject.birthdate}</Table.Cell>
          <Table.Cell>{new Date(passwordObject.lastestActivatedPasswordTime).toDateString()}</Table.Cell>
          <Table.Cell>{passwordObject.activationLifetimes}</Table.Cell>
          <Table.Cell
            className={userStatusCode === 200 ? 'positive' : 'negative'}
            Icon={userStatusCode === 200 ? 'checkmark' : 'close'}
          >
            {userStatus.split('@@')[0]}<br />
            {userStatus.split('@@')[1]}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
);

DisplayField.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  passwordObject: PropTypes.object.isRequired,
  userStatus: PropTypes.string.isRequired,
  userStatusCode: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.recruitment.isModalFetching,
  passwordObject: state.recruitment.passwordObject,
  userStatus: state.recruitment.userStatus,
  userStatusCode: state.recruitment.userStatusCode,
});

// const mapDispatchToProps = () => ({
//   // another thing
// });

// const enhance = compose(connect(mapStateToProps, mapDispatchToProps));

export default connect(mapStateToProps)(DisplayField);
