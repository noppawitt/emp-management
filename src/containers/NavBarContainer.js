import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../actions/auth';
import NavBar from '../components/NavBar';

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout())
});

export default withRouter(connect(null, mapDispatchToProps)(NavBar));
