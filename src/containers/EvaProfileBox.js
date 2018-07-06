import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment,Grid , Header, Icon, Button, Dropdown, Container, Divider} from 'semantic-ui-react';
import ProfileBox from '../components/ProfileBox';
import { openModal } from '../actions/modal';
import { fetchProbationRequest, fetchPerformanceRequest } from '../actions/profile';
import * as modalNames from '../constants/modalNames';
import './pages/css/EvaProfileBox.css'

const AngleDownButton = (
  <Button icon="angle down"></Button>
)

const EvaProfileBox = ({performanceProfile, evaProfile, openProbationModal, id, openPerformanceModal, type, fetchProbation, profileId, fetchPerformance}) => {
  console.log(evaProfile);
  const options = [
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
  performanceProfile.map(perf => options.push({text: perf.year ,onClick: () => {fetchPerformance(profileId,perf.year);openPerformanceModal()}}))
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
            <Button.Group>
              <Dropdown trigger={AngleDownButton} options={options} />
              <Button onClick={() => {fetchPerformance(profileId,(new Date()).getFullYear());openPerformanceModal();}} disabled={type!='admin' && performanceProfile.length==0}>{performanceProfile.length==0 ? 'Add Performance' : 'Performance'}</Button>
            </Button.Group>
        </div>
            <Button icon labelPosition='left' disabled={type!='admin' && !evaProfile} icon={evaProfile==null ? 'plus':'angle right'} content={!evaProfile && type=='admin' ? 'Create Probation':'View Probation'} onClick={()=>{fetchProbation(profileId);openProbationModal()}} color={!evaProfile && type=='admin' ? 'green':'blue'}/>
            <Button icon labelPosition='left' icon={'angle right'} content={'SELF'} onClick={()=>{openProbationModal()}} color={'yellow'}/>

      </Segment>


    </Segment.Group>

  );
};

EvaProfileBox.defaultProps = {
  evaProfile: null
};

EvaProfileBox.propTypes = {
  evaProfile: PropTypes.object,
  openProbationModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profileId: state.profile.id,
  id: state.auth.id,
  type: state.auth.type
})

const mapDispatchToProps = dispatch =>({
  openPerformanceModal: () => dispatch(openModal(modalNames.ADD_PERFORMANCE)),
  openSelfAssessment: () => dispatch(openModal(modalNames.ADD_SELFASSESSMENT)),
  openProbationModal: () => dispatch(openModal(modalNames.ADD_PROBATION)),
  fetchProbation: (id) => dispatch(fetchProbationRequest(id)),
  fetchPerformance: (id,year) => dispatch(fetchPerformanceRequest(id,year))
});

export default connect(mapStateToProps, mapDispatchToProps)(EvaProfileBox);
