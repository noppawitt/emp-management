import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment,Grid , Header, Icon, Button, Dropdown, Container, Divider} from 'semantic-ui-react';
import ProfileBox from '../components/ProfileBox';
import { openModal } from '../actions/modal';
import * as modalNames from '../constants/modalNames';
import './pages/css/Form_G_I.css';

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

const AngleDownButton = (
  <Button icon="angle down"></Button>
)

const EvaProfileBox = ({evaProfile, onAddClick, id}) => {
  console.log(evaProfile);
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
              <Button>Performance</Button>
            </Button.Group>
        </div>
            <Button icon labelPosition='left' icon={evaProfile==null ? 'plus':'angle right'} content={evaProfile==null ? 'Create Probation':'View Probation'} onClick={onAddClick} color={evaProfile==null ? 'green':'blue'}/>
      </Segment>


    </Segment.Group>

  );
};

EvaProfileBox.defaultProps = {
  evaProfile: null
};

EvaProfileBox.propTypes = {
  evaProfile: PropTypes.object,
  onAddClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  id: state.auth.id
})

const mapDispatchToProps = dispatch =>({
  onAddClick: () => dispatch(openModal(modalNames.ADD_PROBATION))
});

export default connect(mapStateToProps, mapDispatchToProps)(EvaProfileBox);
