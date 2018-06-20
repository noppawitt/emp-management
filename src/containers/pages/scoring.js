import React, { Component } from 'react';
import './css/Form_G_I.css';

class Scoring1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_score:[],
      total:'',
      topic:[
        'ความรู้ในงานและการพัฒนาตัวเอง (Knowledge and Improvement)',
        'คุณภาพงาน (Quality of Work)',
        'ปริมาณงาน (Quantity of Work)',
        'การทำงานร่วมกับผู้อื่น (Co-operation with Colleagues)',
        'การปฏิบัติตามระเบียบบริษัทฯ จรรยาบรรณและความซื่อสัตย์ (Compliance Ehics and Integrity)'
      ],
      weight:{
        perf:{
          level2:[20.0,15.0,15.0,20.0,15.0,15.0],
          level3:[15.0,15.0,15.0,15.0,15.0,15.0,10.0],
          nonlevel:[[20.0,20.0,20.0,20.0,20.0]]
        },
        pro:{
          level2:[20.0,15.0,15.0,20.0,10.0,20.0],
          level3:[15.0,15.0,15.0,15.0,15.0,15.0,10.0],
          nonlevel:[[20.0,20.0,20.0,20.0,20.0]]
        }
      }
    }
    this.First = this.First.bind(this);
    this.Second = this.Second.bind(this);
    this.changeF = this.changeF.bind(this);
    this.changeS = this.changeS.bind(this);
    this.handle_submit = this.handle_submit.bind(this);
  }
  componentWillMount(){
    if(this.props.level>=2){
      this.state.topic.push ("ความสามารถทางด้านภาษาอังกฤษ (TOEIC)");
      if(this.props.level>=3){
        this.state.topic.push('ประกาศนียบัตรตามสายงาน (Certificate)');
      }
    }
  }
  componentDidMount() {
    if (this.props.state == '2') {
      var x = document.getElementsByName('p');
      var y = document.getElementsByName('q');
      for (var i = 0; i < x.length; i++) {
        x[i].value = this.props.score[i];
        x[i].disabled = true;
        y[i].disabled = true;
      }
      document.getElementById('submit-but').disabled = true;
      this.changeF();
      this.changeS();
      console.log('did score')
    }
    else {
      this.changeF();
      this.changeS();
      console.log('did score')
    }
  }

  incFloatAnimation(a, b) {
    var int = setInterval(toDo, 0.1);
    function toDo() {
      if (parseFloat(b.innerHTML) == a) {
        clearInterval(int);
      }
      else {
        if (parseFloat(b.innerHTML) > a) {
          b.innerHTML = (parseFloat(b.innerHTML) - 0.1).toFixed(1) + '%';
        } else {
          b.innerHTML = (parseFloat(b.innerHTML) + 0.1).toFixed(1) + '%';
        }
      }
    }
  }
  incIntAnimation(a, b) {
    var int = setInterval(toDo, 35);
    function toDo() {
      if (parseInt(b.innerHTML) == a) {
        clearInterval(int);
      }
      else {
        if (parseInt(b.innerHTML) > a) {
          b.innerHTML = (parseFloat(b.innerHTML) - 1);
        } else {
          b.innerHTML = (parseFloat(b.innerHTML) + 1);
        }
      }
    }
  }
  changeF() {
    var total = 0;
    var x = document.getElementsByName('q');
    var w = document.getElementsByName('q_w');
    for (var i = 0; i < x.length; i++) {
      total += parseInt(x[i].value);
    }
    this.incIntAnimation(total, document.getElementById('ftotal'));
  }
  changeS() {
    console.log('begin');
    var total = 0;
    var tmp = [];
    var x = document.getElementsByName('p');
    var w = document.getElementsByName('q_w');
    for (var i = 0; i < x.length; i++) {
      tmp.push(x[i].value)
      this.incFloatAnimation((parseInt(x[i].value) / 5 * parseInt((w[i].innerHTML))).toFixed(1), document.getElementsByName('sum')[i]);
      total += parseInt(x[i].value);
    }
    var a = ((total / 30) * 100).toFixed(1);
    this.setState({total: a});
    var b = (document.getElementById('f_total'));
    this.incFloatAnimation(a, b);
    this.incIntAnimation(total, document.getElementById('stotal'));

    this.setState({cur_score:tmp});
    console.log('end');
  }
  First() {
    return (<select name='q' onChange={this.changeF} >
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
  handle_submit() {
    if (parseInt(document.getElementById('f_total').innerHTML) >= 60) {
      document.getElementsByName('main_option')[0].checked = 'true'
      this.props.setMain(true,this.state.cur_score);
      document.getElementById('main1_option').style.height = '3.1em';

    }
    else {
      document.getElementsByName('main_option')[1].checked = 'true'
      this.props.setMain(false,this.state.cur_score);
      document.getElementById('main2_option').style.height = '6em';

      console.log(document.getElementsByName('main_option').length)
      document.getElementById('date_input_pass').style.display='none';

    }
    var x = document.getElementsByName('p');
    var y = document.getElementsByName('q');
    for (var i = 0; i < x.length; i++) {
      x[i].disabled = true;
      y[i].disabled = true;
    }
    //this.update_db();
    console.log(this.state.mainOption);
    document.getElementById('result').style.display = 'block';
    this.props.scrollAnimation();
    document.getElementById('submit-but').disabled = true;
    document.getElementById('sup-but').disabled = true;
    document.getElementById('mag-but').disabled = true;
  }
  render() {
    var x=1;
    return (
      <div>
        <table className="table_main" id="table_main">
          <tbody>
            <tr>
              <th colspan="6" className="table_header"><div className="lll"><span className="blue">Performance Appraisal Portion</span></div></th>
            </tr>
            <tr>
              <th>No.</th>
              <th>Appraisal Criteria</th>
              <th>Score</th>
              <th>Total Average</th>
              <th>Weight</th>
              <th>Total Point</th>
            </tr>
            {this.state.topic.map( item =>
              <tr>
                <td className="No">{x++}</td>
                <td className="topic">{item}</td>
                <td className="Weight" ><this.First /></td>
                <td className="Weight" ><this.Second /></td>
                <td className="Weight" name='q_w' >20.0%</td>
                <td className="Weight"><span name='sum'>0</span></td>
              </tr>
            )}

            <tr>
              <th colspan="2">Total Performance Score</th>
              <th><span className="total" id="ftotal">0</span></th>
              <th><span className="total" id="stotal">0</span></th>
              <th className="Weight">100.0%</th>
              <th className="th_total"><span id='f_total' className="blue">48</span></th>
            </tr>
            <tr>
              <th colspan="5"></th>
              <th><button id='submit-but' className="Submit-button" onClick={this.handle_submit}> Next </button></th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default Scoring1;
