import React from 'react';
import EmployeeInfo from './components/EmployeeInfoComponent';
import GoalComponent from './components/GoalCompanent';
import './css/SelfAssessmentForm.css'

class SelfAssessmentForm extends React.Component {

    render() {
        return (
            <div className='self-assessment-form'>
                <div>
                    <h1>Self Assessment Form</h1>
                    <h2>Playtorium Solutions Company Limited</h2>
                    <EmployeeInfo />
                </div>
                <table className='pages-contrainer'>
                    <tr>
                        {/* Page One */}
                        <td>
                            <div>
                                <table className='major-respon-table'>
                                    <tr><th className='underline'><span className='blue-text'>Major Responsibilities</span></th></tr>
                                    <tr><td><textarea></textarea></td></tr>
                                </table>
                            </div>
                            <br />
                            <div>
                                <table className='sign-accom-table'>
                                    <tr><th className='underline'><span className='blue-text'>Significant Accomplishments</span></th></tr>
                                    <tr><td><textarea></textarea></td></tr>
                                </table>
                            </div>
                            <br />
                            <div>
                                <table className='con-com-table'>
                                    <tr><th className='underline'><span className='blue-text'>Contribution/Company Activities</span></th></tr>
                                    <tr><td><textarea></textarea></td></tr>
                                </table>
                            </div>
                            <div>
                                <table className='str-improve-table'>
                                    <tr>
                                        <th colSpan='2' className='underline'><span className='blue-text'>Strengths/Improvements</span></th>
                                    </tr>
                                    {/* <tr>
                            <td>Strengths</td>
                            <td>Improvements</td>
                        </tr> */}
                                    <tr>
                                        <td><span>Strengths</span><textarea></textarea></td>
                                        <td><span>Improvements</span><textarea></textarea></td>
                                    </tr>
                                </table>
                            </div>
                        </td>

                        {/* Page Two */}
                        <td>
                            <div>
                                <span className='underline blue-text'>Goal 1 The Most Important * เป้าหมายสำคัญอันดับที่ 1</span>
                                <GoalComponent />
                            </div>
                        </td>

                        {/* Page Three */}
                        <td>
                            <div>
                                <span>Goal 2 More Important * เป้าหมายสำคัญอันดับที่ 2</span>
                                <GoalComponent />
                            </div>
                        </td>

                        {/* Page Four */}
                        <td>
                            <div>
                                <span>Goal 3 Less Important * เป้าหมายสำคัญอันดับที่ 3</span>
                                <GoalComponent />
                            </div>
                        </td>
                    </tr >
                </table >
                <br />
                <br />
            </div >
        );
    }
}

export default SelfAssessmentForm;