import React from 'react';

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
                        <td>Start Date</td>
                        <td>{this.state.startDate}</td>
                    </tr>
                    <tr>
                        <td>Supervisor:</td>
                        <td>{this.state.supervisor}</td>
                    </tr>
                </table>
            </div>
        );
    }
};

export default EmployeeInfo;