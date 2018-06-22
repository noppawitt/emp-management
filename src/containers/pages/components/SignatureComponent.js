import React from 'react';
import cmark from '../pic/mark.png';
import './css/SignatureComponent.css';

class SignatureComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeSignDate: '',
            supervisorSignDate: '',
            MDSignDate: ''
        };

        this.EmployeeSignHandler = this.EmployeeSignHandler.bind(this);
        this.SupervisorSignHandler = this.SupervisorSignHandler.bind(this);
        this.MDSignHandler = this.MDSignHandler.bind(this);

        this.employeeSignButton = React.createRef();
        this.supervisorSignButton = React.createRef();
        this.MDSignButton = React.createRef();
    }

    componentDidMount() {
        this.supervisorSignButton.current.disabled = true;
        this.MDSignButton.current.disabled = true;
    }

    EmployeeSignHandler() {
        this.setState({ employeeSignDate: new Date().toString().substr(0, 24) });
        document.getElementById('mark1').style.width = '2em';
        this.employeeSignButton.current.disabled = true;
        this.supervisorSignButton.current.disabled = false;
        this.MDSignButton.current.disabled = true;
    }
    SupervisorSignHandler() {
        this.setState({ supervisorSignDate: new Date().toString().substr(0, 24) });
        document.getElementById('mark2').style.width = '2em';
        this.supervisorSignButton.current.disabled = true;
        this.MDSignButton.current.disabled = false;
    }
    MDSignHandler() {
        this.setState({ MDSignDate: new Date().toString().substr(0, 24) });
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
                                        <button ref={this.employeeSignButton} className="Accept-button" onClick={this.EmployeeSignHandler}>Accept</button>
                                        <div className="div_mark1" id="mark1"><img src={cmark} className="mark"></img></div>
                                    </div>
                                </th>
                                <th>
                                    <div className='div_mark'>
                                        <button ref={this.supervisorSignButton} className="Accept-button" onClick={this.SupervisorSignHandler}>Accept</button>
                                        <div className="div_mark2" id="mark2"><img src={cmark} className="mark"></img></div>
                                    </div>
                                </th>
                                <th>
                                    <div className='div_mark'>
                                        <button ref={this.MDSignButton} className="Accept-button" onClick={this.MDSignHandler}>Accept</button>
                                        <div className="div_mark3" id="mark3"><img src={cmark} className="mark"></img></div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th>{this.state.employeeSignDate == '' ? '' : 'Date:'} <span className="date">{this.state.employeeSignDate}</span></th>
                                <th>{this.state.supervisorSignDate == '' ? '' : 'Date:'} <span className="date">{this.state.supervisorSignDate}</span></th>
                                <th>{this.state.MDSignDate == '' ? '' : 'Date:'} <span className="date">{this.state.MDSignDate}</span></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default SignatureComponent;