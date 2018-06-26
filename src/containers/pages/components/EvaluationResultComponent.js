import React from 'react';
import './css/EvaluationResultComponent.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


class EvaluationResultComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.props,
            passPro: this.props.passPro || true,
            confirmed: this.props.confirmed || true,
            terminate: this.props.terminate || true,
            passProDate: this.props.passPro || '',
            terminationDate: this.props.terminationDate || '',
            continuedDate: this.props.continuedDate || ''
        }

        this.showProElement1 = this.showProElement1.bind(this);
        this.showProElement2 = this.showProElement2.bind(this);
        this.showProElement3 = this.showProElement3.bind(this);
        this.closeProElement1 = this.closeProElement1.bind(this);
        this.closeProElement2 = this.closeProElement2.bind(this);
        this.closeProElement3 = this.closeProElement3.bind(this);
        this.updateProElements = this.updateProElements.bind(this);
    }

    componentDidMount() {
        this.updateProElements();
    }

    componentDidUpdate() {
        this.updateProElements();
    }

    updateProElements() {
        if (this.state.passPro) {
            this.showProElement1();
            this.closeProElement3();

            if (this.state.confirmed)
                this.closeProElement2();
            else
                this.showProElement2();
        } else {
            this.showProElement3();
            this.closeProElement1();
            this.closeProElement2();
        }
    }

    showProElement1() {
        let elements = document.getElementById('pro-element1').getElementsByClassName('slide-show');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.height = '1.5em';
        }
    }

    showProElement2() {
        let elements = document.getElementById('pro-element2').getElementsByClassName('slide-show');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.height = '3.5em';
        }
    }

    showProElement3() {
        let elements = document.getElementById('pro-element3').getElementsByClassName('slide-show');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.height = '5em';
        }
    }

    closeProElement1() {
        let elements = document.getElementById('pro-element1').getElementsByClassName('slide-show');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.height = '0';
        }
    }

    closeProElement2() {
        let elements = document.getElementById('pro-element2').getElementsByClassName('slide-show');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.height = '0';
        }
    }

    closeProElement3() {
        let elements = document.getElementById('pro-element3').getElementsByClassName('slide-show');
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.height = '0';
        }
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
                                    <input type='radio' name='pass-pro' onClick={() => this.setState({ passPro: true })} checked={this.state.passPro} />
                                    Pass probationary period. Effective date on
                                </td>
                                <td>
                                    <DatePicker selected={this.state.passProDate} onChange={(date) => {
                                        this.setState({
                                            passProDate: date
                                        })
                                    }} dateFormat='DD/MM/YYYY' disabled={!this.state.passPro} />
                                </td>
                            </tr>
                            <tr>
                                <td id='pro-element1' colSpan='2'>
                                    <div className='slide-show'>
                                        <table className='inner-table-second'>
                                            <tr>
                                                <td>
                                                    <input type='radio' name='confirm-con' onClick={() => this.setState({ confirmed: true })} checked={this.state.confirmed} />
                                                    Confirmed By Employment Conditions
                                                </td>
                                                <td>
                                                    <input type='radio' name='confirm-con' onClick={() => this.setState({ confirmed: false })} checked={!this.state.confirmed} />
                                                    Adjust the Salary and Benefits
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td id='pro-element2' colSpan='2'>
                                    <div className='slide-show'>
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
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td></tr>
                    <tr><td>
                        <table>
                            <tr>
                                <td>
                                    <input type='radio' name='pass-pro' onClick={() => this.setState({ passPro: false })} checked={!this.state.passPro} />
                                    This person does not pass probation period. Action to be taken
                                </td>
                            </tr>
                            <tr>
                                <td id='pro-element3'>
                                    <div className='slide-show'>
                                        <table className='inner-table-second'>
                                            <tr>
                                                <td>
                                                    <input type='radio' name='terminate' onClick={() => this.setState({ terminate: true })} checked={this.state.terminate} />
                                                    Termination Effective
                                                </td>
                                                <td>
                                                    <DatePicker selected={this.state.terminationDate} onChange={(date) => {
                                                        this.setState({
                                                            terminationDate: date
                                                        })
                                                    }} dateFormat='DD/MM/YYYY' disabled={!this.state.terminate} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type='radio' name='terminate' onClick={() => this.setState({ terminate: false })} checked={!this.state.terminate} />
                                                    Continued probation untill
                                                </td>
                                                <td>
                                                    <DatePicker selected={this.state.continuedDate} onChange={(date) => {
                                                        this.setState({
                                                            continuedDate: date
                                                        })
                                                    }} dateFormat='DD/MM/YYYY' disabled={this.state.terminate} />
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
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