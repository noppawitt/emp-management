import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
// import { fetchExamListRequest } from '../../actions/prepareToExam';
import Agreement from '../../components/Agreement';

const AgreementPage = () => (
  <Agreement />
);

AgreementPage.propType = {
  // validate type here
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
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

export default enhance(AgreementPage);
