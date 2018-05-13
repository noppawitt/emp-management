import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';

const CreateEmployeeForm = ({ page, setPage, masterTable }) => (
  <div>
    {page === 1 && <FirstPage onSubmit={() => setPage(2)} />}
    {page === 2 && <SecondPage masterTable={masterTable} />}
  </div>
);

CreateEmployeeForm.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  masterTable: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  masterTable: state.masterTable
});

const enhance = compose(
  connect(mapStateToProps),
  withState('page', 'setPage', 1)
);

export default enhance(CreateEmployeeForm);
