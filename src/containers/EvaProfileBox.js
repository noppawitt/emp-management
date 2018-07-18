import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment,Grid , Header, Icon, Button, Dropdown, Container, Divider} from 'semantic-ui-react';
import ProfileBox from '../components/ProfileBox';
import { openModal } from '../actions/modal';
import { fetchProbationRequest, fetchPerformanceRequest, fetchSelfAssessmentRequest} from '../actions/profile';
import * as modalNames from '../constants/modalNames';
import './pages/css/EvaProfileBox.css'

const AngleDownButton = (
  <Button icon="angle down" ></Button>
)

const EvaProfileBox = ({canCreate, performanceProfile, evaProfile, selfProfile, openProbationModal, openPerformanceModal, type, fetchProbation, profileId, fetchPerformance, openSelfAssessmentModal, fetchSelfAssessment}) => {

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
    evaProfile.length==0 && type=='1'
  )

  const canCreateContinueProbation = (
    evaProfile.length!=0 && type=='1' && evaProfile[0].passPro==false && evaProfile[0].continued==true && evaProfile[0].mdSignDate!=null
  )

  const canCreatePerformance = (
    (performanceProfile.length==0 || performanceProfile[0].year<(new Date()).getFullYear()) && type=='1'
  )
  
  const cantClickProbation = (
    (type!='1' && evaProfile.length==0) || !selfProfile || !selfProfile.submited || !canCreate
  )

  const cantClickPerformance = (
    (type!='1' && performanceProfile.length==0) || !canCreate
  )

  performanceProfile.map(perf =>
    optionsPerf.push({text: perf.year ,onClick: () => {fetchPerformance(profileId,perf.year);openPerformanceModal()}})
  )

  for(let i = 0;i<evaProfile.length;i++){
    if(i==evaProfile.length-1){
      console.log()
      optionsPro.push({text: 'Probation', onClick: () =>{fetchProbation(profileId,evaProfile[i].probationId);openProbationModal();}})
    }
    else optionsPro.push({text: 'Continued Probation '+ (evaProfile.length-i-1),onClick: () => {fetchProbation(profileId,evaProfile[i].probationId);openProbationModal();}})
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
                canCreatePerformance  && canCreate ? 'green' : 'blue'
              }
            >
              <Dropdown trigger={AngleDownButton} options={optionsPerf} disabled={cantClickPerformance}/>
              <Button onClick={() => {if(!canCreatePerformance)fetchPerformance(profileId,(new Date()).getFullYear());openPerformanceModal();}}
                disabled={cantClickPerformance}>
                {canCreatePerformance  && canCreate ? 'Create Performance' : 'Performance'}
              </Button>
            </Button.Group>
        </div>
        <div className="buttonGroup">
            <Button.Group
              color={
                !canCreate ? 'blue' :
                canCreateProbation ? 'green':
                canCreateContinueProbation ? 'green' : 'blue'
              }
            >
              <Dropdown trigger={AngleDownButton} options={optionsPro} disabled={cantClickProbation}/>
              <Button onClick={() => {
                  if(!canCreateProbation && !canCreateContinueProbation)
                    fetchProbation(profileId,evaProfile[0].id);
                  openProbationModal();}
                }
                disabled={cantClickProbation}>
                {
                  !canCreate ?  'Probation' :
                  canCreateProbation ? 'Create Probation':
                  canCreateContinueProbation ? 'Create Continue Probation' : 'Probation'
                }
              </Button>
            </Button.Group>
        </div>
            <Button icon labelPosition='left' icon={'angle right'}
              disabled={(type!='2' && (!selfProfile || !selfProfile.submited))}
              content={selfProfile || type=='1' ? 'Self Assessment' : 'Create Self Assessment'}
              onClick={()=>{if(selfProfile!=null)fetchSelfAssessment(profileId);openSelfAssessmentModal()}}
              color={selfProfile || type=='1' ? 'yellow':'green'}/>

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
  id: state.auth.id
})

const mapDispatchToProps = dispatch =>({
  openPerformanceModal: () => dispatch(openModal(modalNames.ADD_PERFORMANCE)),
  openSelfAssessmentModal: () => dispatch(openModal(modalNames.ADD_SELFASSESSMENT)),
  openProbationModal: () => dispatch(openModal(modalNames.ADD_PROBATION)),
  fetchProbation: (id,probationId) => dispatch(fetchProbationRequest(id,probationId)),
  fetchPerformance: (id,year) => dispatch(fetchPerformanceRequest(id,year)),
  fetchSelfAssessment: (id) => dispatch(fetchSelfAssessmentRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EvaProfileBox);
