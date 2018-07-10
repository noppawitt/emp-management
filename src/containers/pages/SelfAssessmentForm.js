import React from 'react';
import EmployeeInfo from './components/EmployeeInfoComponent';
import GoalComponent from './components/GoalCompanent';
import './css/SelfAssessmentForm.css'

class SelfAssessmentForm extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     name: this.props.profile.general.firstName + ' ' + this.props.profile.general.lastName,
        //     department: this.props.profile.work.departmentName || '-',
        //     position: this.props.profile.work.positionName || '-',
        //     employeeID: this.props.profile.work.userId || '-',
        //     level: this.props.profile.work.levelId || '-',
        //     startDate: this.props.profile.work.startDate || '-',
        //     supervisor: this.props.profile.work.bossname || '-',
        //     currentPage: 0
        // }

        // for test
        this.state = {
            name: '_firstname_lastname' || '-',
            department: '_department' || '-',
            position: "_position" || '-',
            employeeID: "_employee_id" || '-',
            level: "_level" || '-',
            startDate: "2000-12-12" || '-',
            supervisor: "_supervisor" || '-',
            majorResponsibilities: "_marjorResponsibilities" || '',
            significantAccomplishments: "_significantAccomplishments" || '',
            contribution: "_contribution" || '',
            strengths: "_strengths" || '',
            improvements: "_improvements" || '',
            goal1: null || ['', '', '', '', ''],
            goal2: null || ['', '', '', '', ''],
            goal3: null || ['', '', '', '', ''],
            currentPage: 0
        }

        this.animateChangePage = this.animateChangePage.bind(this);
        this.goalOneHandler = this.goalOneHandler.bind(this);
        this.goalTwoHandler = this.goalTwoHandler.bind(this);
        this.goalThreeHandler = this.goalThreeHandler.bind(this);
        this.updateReduxState = this.updateReduxState.bind(this);
    }

    goalOneHandler(newGoal) {
        this.state.goal1 = newGoal;
        this.updateReduxState();
    }

    goalTwoHandler(newGoal) {
        this.state.goal2 = newGoal;
        this.updateReduxState();
    }

    goalThreeHandler(newGoal) {
        this.state.goal3 = newGoal;
        this.updateReduxState();
    }

    updateReduxState() {
        this.props.test(this.state);
    }

    animateChangePage() {
        document.getElementsByClassName('pages-contrainer')[0].style.left = this.state.currentPage * (-100) + '%';
    }

    render() {
        return (
            <div className='self-assessment-form'>
                <button onClick={() => {
                    this.state = { ...this.state, currentPage: (this.state.currentPage + 1) % 4 };
                    this.animateChangePage();
                }}>
                    click
                </button>
                <div>
                    <h1>Self Assessment Form</h1>
                    <h2>Playtorium Solutions Company Limited</h2>
                    <EmployeeInfo {...this.state} />
                </div>
                <table className='pages-contrainer'>
                    <tr>
                        {/* Page One */}
                        <td>
                            <div>
                                <table className='major-respon-table'>
                                    <tr><th className='underline'><span className='blue-text'>Major Responsibilities</span></th></tr>
                                    <tr><td><textarea onChange={(event) => {
                                        this.state = {
                                            ...this.state,
                                            majorResponsibilities: event.target.value
                                        };
                                        this.updateReduxState();
                                    }}>{this.state.majorResponsibilities}</textarea></td></tr>
                                </table>
                            </div>
                            <div>
                                <table className='sign-accom-table'>
                                    <tr><th className='underline'><span className='blue-text'>Significant Accomplishments</span></th></tr>
                                    <tr><td><textarea onChange={(event) => {
                                        this.state = {
                                            ...this.state,
                                            significantAccomplishments: event.target.value
                                        };
                                        this.updateReduxState();
                                    }}>{this.state.significantAccomplishments}</textarea></td></tr>
                                </table>
                            </div>
                            <div>
                                <table className='con-com-table'>
                                    <tr><th className='underline'><span className='blue-text'>Contribution/Company Activities</span></th></tr>
                                    <tr><td><textarea onChange={(event) => {
                                        this.state = {
                                            ...this.state,
                                            contribution: event.target.value
                                        };
                                        this.updateReduxState();
                                    }}>{this.state.contribution}</textarea></td></tr>
                                </table>
                            </div>
                            <div>
                                <table className='str-improve-table'>
                                    <tr>
                                        <th colSpan='2' className='underline'><span className='blue-text'>Strengths/Improvements</span></th>
                                    </tr>
                                    <tr>
                                        <td><span>Strengths</span><textarea onChange={(event) => {
                                            this.state = {
                                                ...this.state,
                                                strengths: event.target.value
                                            };
                                            this.updateReduxState();
                                        }}>{this.state.strengths}</textarea></td>
                                        <td><span>Improvements</span><textarea onChange={(event) => {
                                            this.state = {
                                                ...this.state,
                                                improvements: event.target.value
                                            };
                                            this.updateReduxState();
                                        }
                                        }>{this.state.improvements}</textarea></td>
                                    </tr>
                                </table>
                            </div>
                        </td>

                        {/* Page Two */}
                        <td>
                            <div>
                                <GoalComponent header='Goal 1 The Most Important * เป้าหมายสำคัญอันดับที่ 1' goal={this.state.goal1} onChange={this.goalOneHandler} />
                            </div>
                        </td>

                        {/* Page Three */}
                        <td>
                            <div>
                                <GoalComponent header='Goal 2 More Important * เป้าหมายสำคัญอันดับที่ 2' goal={this.state.goal2} onChange={this.goalTwoHandler} />
                            </div>
                        </td>

                        {/* Page Four */}
                        <td>
                            <div>
                                <GoalComponent header='Goal 3 Less Important * เป้าหมายสำคัญอันดับที่ 3' goal={this.state.goal3} onChange={this.goalThreeHandler} />
                            </div>
                        </td>
                    </tr >
                </table >
            </div >
        );
    }
}

export default SelfAssessmentForm;