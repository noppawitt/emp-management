import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal as SUIModal, Table, Button } from 'semantic-ui-react';
import { closeModal } from '../../actions/modal';
import { pageChange } from '../../actions/takeExam';

const showStatus = (answer, number, onPageChange, onClose) => {
  console.log('test');
  console.log(JSON.parse(answer));
  if (JSON.parse(answer).answer === '') {
    return (
      <div style={{ padding: '2px' }}>
        <Button style={{ width: '100%', textAlign: 'left' }} onClick={() => { onPageChange(number); onClose(); }}>
          <div>Question {number} : <span style={{ color: 'red' }}>Not Answer</span></div>
        </Button>
      </div>
    );
  }
  return (
    <div style={{ padding: '2px' }}>
      <Button style={{ width: '100%', textAlign: 'left' }}>
        <div>Question {number} : <span style={{ color: 'green' }}>Has Answer</span></div>
      </Button>
    </div>
  );
};

const showAllStatus = (examProgress, onPageChange, onClose) => {
  const allStatus = [];
  for (let i = 0; i < Math.ceil(examProgress.answerList.length / 10); i += 1) {
    allStatus.push(<Table.Cell>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(j => (
        examProgress.answerList[(i * 10) + j]
        && showStatus(examProgress.answerList[(i * 10)], (i * 10) + j + 1, onPageChange, onClose)))}
    </Table.Cell>);
  }
  return allStatus;
};

const ExamProgressModal = ({ onClose, examProgress, onPageChange }) => (
  <SUIModal
    dimmer="blurring"
    size={(examProgress.answerList.length / 10 <= 2) ? 'tiny' : ((examProgress.answerList.length / 10 <= 3) ? 'small' : 'large')}
    closeIcon
    open
    onClose={onClose}
  >
    {/* <SUIModal.Header>
      {examProgress.category.charAt(0).toUpperCase().concat(examProgress.category.slice(1)).concat(' : Status')}
    </SUIModal.Header> */}
    <SUIModal.Content>
      <Table celled>
        <Table.Row verticalAlign="top">
          {showAllStatus(examProgress, onPageChange, onClose)}
        </Table.Row>
      </Table>
    </SUIModal.Content>
  </SUIModal >
);

ExamProgressModal.propTypes = {
  examProgress: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onPageChange: value => dispatch(pageChange(value))
});

export default connect(null, mapDispatchToProps)(ExamProgressModal);
