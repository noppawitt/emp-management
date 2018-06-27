import React from 'react';
import './css/ProbationForm.css';
import ScoreManager from './components/ScoreTableManager';
import EmployeeInfo from './components/EmployeeInfoComponent';
import SignatureComponent from './components/SignatureComponent';
import EvaluationResultComponent from './components/EvaluationResultComponent';
import SupervisorCommentComponent from './components/SupervisorCommentComponent';

const questions = ['ความรู้ในงานและการพัฒนาตัวเอง (Knowledge and Improvement)',
    'คุณภาพงาน (Quality of Work)',
    'ปริมาณงาน (Quantity of Work)',
    'การทำงานร่วมกับผู้อื่น (Co-operation with Colleagues)',
    'การปฏิบัติตาม Playtorium Culture',
    'ความสามารถทางด้านภาษาอังกฤษ (TOEIC)',
    'ประกาศนียบัตรตามสายงาน (Certificate)'];

class ProbationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: this.props.profile.general.firstName + ' ' + this.props.profile.general.lastName,
          department: this.props.profile.work.departmentName,
          position: this.props.profile.work.positionName,
          employeeID: this.props.profile.work.levelId,
          level: this.props.profile.work.levelId,
          startDate: this.props.profile.work.startDate,
          supervisor: '_supervisor',
          expectedScore: null ,
          score: null ,
          endProbationDate: this.props.profile.work.probationDate,
          passPro: null,
          confirmed: null,
          continued: null,
          basedSalary:null,
          mobile:null,
          transporationAllowance:null,
          otherAllowance:null,
        };
    }
    componentWillMount(){
      if(this.props.profile.eva!=null){
        this.setState({
          expectedScore: this.props.profile.eva.expectedScore ,
          score: this.props.profile.eva.score ,
          passPro: this.props.profile.eva.passPro,
          confirmed: this.props.profile.eva.confirmedByEmployment,
          continued: this.props.profile.eva.continued,
          basedSalary:this.props.profile.eva.basedSalary,
          mobile:this.props.profile.eva.mobile,
          transporationAllowance:this.props.profile.eva.transporationAllowance,
          otherAllowance:this.props.profile.eva.otherAllowance
        })
      }
    }

    componentDidUpdate(){
    }

    render() {
        return (
            <div className='main-container'>
                <div className='profile'>
                    <h1>Employee Probation Form</h1>
                    <h2>Playtorium Solutions Company Limited</h2>
                </div>
                <EmployeeInfo ref={this.myRef} {...this.state} />
                <br />
                <div>
                    <ScoreManager questions={questions} numOfQuestion={5} weight={[20, 20, 20, 20, 20]} score={this.state.score} />
                </div>
                <br />
                <EvaluationResultComponent {...this.state}/>
                <br />
                <SupervisorCommentComponent {...this.state}/>
                <br />
                <SignatureComponent {...this.state}/>
            </div>
        );
    }
}
export default ProbationForm;
