import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment,Grid , Header, Icon, Button, Dropdown } from 'semantic-ui-react';
import ProfileBox from '../components/ProfileBox';
import { openModal } from '../actions/modal';
import * as modalNames from '../constants/modalNames';

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
          <Grid.Column floated="right" computer={1} mobile={2}>
            <Icon name="add" link size="large" onClick={onAddClick} />
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment raised padded size="large">
        <Dropdown text='Performance' icon='angle down' floating labeled button className='icon'>
          <Dropdown.Menu>
            <Dropdown.Header icon='tags' content='Year' />
            <Dropdown.Divider />
            <Dropdown.Item>2018</Dropdown.Item>
            <Dropdown.Item>2017</Dropdown.Item>
            <Dropdown.Item>2016</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon='angle right'>See all</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
