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
            name: this.props.profile.general.firstName + ' ' + this.props.profile.general.lastName,
            department: this.props.profile.work.departmentName,
            position: this.props.profile.work.positionName,
            employeeID: this.props.profile.work.userId,
            level: this.props.profile.work.levelId,
            startDate: this.props.profile.work.startDate,
            supervisor: '_supervisor',
            expectedScore: null,
            score: null,
        };

        this.scoreTableStateHandler = this.scoreTableStateHandler.bind(this);
        this.supervisorCommentHandler = this.supervisorCommentHandler.bind(this);
        this.signatureHandler = this.signatureHandler.bind(this);
    }

    scoreTableStateHandler(newScore, newExpectedScore) {
        this.setState({
            score: newScore,
            expectedScore: newExpectedScore
        });
    }

    componentWillMount() {
        if (this.props.profile.perf[0] != null) {
            this.setState({
                expectedScore: this.props.profile.perf[0].expectedScore,
                score: this.props.profile.perf[0].score,
                supervisorComment: this.props.profile.perf[0].supComment
            })
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.score != this.state.score ||
            nextState.expectedScore != this.state.expectedScore
        )
    }

    componentDidUpdate() {
        this.props.test(this.state);
    }

    supervisorCommentHandler(newComment) {
        this.state = { ...this.state, supervisorComment: newComment };
        this.props.test(this.state);
        console.log(this.state);
    }

    signatureHandler(newEmployeeSignDate, newSupervisorSignDate, newMDSignDate) {
        this.state = {
            ...this.state,
            employeeSignDate: newEmployeeSignDate,
            supervisorSignDate: newSupervisorSignDate,
            MDSignDate: newMDSignDate
        };
        this.props.test(this.state);
    }

    render() {
        return (
            <div className='main-container'>
                <div className='profile'>
                    <h1>Employee Performance Review Form</h1>
                    <h2>Playtorium Solutions Company Limited</h2>
                </div>
                <EmployeeInfo {...this.state} mode='edit' />
                <br />
                <div>
                    <ScoreTableManager {...this.state} questions={questions} numOfQuestion={this.props.profile.work.engineer ? this.props.profile.work.levelId >= 3 ? 7 : 6 : 5} weight={[20, 20, 20, 20, 20]} score={this.state.score} onChange={this.scoreTableStateHandler} mode='edit' />
                </div>
                <br />
                <SupervisorCommentComponent {...this.state} onChange={this.supervisorCommentHandler} mode='edit' />
                <br />
                <SignatureComponent {...this.state} role={this.props.role} onChange={this.signatureHandler} />
            </div>
        );
    }
}
export default PerformanceReviewForm;
