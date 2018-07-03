import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import { updateProfileRequest, updateProbationStore } from '../../actions/profile';
import Modal from '../../components/Modal';
import A from '../pages/PerformanceReviewForm'
import Loader from '../../components/Loader';


class AddPerformance extends React.Component{
  constructor(props){
    super(props);
    this.state = props;
    this.type = (this.props.profile.eva == null ? 'addPerformance':'updatePerformance')
  }
  componentDidMount(){
    console.log(this.state.submitting);
  }
  render(){
    return(
      <div>
        {this.props.fetching ? <Loader/> :
          <Modal
            header={this.props.profile.perf[0] == null ? 'Add Performance':'View Performance'}
            onClose={this.props.onClose}
            onClick={()=>this.props.onSubmit(this.props.item,(this.props.profile.perf[0] == null ? 'addPerformance':'updatePerformance'))}
            submitting={this.props.submitting}
            size="large"
            disable={!this.props.edited}
          >
            <A test={this.props.onChange} profile={this.props.profile}/>
          </Modal>
        }
      </div>
    );
  }
}

AddPerformance.defaultProps = {
  submitting: false
};

AddPerformance.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  item: state.profile.item,
  modalName: state.modal.name,
  profile: state.profile,
  submitting: state.profile.submitting,
  edited: state.profile.edited,
  fetching: state.profile.proFetching
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: (item,type) =>  (new Promise((resolve,reject)=> (
    dispatch(updateProfileRequest(item,resolve,reject,type))
  ))),

  onClick: () => dispatch(submit('addProbationProfile')),
  onChange: (item) => dispatch(updateProbationStore(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPerformance);
