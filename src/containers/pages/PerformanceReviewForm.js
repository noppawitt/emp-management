import React from 'react';
import './css/PerformanceReviewForm.css';
import ScoreManager from './components/ScoreTableManager';
import EmployeeInfo from './components/EmployeeInfoComponent';
import SignatureComponent from './components/SignatureComponent';
import SupervisorCommentComponent from './components/SupervisorCommentComponent';

const questions = ['ความรู้ในงานและการพัฒนาตัวเอง (Knowledge and Improvement)',
    'คุณภาพงาน (Quality of Work)',
    'ปริมาณงาน (Quantity of Work)',
    'การทำงานร่วมกับผู้อื่น (Co-operation with Colleagues)',
    'การปฏิบัติตาม Playtorium Culture',
    'ความสามารถทางด้านภาษาอังกฤษ (TOEIC)',
    'ประกาศนียบัตรตามสายงาน (Certificate)'];

class PerformanceReviewForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "_name",
            department: '_department',
            position: '_position',
            employeeID: '_employeeID',
            level: '_level',
            startDate: '_startDate',
            supervisor: '_supervisor',
            expectedScore: [3, 3, 3, 3, 3, 3, 3],
            score: [3, 3, 3, 3, 3, 3, 3],
        };
    }

    render() {
        return (
            <div className='main-container'>
                <div className='profile'>
                    <h1>Employee Performance Review Form</h1>
                    <h2>Playtorium Solutions Company Limited</h2>
                </div>
                <EmployeeInfo {...this.state} />
                <br />
                <div>
                    <ScoreManager questions={questions} numOfQuestion={5} weight={[20, 20, 20, 20, 20]} score={this.state.score} />
                </div>
                <br />
                <SupervisorCommentComponent />
                <br />
                <SignatureComponent />
            </div>
        );
    }
}
export default PerformanceReviewForm;