import React from 'react';
import './css/EmployeeInfoComponent.css'
import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import 'moment/locale/es.js'

class EmployeeInfo extends React.Component {
    constructor(props) {
        super(props);

        let start_date = new Date();
        let end_date = new Date();
        end_date.setDate(end_date.getDate() + 120);

        this.state = {
            ...props,
            startDate: (start_date.getDate()) + '-' + (start_date.getMonth() + 1 < 10 ? '0' : '') + (start_date.getMonth() + 1) + '-' + (start_date.getDate() < 10 ? '0' : '') + start_date.getFullYear(),
            endProbationDate: end_date.getFullYear() + '-' + (end_date.getMonth() + 1 < 10 ? '0' : '') + (end_date.getMonth() + 1) + '-' + (end_date.getDate() < 10 ? '0' : '') + (end_date.getDate())
        };
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
                        <td>{this.state.endProbationDate ? <div className='calendar-container'><DatePickerInput locale='es' value={this.state.endProbationDate} onChange={(date) => this.setState({ endProbationDate: date })} /></div> : ''}</td>
                    </tr>
                </table>
            </div>
        );
    }
};

export default EmployeeInfo;