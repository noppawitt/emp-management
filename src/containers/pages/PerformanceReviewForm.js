import React from 'react';
import './css/PerformanceReviewForm.css';
import ScoreManager from './ScoreTableManager';

const EmployeeInfo = (info) => {
    return (
        <div className='info-container'>
            <table>
                <tr>
                    <td>Name:</td>
                    <td>{info.name}</td>
                    <td>Department:</td>
                    <td>{info.department}</td>
                </tr>
                <tr>
                    <td>Position:</td>
                    <td>{info.position}</td>
                    <td>EmployeeID:</td>
                    <td>{info.employeeID}</td>
                </tr>
                <tr>
                    <td>Level:</td>
                    <td>{info.level}</td>
                    <td>Start Date</td>
                    <td>{info.startDate}</td>
                </tr>
                <tr>
                    <td>Supervisor:</td>
                    <td>{info.supervisor}</td>
                </tr>
            </table>
        </div>
    );
};

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
                <h1>Employee Performance Review Form</h1>
                <h2>Playtorium Solutions Company Limited</h2>
                <EmployeeInfo {...this.state} />
                <h2>Performance Appraisal Portion</h2>
                <ScoreManager questions={questions} numOfQuestion={5} weight={[20, 20, 20, 20, 20]} score={[1, 2, 3, 4, 5]} />
            </div>
        );
    }
}
export default PerformanceReviewForm;