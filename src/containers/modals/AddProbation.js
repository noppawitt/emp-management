import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import { updateProfileRequest, updateProbationStore } from '../../actions/profile';
import Modal from '../../components/Modal';
import A from '../pages/ProbationForm'

class AddProbation extends React.Component{
  constructor(props){
    super(props);
    this.state = props;
    this.type = (this.props.profile.eva == null ? 'addProbation':'updateProbation')
  }
  componentDidMount(){
    console.log(this.state.edited);
  }
  render(){
    return(
      <Modal
        header={this.props.profile.eva == null ? 'Add Probation':'View Probation'}
        onClose={this.props.onClose}
        onClick={()=>this.props.onSubmit(this.props.item,(this.props.profile.eva == null ? 'addProbation':'updateProbation'))}
        submitting={this.props.submitting}
        size="large"
        disable={!this.props.edited}
      >
        <A test={this.props.onChange} profile={this.props.profile} mode={!this.props.profile.eva || (this.props.type=='admin' && !this.props.profile.eva.emSignDate) ? 'edit' : 'view'} role={this.props.type == 'admin' ? 'supervisor':'employee'}/>
      </Modal>
    );
  }
}

AddProbation.defaultProps = {
  submitting: false,
  edited: false
};

AddProbation.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  type: state.auth.type,
  item: state.profile.item,
  modalName: state.modal.name,
  profile: state.profile,
  submitting: state.profile.submitting,
  edited: state.profile.edited
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  onSubmit: (item,type) =>  (new Promise((resolve,reject)=> (
    dispatch(updateProfileRequest(item,resolve,reject,type))
  ))),

  onClick: () => dispatch(submit('addProbationProfile')),
  onChange: (item) => dispatch(updateProbationStore(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProbation);
