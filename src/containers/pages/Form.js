import React, { Component } from 'react';
import * as Scroll from 'react-scroll';
import Calendar from 'react-calendar';
import './css/Form_G_I.css';
import logo from './pic/logo.png'
import cmark from './pic/mark.png'
import Scoring from './Scoring'
import api from '../../services/api'
import Loading from '../../components/Loader'

let scroll = Scroll.animateScroll;

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Loading..',
      eid: 'Loading..',
      dep: 'Loading..',
      job: 'Loading..',
      level: 'Loading..',
      pos: 'Loading..',
      sup: 'Loading..',
      pstart: 'Loading..',
      pend: 'Loading..',
      state: '1',
      score: [3, 3, 3, 3, 3, 3],
      mainOption: null,
      option1: true,
      isFetched: false
    }
    this.setMain = this.setMain.bind(this);
    this.handle_radio_1 = this.handle_radio_1.bind(this);
    this.handle_radio_2 = this.handle_radio_2.bind(this);
    this.handle_main_radio_1 = this.handle_main_radio_1.bind(this);
    this.handle_main_radio_2 = this.handle_main_radio_2.bind(this);
  }
  componentWillMount() {
    if (this.props.state == '2') {
      for (var i = 0; i < 6; i++) {
        this.state.score[i] = 4;
        console.log(this.state.score)
      }
      this.setState({ mainOption: false })
    }
    this.setState({ mainOption: false })

    api.fetchProbation('10001').then((res) => {
      console.log(res);
      this.setState({
        name: res[0].fullName,
        dep: res[0].department,
        level: res[0].level,
        pos: res[0].position,
        pstart: res[0].startDate,
        pend: res[0].probationDate,
        sup: res[0].supervisor,
        eid: res[0].userId,
        isFetched: true
      });
    });
  }
  componentDidMount() {
    if (this.props.state == '2') {
      document.getElementById('result').style.display = 'block';
      if (this.state.mainOption == true) {
        document.getElementById('main1').checked = 'checked';
      } else document.getElementById('main2').checked = 'checked';
    }
  }
  scrollanimation() {
    scroll.scrollTo(document.getElementById('result').offsetTop);
  }

  handle_radio_1() {
    document.getElementById('salary_option').style.height = '0';
  }
  handle_radio_2() {
    document.getElementById('salary_option').style.height = '5.5em';
  }
  handle_main_radio_1() {
    document.getElementById('main1_option').style.height = '3.1em';
    document.getElementById('main2_option').style.height = '0';
    document.getElementById('option2_1').checked = false;
    document.getElementById('option2_2').checked = false;
    document.getElementById('input1').disabled = true;
    document.getElementById('input2').value = '';
    document.getElementById('input2').disabled = true;
    document.getElementById('input1').value = '';
  }
  handle_main_radio_2() {
    document.getElementById('main1_option').style.height = '0';
    document.getElementById('main2_option').style.height = '6em';
    document.getElementById('salary_option').style.height = '0';
    document.getElementById('option1_1').checked = false;
    document.getElementById('option1_2').checked = false;
  }
  setMain(x){
    this.setState({mainOption: x});
  }
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
  handle_input_dis1() {
    document.getElementById('input2').disabled = true;
    document.getElementById('input1').disabled = false;
    document.getElementById('input2').value = '';
  }
  handle_input_dis2() {
    document.getElementById('input1').disabled = true;
    document.getElementById('input2').disabled = false;
    document.getElementById('input1').value = '';
  }
  toggle_calendar(event){
    if(document.getElementById('date_input').contains(event.target)){
      document.getElementsByClassName('react-calendar')[0].style.height = '16em';
      document.getElementsByClassName('react-calendar')[0].style.borderStyle = 'solid';
    }else if(!document.getElementById('calendar').contains(event.target)){
      document.getElementsByClassName('react-calendar')[0].style.height = '0';
      setTimeout(function(){document.getElementsByClassName('react-calendar')[0].style.borderStyle = 'none'; }, 192);
    }
  }
  // zzz(){
  //   var int = setInterval(toDo, 500);
  //   function toDo() {
  //     var a = window.innerHeight+window.pageYOffset;
  //     var b = document.getElementById('kkk');
  //     if(a>b.offsetTop+200) {
  //       document.getElementById('mark1').style.width='2em';
  //       console.log(a + ' ' + b.offsetTop);
  //       clearInterval(int);
  //
  //     }
  //     else {
  //       console.log(window.innerHeight);
  //     }
  //   }
  // }
  render() {
    return (
      <div>
        {this.state.isFetched ? '' : <Loading />}
        <div className="Body" onClick={this.toggle_calendar} onMouseMove={this.zzz}>

          <div className="profile">
            <div className="div_logo" align="center"><img className="logo" src={logo} /></div>
            <div>
              <table className="profile_table">
                <tbody>
                  <tr>
                    <th colspan="4" className="table_header"><div className="lll"><span className="blue">Information</span></div> </th>
                  </tr>
                  <tr>
                    <td className="topic_1">Name:</td>
                    <td className="show_1"><span>{this.state.name}</span></td>
                    <td className="topic_2">Department:</td>
                    <td className="show_2">{this.state.dep}</td>
                  </tr>
                  <tr>
                    <td className="topic_1">EmployeeID:</td>
                    <td className="show_1"><span>{this.state.eid}</span></td>
                    <td className="topic_2">Position:</td>
                    <td className="show_2"><span>{this.state.pos}</span></td>

                  </tr>
                  <tr>
                    <td className="topic_1">Level:</td>
                    <td className="show_1"><span>{this.state.level}</span></td>
                    <td className="topic_2">Probation Start Date:</td>
                    <td className="show_2">{this.state.pstart}</td>

                  </tr>
                  <tr>
                    <td className="topic_1">Supervisor:</td>
                    <td className="show_1"><span>{this.state.sup}</span></td>
                    <td className="topic_2">Probation End Date :</td>
                    <td className="show_2"><div className="div_ca"><input className="date_inpiut" id="date_input" ></input><div className="calendar" id="calendar"><Calendar/></div></div></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Scoring ref="child" scrollAnimation={this.scrollanimation} score={this.state.score} state={this.props.state} setMain={this.setMain} />

            <div className="result" id="result">
              <div className="result-table">
                <table className="grid-res">
                  <tbody>
                    <tr>
                      <th colspan="10"><div className="lll"><span className="blue">The Evaluation Result</span></div></th>
                    </tr>
                    <tr>
                      <td colspan="1"></td>
                      <td colspan="5"><input id="main1" type="radio" name='main_option' onClick={this.handle_main_radio_1}></input>Pass probationary period. Effective date on</td>
                      <td colspan="4">  </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="result-table-hidden" id="main1_option">
                <table className="grid-res">
                  <tbody>
                    <tr>
                      <td colspan="2"></td>
                      <td colspan="3"><input type="radio" name="option1" id="option1_1" onClick={this.handle_radio_1} ></input>Confirmed By Employment Conditions</td>
                      <td></td>
                      <td colspan="4"> <input type="radio" name="option1" id="option1_2" onClick={this.handle_radio_2}></input>Adjust the Salary and Benefits</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="result-table-hidden" id="salary_option">
                <table className="grid-res">
                  <tbody>
                    <tr className="option1_row" id="option1_row">
                      <td colspan="2"></td>
                      <td colspan="2">Based Salary</td>
                      <td><input type='text'></input></td>
                      <td colspan="2">Mobile</td>
                      <td colspan="1"><input></input></td>
                      <td></td>
                    </tr>
                    <tr className="option1_row" id="option1_row">
                      <td colspan="2"></td>
                      <td colspan="2">Transporation Allowance</td>
                      <td><input></input></td>
                      <td colspan="2">Others Allowance</td>
                      <td colspan="1"><input></input></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="result-table">
                <table className="grid-res">
                  <tbody>
                    <tr>
                      <td colspan="1"></td>
                      <td colspan="5"><input id="main2" type='radio' name="main_option" onClick={this.handle_main_radio_2}></input>This person does not pass probation period. Action to be taken </td>
                      <td colspan="4">  </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="result-table-hidden" id="main2_option">
                <table className="grid-res">
                  <tbody>
                    <tr>
                      <td colspan="2"></td>
                      <td colspan="3"><input type="radio" name="option2" id="option2_1" onClick={this.handle_input_dis1}></input>Termination Effective</td>
                      <td colspan="2"><input id='input1' disabled='true'></input></td>
                      <td colspan="3"></td>
                    </tr>
                    <tr>
                      <td colspan="2"></td>
                      <td colspan="3"><input type="radio" name="option2" id="option2_2" onClick={this.handle_input_dis2}></input>Continued probation untill</td>
                      <td colspan="2"><input id='input2' disabled='true'></input></td>
                      <td colspan="3"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <div>Summary Comments by Supervisors:</div>
                <textarea className="comment"></textarea>
              </div>

              <div>
                <div>Employee has read this appraisal and discussed the contents with direct supervisor. Signatures identify that employee has been advised on their performance by direct supervisor.</div>
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
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
