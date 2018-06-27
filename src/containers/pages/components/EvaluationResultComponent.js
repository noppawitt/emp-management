import React from 'react';
import './css/EvaluationResultComponent.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


class EvaluationResultComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.props,
            passPro: this.props.passPro !== null ? this.props.passPro : true,
            confirmed: this.props.confirmed !== null ? this.props.confirmed : true,
            continued: this.props.continued !== null ? this.props.continued : true,
            passProDate: '',
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
        this.updateParentComponent = this.updateParentComponent.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            passPro: props.passPro,
            confirmed: props.confirmed,
            continued: props.continued,
            passProDate: props.endProbationDate,
            terminationDate: props.terminationDate,
            continuedDate: props.continuedDate,
            basedSalary: props.basedSalary,
            mobile: props.mobile,
            transporationAllowance: props.transporationAllowance,
            otherAllowance: props.otherAllowance
        })
    }

    updateParentComponent() {
        this.props.onChange(
            this.state.passPro,
            this.state.confirmed,
            this.state.continued,
            this.state.passProDate,
            this.state.terminationDate,
            this.state.continuedDate,
            this.state.basedSalary,
            this.state.mobile,
            this.state.transporationAllowance,
            this.state.otherAllowance
        );

        console.log("test2");
        console.log(this.state);
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
                <table className='outer-table'>
                    <tr><th className='underline'>
                        <span className="blue-text">The Evaluation Result</span>
                    </th></tr>
                    <tr><td>
                        <table>
                            <tr>
                                <td>
                                    <input type='radio' name='pass-pro' onClick={() => {
                                        this.state = { ...this.state, passPro: true };
                                        this.updateParentComponent();
                                    }} checked={this.state.passPro} />
                                    Pass probationary period.Effective date on
                                </td>
                                <td>
                                    <DatePicker selected={this.state.passProDate} onChange={(date) => {
                                        this.state = { ...this.state, passProDate: date };
                                        this.updateParentComponent();
                                    }} dateFormat='DD/MM/YYYY' disabled={!this.state.passPro} />
                                </td>
                            </tr>
                            <tr>
                                <td id='pro-element1' colSpan='2'>
                                    <div className='slide-show'>
                                        <table className='inner-table-second'>
                                            <tr>
                                                <td>
                                                    <input type='radio' name='confirm-con' onClick={() => {
                                                        this.state = { ...this.state, confirmed: true };
                                                        this.updateParentComponent();
                                                    }} checked={this.state.confirmed} />
                                                    Confirmed By Employment Conditions
                                                </td>
                                                <td>
                                                    <input type='radio' name='confirm-con' onClick={() => {
                                                        this.state = { ...this.state, confirmed: false };
                                                        this.updateParentComponent();
                                                    }} checked={!this.state.confirmed} />
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
                                                    <input type='text' value={this.state.basedSalary} onChange={(event) => {
                                                        this.state = { ...this.state, basedSalary: event.target.value };
                                                        this.updateParentComponent();
                                                    }} />
                                                </td>
                                                <td>
                                                    Mobile
                                                </td>
                                                <td>
                                                    <input type='text' value={this.state.mobile} onChange={(event) => {
                                                        this.state = { ...this.state, mobile: event.target.value };
                                                        this.updateParentComponent();
                                                    }} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Transporation Allowance
                                                </td>
                                                <td>
                                                    <input type='text' value={this.state.transporationAllowance} onChange={(event) => {
                                                        this.state = { ...this.state, transporationAllowance: event.target.value };
                                                        this.updateParentComponent();
                                                    }} />
                                                </td>
                                                <td>
                                                    Others Allowance
                                                </td>
                                                <td>
                                                    <input type='text' value={this.state.otherAllowance} onChange={(event) => {
                                                        this.state = { ...this.state, otherAllowance: event.target.value };
                                                        this.updateParentComponent();
                                                    }} />
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
                                    <input type='radio' name='pass-pro' onClick={() => {
                                        this.state = { ...this.state, passPro: false };
                                        this.updateParentComponent();
                                    }} checked={!this.state.passPro} />
                                    This person does not pass probation period. Action to be taken
                                </td>
                            </tr>
                            <tr>
                                <td id='pro-element3'>
                                    <div className='slide-show'>
                                        <table className='inner-table-second'>
                                            <tr>
                                                <td>
                                                    <input type='radio' name='terminate' onClick={() => {
                                                        this.state = { ...this.state, continued: false };
                                                        this.updateParentComponent();
                                                    }} checked={!this.state.continued} />
                                                    Termination Effective
                                                </td>
                                                <td>
                                                    <DatePicker selected={this.state.terminationDate} onChange={(date) => {
                                                        this.state = { ...this.state, terminationDate: date };
                                                        this.updateParentComponent();
                                                    }} dateFormat='DD/MM/YYYY' disabled={this.state.continued} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type='radio' name='terminate' onClick={() => {
                                                        this.state = { continued: true };
                                                        this.updateParentComponent();
                                                    }} checked={this.state.continued} />
                                                    Continued probation untill
                                                </td>
                                                <td>
                                                    <DatePicker selected={this.state.continuedDate} onChange={(date) => {
                                                        this.state = { ...this.state, continuedDate: date };
                                                        this.updateParentComponent();
                                                    }} dateFormat='DD/MM/YYYY' disabled={!this.state.continued} />
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
