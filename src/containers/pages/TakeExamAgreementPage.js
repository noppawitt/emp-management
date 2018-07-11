import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Redirect } from 'react-router-dom';
import TakeExamAgreement from '../../components/TakeExamAgreement';
import {
  clickCheckbox,
} from '../../actions/takeExamAgreement';

const TakeExamAgreementPage = ({ isAgree, onClickCheckbox, id }) => (
  (localStorage.getItem('agree') === undefined
    || localStorage.getItem('agree') === null
    || !localStorage.getItem('agree').includes(id))
    ? <TakeExamAgreement
      isAgree={isAgree}
      onClickCheckbox={onClickCheckbox}
      id={id}
    />
    : <Redirect
      to={{
        pathname: '/takeexam'
      }}
    />
);

TakeExamAgreementPage.propTypes = {
  isAgree: PropTypes.bool.isRequired,
  onClickCheckbox: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isAgree: state.takeExamAgreement.isAgree,
  id: state.examAuth.id,
});

const mapDispatchToProps = dispatch => ({
  onClickCheckbox: value => dispatch(clickCheckbox(value)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      // edit this, maybe?
      // const { startExam } = this.props;
      // startExam();
    }
  })
);

export default enhance(TakeExamAgreementPage);
