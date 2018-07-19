import React from 'react';
import cmark from '../pic/mark.png';
import './css/SignatureComponent.css';
import moment from 'moment';
import ConfirmModal from '../../../components/ConfirmModal';

class SignatureComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeSignName: props.employeeSignName || null,
            supervisorSignName: props.supervisorSignName || null,
            MDSignName: props.MDSignName || null,
            employeeSignDate: props.employeeSignDate || null,
            supervisorSignDate: props.supervisorSignDate || null,
            MDSignDate: props.MDSignDate || null,
            role: props.role || '',
            modal: ''
        };

        this.EmployeeSignHandler = this.EmployeeSignHandler.bind(this);
        this.SupervisorSignHandler = this.SupervisorSignHandler.bind(this);
        this.MDSignHandler = this.MDSignHandler.bind(this);
        this.SignatureButtonHandler = this.SignatureButtonHandler.bind(this);

        this.employeeSignButton = React.createRef();
        this.supervisorSignButton = React.createRef();
        this.MDSignButton = React.createRef();
    }

    componentDidMount() {
        // initial conditions
        this.employeeSignButton.current.disabled = true;
        this.supervisorSignButton.current.disabled = true;
        this.MDSignButton.current.disabled = true;

        this.SignatureButtonHandler();

        if (this.state.employeeSignDate)
            this.EmployeeSignHandler();
        else
            this.supervisorSignButton.current.disabled = true;

        if (this.state.supervisorSignDate)
            this.SupervisorSignHandler();
        else
            this.MDSignButton.current.disabled = true;

        if (this.state.MDSignDate)
            this.MDSignHandler();
    }

    componentDidUpdate() {
        this.SignatureButtonHandler();
        this.props.onChange(this.state.employeeSignName, this.state.employeeSignDate,
            this.state.supervisorSignName, this.state.supervisorSignDate,
            this.state.MDSignName, this.state.MDSignDate);
    }

    SignatureButtonHandler() {
        if (!this.state.employeeSignDate && this.state.role.employee)
            this.employeeSignButton.current.disabled = false;
        else if (!this.state.supervisorSignDate && this.state.role.supervisor)
            this.supervisorSignButton.current.disabled = false;
        else if (!this.state.MDSignDate && this.state.role.md) {
            this.MDSignButton.current.disabled = false;
            this.supervisorSignButton.current.disabled = false;
        }
        else {
            this.employeeSignButton.current.disabled = true;
            this.supervisorSignButton.current.disabled = true;
            this.MDSignButton.current.disabled = true;
        }
    }

    EmployeeSignHandler() {
        this.setState({
            employeeSignName: this.props.employeeSignName || this.props.authName,
            employeeSignDate: this.props.employeeSignDate || moment().format('YYYY-MM-DD')
        });
        document.getElementById('mark1').style.width = '2em';
        this.employeeSignButton.current.disabled = true;
    }

    SupervisorSignHandler() {
        this.setState({
            supervisorSignName: this.props.supervisorSignName || this.props.authName,
            supervisorSignDate: this.props.supervisorSignDate || moment().format('YYYY-MM-DD')
        });
        document.getElementById('mark2').style.width = '2em';
        this.supervisorSignButton.current.disabled = true;
        // this.setState({
        //   modal: <ConfirmModal submitting={false} onClickHandle={()=>{console.log("HI")}} disable={false} open={true}
        //           onClose={()=>{this.setState({modal: '' , supervisorSignDate: moment().format('YYYY-MM-DD')})}}/>
        // })
    }

    MDSignHandler() {
        this.setState({
            MDSignName: this.props.MDSignName || this.props.authName,
            MDSignDate: this.props.MDSignDate || moment().format('YYYY-MM-DD')
        });
        document.getElementById('mark3').style.width = '2em';
        this.MDSignButton.current.disabled = true;
    }

    render() {
        return (
            <div className='sign-container'>
                <div>
                    <div className='header'>&emsp;&emsp;&emsp;&emsp;Employee has read this appraisal and discussed the contents with direct supervisor. Signatures identify that employee has been advised on their performance by direct supervisor.</div>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Employee signature:</th>
                                <th>Supervisor signature:</th>
                                <th>Managing Director signature:</th>
                            </tr>
                            <tr>
                                <th>
                                    <div className='div_mark'>
                                        <button ref={this.employeeSignButton} className="accept-button" onClick={this.EmployeeSignHandler}>Accept</button>
                                        <div className="div_mark1" id="mark1"><img src={cmark} className="mark"></img></div>
                                    </div>
                                </th>
                                <th>
                                    <div className='div_mark'>
                                        <button ref={this.supervisorSignButton} className="accept-button" onClick={this.SupervisorSignHandler}>Accept</button>
                                        <div className="div_mark2" id="mark2"><img src={cmark} className="mark"></img></div>
                                    </div>
                                </th>
                                <th>
                                    <div className='div_mark'>
                                        <button ref={this.MDSignButton} className="accept-button" onClick={this.MDSignHandler}>Accept</button>
                                        <div className="div_mark3" id="mark3"><img src={cmark} className="mark"></img></div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <td>{!this.state.employeeSignDate ? '' : this.state.employeeSignName}</td>
                                <td>{!this.state.supervisorSignDate ? '' : this.state.supervisorSignName}</td>
                                <td>{!this.state.MDSignDate ? '' : this.state.MDSignName}</td>
                            </tr>
                            <tr>
                                <th>{!this.state.employeeSignDate ? '' : 'Date:'} <span className="date">{this.state.employeeSignDate ? moment(this.state.employeeSignDate).format('DD/MM/YYYY') : ''}</span></th>
                                <th>{!this.state.supervisorSignDate ? '' : 'Date:'} <span className="date">{this.state.supervisorSignDate ? moment(this.state.supervisorSignDate).format('DD/MM/YYYY') : ''}</span></th>
                                <th>{!this.state.MDSignDate ? '' : 'Date:'} <span className="date">{this.state.MDSignDate ? moment(this.state.MDSignDate).format('DD/MM/YYYY') : ''}</span></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default SignatureComponent;
