import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import TakeExamAgreement from '../../components/TakeExamAgreement';
import {
  clickAccept,
  clickCheckbox,
} from '../../actions/takeExamAgreement';

const TakeExamAgreementPage = ({ onClickAccept, isAgree, onClickCheckbox }) => (
  <TakeExamAgreement
    onClickAccept={onClickAccept}
    isAgree={isAgree}
    onClickCheckbox={onClickCheckbox}
  />
);

TakeExamAgreementPage.propTypes = {
  onClickAccept: PropTypes.func.isRequired,
  isAgree: PropTypes.bool.isRequired,
  onClickCheckbox: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAgree: state.takeExamAgreement.isAgree,
});

const mapDispatchToProps = dispatch => ({
  onClickAccept: () => dispatch(clickAccept()),
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
