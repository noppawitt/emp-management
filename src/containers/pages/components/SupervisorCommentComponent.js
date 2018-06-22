import React from 'react';
import './css/SupervisorCommentComponent.css'

class SupervisorCommentComponent extends React.Component {
    render() {
        return (
            <div className='sup-comment'>
                <h2 className='blue-text'><strong>Summary Comments by Supervisors:</strong></h2>
                <textarea></textarea>
            </div>
        );
    }
}

export default SupervisorCommentComponent;