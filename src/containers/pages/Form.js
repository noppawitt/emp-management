import React, { Component } from 'react';
import * as Scroll from 'react-scroll';
import './css/Form_G_I.css';
import logo from './pic/mfec_logo.png'
import cmark from './pic/mark.png'

let scroll     = Scroll.animateScroll;

class Form_G_I extends Component {
  constructor(props){
      super(props);
      this.state = {
          name:'',
          eid:'',
          dep:'',
          job:'',
          level:'',
          pos:'',
          sup:'',
          pstart:'',
          pend:'',
          first : '',
          second:'',
          state : '1',
          mainOption: null,
          option1 : true
      }
      this.handle_radio_1 = this.handle_radio_1.bind(this);
      this.handle_radio_2 = this.handle_radio_2.bind(this);
      this.handle_main_radio_1 = this.handle_main_radio_1.bind(this);
      this.handle_main_radio_2 = this.handle_main_radio_2.bind(this);
      this.First = this.First.bind(this);
      this.Second = this.Second.bind(this);
      this.changeF = this.changeF.bind(this);
      this.changeS = this.changeS.bind(this);
      this.handle_submit = this.handle_submit.bind(this);
  }
  componentDidMount(){

    if(this.props.state=='2') {
      document.getElementById('result').style.display = 'block';
      this.setState({name:'Wachit Chaisitsak',eid:123456});
      var x=document.getElementsByName('q');
      for(var i=0;i<x.length;i++){
        x[i].value="5";
        console.log(x[i].nodeName)
      }

    }
    this.changeF();
    this.changeS();
  }
  scrollanimation(){
    var elem = document.getElementById('result');
    var pos = 5;
    var check = false;
    var next;
    var int = setInterval(frame,5);
    function frame(){
      if(elem.offsetTop <= window.pageYOffset || check){
        clearInterval(int);
      }else{
        next = window.pageYOffset+pos;
        window.scrollTo(0,window.pageYOffset+pos);
        if(next!=window.pageYOffset)check = true;
      }
    }
  }
  handle_radio_1(){
    if(!this.state.option1)this.setState({option1: true});
    console.log(this.state.option1);
  }
  handle_radio_2(){
    if(this.state.option1)this.setState({option1: false});
  }
  handle_main_radio_1(){
    if(!this.state.mainOption)this.setState({mainOption: true});
  }
  handle_main_radio_2(){
    if(this.state.mainOption){
      this.setState({mainOption: false,option1 : true});
      console.log(this.state.option1);
    }
  }
  handle_submit(){
    if(parseInt(document.getElementById('f_total').innerHTML)>=60){
      document.getElementsByName('main_option')[0].checked = 'true'
      this.setState({mainOption:true});
    }
    else {
      document.getElementsByName('main_option')[1].checked = 'true'
      this.setState({mainOption:false});
      console.log(document.getElementsByName('main_option').length)

    }

    document.getElementById('result').style.display = 'block';
    scroll.scrollTo(document.getElementById('result').offsetTop);
    document.getElementById('submit-but').disabled=true;
    document.getElementById('sup-but').disabled=true;
    document.getElementById('mag-but').disabled=true;
  }
  handle_accept1(){
    document.getElementById('emp').innerHTML='Date: '+(new Date()).toString().substr(0,24);
    document.getElementById('mark1').style.width = '2em';
    document.getElementById('sup-but').disabled=false;
    document.getElementById('emp-but').disabled=true;
  }
  handle_accept2(){
    document.getElementById('sup').innerHTML='Date: '+(new Date()).toString().substr(0,24);
    document.getElementById('mark2').style.width = '2em';
    document.getElementById('mag-but').disabled=false;
    document.getElementById('sup-but').disabled=true;
  }
  handle_accept3(){
    document.getElementById('mag').innerHTML='Date: '+(new Date()).toString().substr(0,24);
    document.getElementById('mark3').style.width = '2em';
    document.getElementById('mag-but').disabled=true;
  }
  handle_input_dis1(){
    document.getElementById('input2').disabled=true;
    document.getElementById('input1').disabled=false;
    document.getElementById('input2').value='';
  }
  handle_input_dis2(){
    document.getElementById('input1').disabled=true;
    document.getElementById('input2').disabled=false;
    document.getElementById('input1').value='';
  }
  changeF(){
    var total=0;
    var x=document.getElementsByName('q');
    var w=document.getElementsByName('q_w');
    for(var i=0;i<x.length;i++){
      total+= parseInt(x[i].value);
    }
    this.setState({first: total});
  }
  changeS(){
    var total=0;
    var x=document.getElementsByName('p');
    var w=document.getElementsByName('q_w');
    for(var i=0;i<x.length;i++){
      document.getElementById('f'+i).innerHTML=parseInt(x[i].value)/5*parseInt((w[i].innerHTML))+'.0%';
      total+= parseInt(x[i].value);
    }
    document.getElementById('f_total').innerHTML=((total/30)*100).toFixed(1)+'%'
    this.setState({second: total});
  }
  First() {
  return (<select name='q' onChange={this.changeF}>
        <option value="1">1</option>
        <option value="2" >2</option>
        <option value="3" selected="selected">3</option>
        <option value="4" >4</option>
        <option value="5" >5</option>
      </select>);
  }
  Second() {
  return (<select name='p' onChange={this.changeS}>
        <option value="1">1</option>
        <option value="2" >2</option>
        <option value="3" selected="selected">3</option>
        <option value="4" >4</option>
        <option value="5" >5</option>
      </select>);
  }
  render() {
    return (
        <div className="Body">
          <div className="profile">
            <h1><img src={logo} /> </h1>
            <div>
              <table className="profile_table">
                <tr>
                  <td className="topic_1">Name:</td>
                  <td className="show_1"><span>{this.state.name}</span></td>
                  <td className="topic_2">Department:</td>
                  <td className="show_2">{this.state.eid}</td>

                </tr>
                <tr>
                  <td className="topic_1">EmployeeID:</td>
                  <td className="show_1"><span>{this.state.job}</span></td>
                  <td className="topic_2">Position:</td>
                  <td className="show_2"><span>{this.state.level}</span></td>

                </tr>
                <tr>
                  <td className="topic_1">Level:</td>
                  <td className="show_1"><span>{this.state.name}</span></td>
                  <td className="topic_2">Probation Start Date:</td>
                  <td className="show_2">{this.state.eid}</td>

                </tr>
                <tr>
                  <td className="topic_1">Supervisor:</td>
                  <td className="show_1"><span>{this.state.job}</span></td>
                  <td className="topic_2">Probation End Date :</td>
                  <td className="show_2"><span>{this.state.level}</span></td>
                </tr>
              </table>
            </div>

            <div>
              <table className="table_main" id="table_main">
                <tr>
                  <th colspan="6" className="table_header">A. Performance Appraisal Portion </th>
                </tr>
                <tr>
                  <th>No.</th>
                  <th>Appraisal Criteria</th>
                  <th>Score</th>
                  <th>Total Average</th>
                  <th>Weight</th>
                  <th>Total Point</th>
                </tr>
                <tr>
                  <td className="No">1</td>
                  <td className="topic">Quality of Work (คุณภาพงาน)</td>
                  <td className="Weight" name="q1"><this.First/></td>
                  <td className="Weight" name="p1"><this.Second/></td>
                  <td className="Weight" name='q_w' >20.0%</td>
                  <td className="Weight"><span id='f0'></span></td>
                </tr>
                <tr>
                  <td className="No">2</td>
                  <td className="topic">Quantity of Work (ปริมาณงาน)</td>
                  <td className="Weight" name="q1"><this.First/></td>
                  <td className="Weight" name="p1"><this.Second/></td>
                  <td className="Weight" name='q_w'>15.0%</td>
                  <td className="Weight"><span id='f1'></span></td>
                </tr>
                <tr>
                  <td className="No">3</td>
                  <td className="topic">Functional Knowledge (ความรู้ในงาน)</td>
                  <td className="Weight" name="q1"><this.First/></td>
                  <td className="Weight" name="p1"><this.Second/></td>
                  <td className="Weight" name='q_w'>15.0%</td>
                  <td className="Weight"><span id='f2'></span></td>
                </tr>
                <tr>
                  <td className="No">4</td>
                  <td className="topic">Communication Skills (ความสามารถในการสื่อสาร)</td>
                  <td className="Weight" name="q1"><this.First/></td>
                  <td className="Weight" name="p1"><this.Second/></td>
                  <td className="Weight" name='q_w'>20.0%</td>
                  <td className="Weight"><span id='f3'></span></td>
                </tr>
                <tr>
                  <td className="No">5</td>
                  <td className="topic">Problem Solving (การแก้ไขปัญหา)</td>
                  <td className="Weight" name="q1"><this.First/></td>
                  <td className="Weight" name="p1"><this.Second/></td>
                  <td className="Weight" name='q_w'>10.0%</td>
                  <td className="Weight"><span id='f4'></span></td>
                </tr>
                <tr>
                  <td className="No">6</td>
                  <td className="topic">Compliance (การปฏิบัติตามระเบียบ/ข้อบังคับ)</td>
                  <td className="Weight" name="q1"><this.First/></td>
                  <td className="Weight" name="p1"><this.Second/></td>
                  <td className="Weight" name='q_w'>20.0%</td>
                  <td className="Weight"><span id='f5'></span></td>
                </tr>
                <tr>
                  <th colspan="2">Total Performance Score</th>
                  <th><span className="total" id="total">{this.state.first}</span></th>
                  <th><span className="total" id="total">{this.state.second}</span></th>
                  <th className="Weight">100.0%</th>
                  <th><span id='f_total'></span></th>
                </tr>
                <tr>
                  <th colspan="5"></th>
                  <th><button id='submit-but' className="Submit-button" onClick={this.handle_submit}> Submit </button></th>
                </tr>
              </table>
            </div>

            <div className="result" id="result">
            <div>
              <table className="grid">
                <tr>
                  <th colspan="10"><h2>The Evaluation Result</h2></th>
                </tr>
                <tr>
                  <td colspan="1"></td>
                  <td colspan="5"><input type="radio" name='main_option' onClick={this.handle_main_radio_1}></input>Pass probationary period. Effective date on</td>
                  <td colspan="4">  </td>
                </tr>
                {this.state.mainOption ? (
                  <tr>
                    <td colspan="2"></td>
                    <td colspan="3"><input type="radio" name="option1" id="option1_1" onClick={this.handle_radio_1} ></input>Confirmed By Employment Conditions</td>
                    <td></td>
                    <td colspan="4"> <input type="radio" name="option1" id="option1_2" onClick={this.handle_radio_2}></input>Adjust the Salary and Benefits</td>
                  </tr>
                ): ''
                }
                {this.state.option1 || !this.state.mainOption ? '':  (
                    <tr className="option1_row" id="option1_row">
                      <td colspan="3"></td>
                      <td colspan="2">Based Salary</td>
                      <td><input type='text'></input></td>
                      <td colspan="2">Mobile</td>
                      <td><input></input></td>
                    </tr>
                  )
                }
                {this.state.option1 || !this.state.mainOption ? '':  (
                    <tr className="option1_row" id="option1_row">
                      <td colspan="3"></td>
                      <td colspan="2">Transporation Allowance</td>
                      <td><input></input></td>
                      <td colspan="2">Others Allowance</td>
                      <td colspan="1"><input></input></td>
                    </tr>
                  )
                }

                <tr>
                  <td colspan="1"></td>
                  <td colspan="5"><input type='radio' name="main_option" onClick={this.handle_main_radio_2}></input>This person does not pass probation period. Action to be taken </td>
                  <td colspan="4">  </td>
                </tr>
                {this.state.mainOption ? '':
                (
                  <tr>
                    <td colspan="2"></td>
                    <td colspan="3"><input type="radio" name="option2" onClick={this.handle_input_dis1}></input>Termination Effective</td>
                    <td colspan="2"><input id='input1' disabled='true'></input></td>
                    <td colspan="3"></td>
                  </tr>

                )
                }
                {this.state.mainOption ? '':
                (
                  <tr>
                    <td colspan="2"></td>
                    <td colspan="3"><input type="radio" name="option2" onClick={this.handle_input_dis2}></input>Continued probation untill</td>
                    <td colspan="2"><input id='input2' disabled='true'></input></td>
                    <td colspan="3"></td>
                  </tr>

                )
                }

              </table>
            </div>

            <div>
              <div>Summary Comments by Supervisors:</div>
              <textarea className="comment"></textarea>
            </div>

            <div>
              <div>Employee has read this appraisal and discussed the contents with direct supervisor. Signatures identify that employee has been advised on their performance by direct supervisor.</div>
            </div>

            <div>
              <table className="grid">
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
                  <th id="emp">Date:</th>
                  <th id="sup">Date:</th>
                  <th id="mag">Date:</th>
                </tr>
              </table>
            </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Form_G_I;
