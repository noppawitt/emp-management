import React from 'react';
import './css/EvaluationResultComponent.css';

class EvaluationResultComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='eva-result-container'>
                <table>
                    <tr><th className='underline'>
                        <span className="blue-text">The Evaluation Result</span>
                    </th></tr>
                    <tr><td>
                        <table>
                            <tr>
                                <td>
                                    <input type='radio' name='pass-pro'/>
                                    Pass probationary period. Effective date on
                                </td>
                                <td>
                                    <input type='date' />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='2'>
                                    <table className='inner-table-second'>
                                        <tr>
                                            <td>
                                                <input type='radio' name='confirm-con' />
                                                Confirmed By Employment Conditions
                                            </td>
                                            <td>
                                                <input type='radio' name='confirm-con' />
                                                Adjust the Salary and Benefits
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='2'>
                                    <table className='inner-table-second'>
                                        <tr>
                                            <td>
                                                Based Salary
                                            </td>
                                            <td>
                                                <input type='text' />
                                            </td>
                                            <td>
                                                Mobile
                                            </td>
                                            <td>
                                                <input type='text' />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Transporation Allowance
                                            </td>
                                            <td>
                                                <input type='text' />
                                            </td>
                                            <td>
                                                Others Allowance
                                            </td>
                                            <td>
                                                <input type='text' />
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td></tr>
                    <tr><td>
                        <table>
                            <tr>
                                <td>
                                    <input type='radio' name='pass-pro' />
                                    This person does not pass probation period. Action to be taken
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table className='inner-table-second'>
                                        <tr>
                                            <td>
                                                <input type='radio' name='terminate' />
                                                Termination Effective
                                            </td>
                                            <td>
                                                <input type='text' />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <input type='radio' name='terminate' />
                                                Continued probation untill
                                            </td>
                                            <td>
                                                <input type='text' />
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td></tr>
                </table>


            </div >
        );
    }

}

export default EvaluationResultComponent;