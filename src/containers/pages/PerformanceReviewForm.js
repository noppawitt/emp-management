import React from 'react';
import './css/PerformanceReviewForm.css';
import ScoreTableManager from './components/ScoreTableManager';
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
            expectedScore: null,
            score: null,
        };

        this.scoreTableStateHandler = this.scoreTableStateHandler.bind(this);
        this.supervisorCommentHandler = this.supervisorCommentHandler.bind(this);
    }

    scoreTableStateHandler(newScore, newExpectedScore) {
        this.setState({
            score: newScore,
            expectedScore: newExpectedScore
        });
    }

    supervisorCommentHandler(newComment) {
        this.state = { ...this.state, supervisorComment: newComment };
        // this.props.test(this.state);
        console.log(this.state);
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
                    <ScoreTableManager {...this.state} questions={questions} numOfQuestion={5} weight={[20, 20, 20, 20, 20]} score={this.state.score} onChange={this.scoreTableStateHandler} />
                </div>
                <br />
                <SupervisorCommentComponent {...this.state} onChange={this.supervisorCommentHandler} />
                <br />
                <SignatureComponent {...this.state}/>
            </div>
        );
    }
}
export default PerformanceReviewForm;
