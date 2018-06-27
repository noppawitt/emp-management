import React from 'react';
import './css/EmployeeInfoComponent.css'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class EmployeeInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props,
            startDate: moment('2016-01-01'),
            showEndProDate: props.showEndProDate && true
        };

        this.state = {
            ...this.state,
            endProbationDate: moment(this.state.startDate.format('YYYY-MM-DD')).add(120, 'day')
        }
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
                        <td>{this.state.startDate.format('DD/MM/YYYY')}</td>
                    </tr>
                    <tr>
                        <td>Supervisor:</td>
                        <td>{this.state.supervisor}</td>
                        <td>{this.state.showEndProDate ? 'Probation End Date:' : ''}</td>
                        <td>{this.state.showEndProDate ? <DatePicker selected={this.state.endProbationDate} onChange={(date) => {
                            this.setState({
                                endProbationDate: date
                            })
                        }} dateFormat='DD/MM/YYYY' /> : ''}</td>
                    </tr>
                </table>
            </div>
        );
    }
};

export default EmployeeInfo;