import React from 'react';
import './css/PerformanceReviewForm.css';
import { Dropdown } from 'semantic-ui-react'

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

const EvaluationTable = (score) => {
    const questions = ['ความรู้ในงานและการพัฒนาตัวเอง (Knowledge and Improvement)',
        'คุณภาพงาน (Quality of Work)',
        'ปริมาณงาน (Quantity of Work)',
        'การทำงานร่วมกับผู้อื่น (Co-operation with Colleagues)',
        'การปฏิบัติตาม Playtorium Culture',
        'ความสามารถทางด้านภาษาอังกฤษ (TOEIC)',
        'ประกาศนียบัตรตามสายงาน (Certificate)'];
    const weight = ['15.0%', '15.0%', '15.0%', '15.0%', '15.0%', '15.0%', '15.0%'];
    const select = [{ value: '1', text: '1' },
    { value: '2', text: '2' },
    { value: '3', text: '3' },
    { value: '4', text: '4' },
    { value: '5', text: '5' },];

    return (
        <div className='eva-table'>
            <table>
                <tr>
                    <th>No.</th>
                    <th>Appraisal Criteria</th>
                    <th>Score</th>
                    <th>Total Average</th>
                    <th>Weight</th>
                    <th>Total Point</th>
                </tr>
                {questions.map((question, index) => (
                    <tr>
                        <td>{index}</td>
                        <td>{question}</td>
                        <td><Dropdown placeholder='Select Friend' fluid selection options={select} /></td>
                        <td><Dropdown placeholder='Select Friend' fluid selection options={select} /></td>
                        <td>{weight[index]}</td>
                        <td>9%</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

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
                <EvaluationTable {...this.state} />
            </div>
        );
    }
}
export default PerformanceReviewForm;