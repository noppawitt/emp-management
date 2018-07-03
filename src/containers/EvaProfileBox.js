import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment,Grid , Header, Icon, Button, Dropdown, Container, Divider} from 'semantic-ui-react';
import ProfileBox from '../components/ProfileBox';
import { openModal } from '../actions/modal';
import { fetchProbationRequest } from '../actions/profile';
import * as modalNames from '../constants/modalNames';
import './pages/css/EvaProfileBox.css'

const AngleDownButton = (
  <Button icon="angle down"></Button>
)

const EvaProfileBox = ({performanceProfile, evaProfile, openProbationModal, id, openPerformanceModal, type, fetchProbation, profileId}) => {
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
    },
    { text: '2018' },
    { text: '2017' },
    { text: '2016' },

  ]
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
              <Button onClick={openPerformanceModal} disabled={type!='admin' && performanceProfile.length==0}>{performanceProfile.length==0 ? 'Add Performance' : 'Performance'}</Button>
            </Button.Group>
        </div>
            <Button icon labelPosition='left' disabled={type!='admin' && !evaProfile} icon={evaProfile==null ? 'plus':'angle right'} content={!evaProfile && type=='admin' ? 'Create Probation':'View Probation'} onClick={()=>{fetchProbation(profileId);openProbationModal()}} color={!evaProfile && type=='admin' ? 'green':'blue'}/>
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
  openProbationModal: () => dispatch(openModal(modalNames.ADD_PROBATION)),
  fetchProbation: (id) => dispatch(fetchProbationRequest(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EvaProfileBox);
