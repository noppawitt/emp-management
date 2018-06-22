import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../actions/examAuth';
import ExamSideBar from '../components/ExamSideBar';

const mapStateToProps = state => ({
  userid: state.examAuth.userid,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExamSideBar));
