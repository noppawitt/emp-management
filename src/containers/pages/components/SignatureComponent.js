import React from 'react';
import cmark from '../pic/mark.png';
import './css/SignatureComponent.css';

class SignatureComponent extends React.Component {
    handle_accept1() {
        document.getElementById('emp').innerHTML = (new Date()).toString().substr(0, 24);
        document.getElementById('mark1').style.width = '2em';
        document.getElementById('sup-but').disabled = false;
        document.getElementById('emp-but').disabled = true;
    }
    handle_accept2() {
        document.getElementById('sup').innerHTML = (new Date()).toString().substr(0, 24);
        document.getElementById('mark2').style.width = '2em';
        document.getElementById('mag-but').disabled = false;
        document.getElementById('sup-but').disabled = true;
    }
    handle_accept3() {
        document.getElementById('mag').innerHTML = (new Date()).toString().substr(0, 24);
        document.getElementById('mark3').style.width = '2em';
        document.getElementById('mag-but').disabled = true;
    }

    render() {
        return (
            <div className='sign-container'>
                <div>
                    <div align='left'>&emsp;&emsp;&emsp;&emsp;Employee has read this appraisal and discussed the contents with direct supervisor. Signatures identify that employee has been advised on their performance by direct supervisor.</div>
                </div>
                <div id='kkk'>
                    <table className="grid">
                        <tbody>
                            <tr>
                                <th>Employee signature:</th>
                                <th>Supervisor signature:</th>
                                <th>Managing Director signature:</th>
                            </tr>
                            <tr>
                                <th><div className='div_mark' ><button className="Accept-button" id='emp-but' onClick={this.handle_accept1}>Accept</button><div className="div_mark1" id="mark1"><img src={cmark} className="mark"></img></div></div></th>
                                <th><div className='div_mark' ><button className="Accept-button" id='sup-but' onClick={this.handle_accept2}>Accept</button><div className="div_mark2" id="mark2"><img src={cmark} className="mark"></img></div></div></th>
                                <th><div className='div_mark' ><button className="Accept-button" id='mag-but' onClick={this.handle_accept3}>Accept</button><div className="div_mark3" id="mark3"><img src={cmark} className="mark"></img></div></div></th>
                            </tr>
                            <tr>
                                <th>Date: <span id="emp" className="date"></span></th>
                                <th>Date: <span id="sup" className="date"></span></th>
                                <th>Date: <span id="mag" className="date"></span></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default SignatureComponent;