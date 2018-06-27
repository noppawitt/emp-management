import React from 'react';
import './css/SupervisorCommentComponent.css'

class SupervisorCommentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { supervisorComment: props.supervisorComment };
    }

    componentWillReceiveProps(props) {
        this.setState({ supervisorComment: props.supervisorComment });
    }

    render() {
        return (
            <div className='sup-comment'>
                <h2 className='blue-text'><strong>Summary Comments by Supervisors:</strong></h2>
                <textarea onChange={(event) => this.props.onChange(event.target.value)}>{this.state.supervisorComment}</textarea>
            </div>
        );
    }
}

export default SupervisorCommentComponent;