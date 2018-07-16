import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import { updateProfileRequest, updateProbationStore, clearProbationStore } from '../../actions/profile';
import Modal from '../../components/EvaluationModal';
import A from '../pages/SelfAssessmentForm'
import Loader from '../../components/Loader';

class AddSelfAssessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.type = (this.props.profile.selfInfo == null ? 'addProbation' : 'updateProbation')
  }
  componentDidMount() {
    console.log(this.state.edited);
  }
  render() {
    return (
      <div>
        {this.props.fetching ? <Loader /> :
          <Modal
            header={this.props.profile.selfInfo == null ? 'Create Self Assessment':'View Self Assessment'}
            onClose={()=>{this.props.onClose();this.props.clear();}}
            onClick={()=>this.props.onSave(this.props.item,(this.props.profile.self == null ? 'addSelfAssessment':'updateSelfAssessment'))}
            onSubmit={()=>this.props.onSubmit(null,'submitSelfAssessment')}
            submit={true}
            submitting={this.props.submitting}
            size="large"
            disable={!this.props.edited || (this.props.profile.selfInfo && this.props.profile.selfInfo.submit)}
            disableSubmit={this.props.edited || !this.props.profile.self || (this.props.profile.selfInfo && this.props.profile.selfInfo.submit)}
            navButton={true}
            onChangePage={(nextPage)=>{this.props.onChange({...this.props.item,currentPage: (this.props.item.currentPage+nextPage+4)%4},'page')}}
            currentPage={this.props.item.currentPage}
            totalPage={4}
          >
            <A test={(item)=>{this.props.onChange(item,'selfassessment')}} profile={this.props.profile} item={this.props.profile.item}  mode={this.props.profile.selfInfo ? this.props.profile.selfInfo.submit==true ? 'view':'edit':'edit'}/>
          </Modal>
        }
      </div>
    );
  }
}

AddSelfAssessment.defaultProps = {
  submitting: false,
  edited: false
};

AddSelfAssessment.propTypes = {
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
  edited: state.profile.edited,
  fetching: state.profile.proFetching
});

const mapDispatchToProps = dispatch => ({
  clear: () => dispatch(clearProbationStore()),
  onClose: () => dispatch(closeModal()),
  onSave: (item, type) => (new Promise((resolve, reject) => (
    dispatch(updateProfileRequest(item, resolve, reject, type))
  ))),
  onSubmit: (item, type) => (new Promise((resolve, reject) => (
    dispatch(updateProfileRequest(item, resolve, reject, type))
  ))),
  onClick: () => dispatch(submit('addProbationProfile')),
  onChange: (item,type) => dispatch(updateProbationStore(item,type))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSelfAssessment);
