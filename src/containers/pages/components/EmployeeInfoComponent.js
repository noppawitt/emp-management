import React from 'react';
import './css/EmployeeInfoComponent.css'
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
            endProbationDate: moment(this.state.startDate.format('YYYY-MM-DD')).add(120, 'day').format('YYYY-MM-DD')
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ endProbationDate: props.endProbationDate })
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
                        <td>{this.state.showEndProDate ? 'Probatoin ' : ''} Start Date</td>
                        <td>{this.state.startDate.format('DD/MM/YYYY')}</td>
                    </tr>
                    <tr>
                        <td>Supervisor:</td>
                        <td>{this.state.supervisor}</td>
                        <td>{this.state.showEndProDate ? 'Probation End Date:' : ''}</td>
                        <td>{this.state.showEndProDate ? <input type='date' value={this.state.endProbationDate} onChange={(event) => this.props.onChange(event.target.value)} /> : ''}</td>
                    </tr>
                </table>
            </div>
        );
    }
};

export default EmployeeInfo;