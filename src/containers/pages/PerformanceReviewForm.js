import React from 'react';
import './css/PerformanceReviewForm.css';
import ScoreManager from './ScoreTableManager';
import EmployeeInfo from './components/EmployeeInforComponent';

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
            score: [3, 3, 3, 3, 3, 3, 3]
        };
    }

    render() {
        return (
            <div className='container'>
                <div>
                    <h1>Employee Performance Review Form</h1>
                    <h2>Playtorium Solutions Company Limited</h2>
                    <EmployeeInfo {...this.state} />
                </div>
                <div>
                    <h2>Performance Appraisal Portion</h2>
                    <ScoreManager questions={questions} numOfQuestion={5} weight={[20, 20, 20, 20, 20]} score={[1, 2, 3, 4, 5]} />
                </div>
                <div>
                    <h2>Summary Comments by Supervisors:</h2>
                    <textarea className="comment"></textarea>
                </div>
            </div>
        );
    }
}
export default PerformanceReviewForm;