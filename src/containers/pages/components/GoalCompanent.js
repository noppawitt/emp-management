import React from 'react';
import './css/GoalComponent.css'

class GoalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goal: props.goal || ['', '', '', '', '']
        }
        this.updateParentState = this.updateParentState.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            goal: props.goal
        })
    }

    updateParentState() {
        this.props.onChange(this.state.goal);
    }

    render() {
        return (
            <div>
                <table className='goal-table'>
                    <tr>
                        <th colSpan='2' className='underline'>
                            <span className='blue-text'>{this.props.header}</span>
                        </th>
                    </tr>
                    <tr>
                        <td>Description: What is the goal?</td>
                        <td><textarea tabIndex='-1' onChange={(event) => {
                            this.state.goal[0] = event.target.value;
                            this.updateParentState();
                        }}>{this.state.goal[0]}</textarea></td>
                    </tr>
                    <tr>
                        <td>First Step Plan: What is the first step towards achieving this goal?</td>
                        <td><textarea tabIndex='-1' onChange={(event) => {
                            this.state.goal[1] = event.target.value;
                            this.updateParentState();
                        }}>{this.state.goal[1]}</textarea></td>
                    </tr>
                    <tr>
                        <td>Evaluation: How will we know if the goal is achieved? What will happen or change?</td>
                        <td><textarea tabIndex='-1' onChange={(event) => {
                            this.state.goal[2] = event.target.value;
                            this.updateParentState();
                        }}>{this.state.goal[2]}</textarea></td>
                    </tr>
                    <tr>
                        <td>Support: What training or experience, or other support, could help?</td>
                        <td><textarea tabIndex='-1' onChange={(event) => {
                            this.state.goal[3] = event.target.value;
                            this.updateParentState();
                        }}>{this.state.goal[3]}</textarea></td>
                    </tr>
                    <tr>
                        <td>Timing: When will the goal be achieved?</td>
                        <td><textarea tabIndex='-1' onChange={(event) => {
                            this.state.goal[4] = event.target.value;
                            this.updateParentState();
                        }}>{this.state.goal[4]}</textarea></td>
                    </tr>
                </table>
            </div >
        );
    }
}

export default GoalComponent;
