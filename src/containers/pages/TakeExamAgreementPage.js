import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import TakeExamAgreement from '../../components/TakeExamAgreement';
import {
  clickCheckbox,
} from '../../actions/takeExamAgreement';

const TakeExamAgreementPage = ({ isAgree, onClickCheckbox }) => (
  <TakeExamAgreement
    isAgree={isAgree}
    onClickCheckbox={onClickCheckbox}
  />
);

TakeExamAgreementPage.propTypes = {
  isAgree: PropTypes.bool.isRequired,
  onClickCheckbox: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAgree: state.takeExamAgreement.isAgree,
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
