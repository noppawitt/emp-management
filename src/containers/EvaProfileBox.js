import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Header, Icon, Button, Dropdown, Container, Divider } from 'semantic-ui-react';
import ProfileBox from '../components/ProfileBox';
import { openModal } from '../actions/modal';
import { fetchProbationRequest, fetchPerformanceRequest, fetchSelfAssessmentRequest, clearProbationStore } from '../actions/profile';
import * as modalNames from '../constants/modalNames';
import './pages/css/EvaProfileBox.css'

const AngleDownButton = (
  <Button icon="angle down" ></Button>
)

const EvaProfileBox = ({clear, can, performanceProfile, evaProfile, selfProfile, openProbationModal, openPerformanceModal, type, fetchProbation, profileId, fetchPerformance, openSelfAssessmentModal, fetchSelfAssessment, id }) => {

  const optionsPerf = [
    {
      key: 'user',
      text: (
        <span>
          Year
        </span>
      ),
      disabled: true,
    }
  ]

  const optionsPro = [
    {
      text: 'Probation List',
      disabled: true
    }
  ]

  const canCreateProbation = (
    evaProfile.length == 0 && can.probationAdd
  )

  const canCreateContinueProbation = (
    evaProfile.length != 0 && can.probationAdd && evaProfile[0].passPro == false && evaProfile[0].continued == true && evaProfile[0].mdSignDate != null
  )

  const canCreatePerformance = (
    (performanceProfile.length == 0 || performanceProfile[0].year < (new Date()).getFullYear()) && can.performanceAdd
  )

  const cantClickProbation = (
    (!can.probationAdd && evaProfile.length == 0) || !selfProfile || !selfProfile.submited
  )

  const cantClickPerformance = (
    (!can.performanceAdd && performanceProfile.length == 0)
  )

  performanceProfile.map(perf =>
    optionsPerf.push({ text: perf.year, onClick: () => { fetchPerformance(profileId, perf.year); openPerformanceModal() } })
  )

  for (let i = 0; i < evaProfile.length; i++) {
    if (i == evaProfile.length - 1) {
      optionsPro.push({ text: 'Probation', onClick: () => { fetchProbation(profileId, evaProfile[i].id); openProbationModal(); } })
    }
    else optionsPro.push({ text: 'Continued Probation ' + (evaProfile.length - i - 1), onClick: () => { fetchProbation(profileId, evaProfile[i].id); openProbationModal(); } })
  }
  return (

    <Segment.Group raised size="large">
      <Segment padded>
        <Grid>
          <Grid.Column>
            <Header as="h2">
              <Icon name="columns" />
              <Header.Content>
                Evaluation
              </Header.Content>
            </Header>
          </Grid.Column>

        </Grid>
      </Segment>
      <Segment raised padded size="large">
        <div className="buttonGroup">
          <Button.Group
            color={
              canCreatePerformance ? 'green' : 'blue'
            }
          >
            <Dropdown trigger={AngleDownButton} options={optionsPerf} disabled={cantClickPerformance} />
            <Button onClick={() => {clear(); if (!canCreatePerformance) fetchPerformance(profileId, (new Date()).getFullYear()); openPerformanceModal(); }}
              disabled={cantClickPerformance}>
              {canCreatePerformance ? 'Create Performance' : 'Performance'}
            </Button>
          </Button.Group>
        </div>
        <div className="buttonGroup">
          <Button.Group
            color={
              canCreateProbation ? 'green' :
                canCreateContinueProbation ? 'green' : 'blue'
            }
          >
            <Dropdown trigger={AngleDownButton} options={optionsPro} disabled={cantClickProbation} />
            <Button onClick={() => {
              clear();
              if (!canCreateProbation && !canCreateContinueProbation)
                fetchProbation(profileId, evaProfile[0].id);
              openProbationModal();
            }
            }
              disabled={cantClickProbation}>
              {
                canCreateProbation ? 'Create Probation' :
                  canCreateContinueProbation ? 'Create Continue Probation' : 'Probation'
              }
            </Button>
          </Button.Group>
        </div>
        <Button icon labelPosition='left' icon={'angle right'}
          disabled={((profileId != id) && (!selfProfile || !selfProfile.submited))}
          content={selfProfile || profileId != id ? 'Self Assessment' : 'Create Self Assessment'}
          onClick={() => {clear(); if (selfProfile != null) fetchSelfAssessment(profileId); openSelfAssessmentModal() }}
          color={selfProfile || profileId != id ? 'yellow' : 'green'} />

      </Segment>


    </Segment.Group>

  );
};

EvaProfileBox.defaultProps = {
  evaProfile: null
};

EvaProfileBox.propTypes = {
  evaProfile: PropTypes.array,
  openProbationModal: PropTypes.func.isRequired
};
// <Button icon labelPosition='left' disabled={type!='admin' && !evaProfile} icon={evaProfile==null ? 'plus':'angle right'} content={!evaProfile && type=='admin' ? 'Create Probation':'View Probation'} onClick={()=>{fetchProbation(profileId);openProbationModal()}} color={!evaProfile && type=='admin' ? 'green':'blue'}/>
const mapStateToProps = state => ({
  profileId: state.profile.userId,
  type: state.auth.type,
  id: state.auth.id,
  can: state.accessControl.can
})

const mapDispatchToProps = dispatch => ({
  clear: () => dispatch(clearProbationStore()),
  openPerformanceModal: () => dispatch(openModal(modalNames.ADD_PERFORMANCE)),
  openSelfAssessmentModal: () => dispatch(openModal(modalNames.ADD_SELFASSESSMENT)),
  openProbationModal: () => dispatch(openModal(modalNames.ADD_PROBATION)),
  fetchProbation: (id, probationId) => dispatch(fetchProbationRequest(id, probationId)),
  fetchPerformance: (id, year) => dispatch(fetchPerformanceRequest(id, year)),
  fetchSelfAssessment: (id) => dispatch(fetchSelfAssessmentRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EvaProfileBox);
