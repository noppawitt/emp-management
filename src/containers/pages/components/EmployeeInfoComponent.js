import React from 'react';
import './css/EmployeeInfoComponent.css'
import Calendar from 'react-calendar';

class EmployeeInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <div className='info-container' >
                <table>
                    <tr>
                        <td colSpan='4' className='underline'>
                            <span className='blue-text'>Information</span>
                        </td>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        <td>{this.state.name}</td>
                        <td>Department:</td>
                        <td>{this.state.department}</td>
                    </tr>
                    <tr>
                        <td>Position:</td>
                        <td>{this.state.position}</td>
                        <td>EmployeeID:</td>
                        <td>{this.state.employeeID}</td>
                    </tr>
                    <tr>
                        <td>Level:</td>
                        <td>{this.state.level}</td>
                        <td>{this.state.endProbationDate ? 'Probatoin ' : ''} Start Date</td>
                        <td>{this.state.startDate}</td>
                    </tr>
                    <tr>
                        <td>Supervisor:</td>
                        <td>{this.state.supervisor}</td>
                        <td>{this.state.endProbationDate ? 'Probation End Date:' : ''}</td>
                        <td>{this.state.endProbationDate ? <div className='outer-calendar'><div className='inner-calendar'><Calendar /></div></div> : ''}</td>
                    </tr>
                </table>
            </div>
        );
    }
};

export default EmployeeInfo;