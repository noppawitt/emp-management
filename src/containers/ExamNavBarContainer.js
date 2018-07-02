import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../actions/examAuth';
import ExamNavBar from '../components/ExamNavBar';

const mapStateToProps = state => ({
  id: state.examAuth.id,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExamNavBar));
