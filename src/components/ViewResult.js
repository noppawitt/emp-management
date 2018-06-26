import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid, Menu } from 'semantic-ui-react';
import ExamPositionRequired from './ExamPositionRequired';
// import { Link } from 'react-router-dom';

const ViewResult = ({ results, activeItem, changeActiveItem, eprList }) => (
  <Segment>
    <Grid>
      <Grid.Column width={3}>
        <Menu fluid vertical tabular>
          {/* A static home page tab */}
          <Menu.Item name="Overall" active={activeItem === 'overall'} onClick={() => changeActiveItem('overall')} />
          {/* Change this to dynamic-with-exam-type tab */}
          <Menu.Item name="Category 1" active={activeItem === '1'} onClick={() => changeActiveItem('1')} />
          <Menu.Item name="Category 2" active={activeItem === '2'} onClick={() => changeActiveItem('2')} />
          <Menu.Item name="Category 3" active={activeItem === '3'} onClick={() => changeActiveItem('3')} />
          <Menu.Item name="Category 4" active={activeItem === '4'} onClick={() => changeActiveItem('4')} />
        </Menu>
      </Grid.Column>
      <Grid.Column stretched width={12}>
        <Segment>
          {console.log(eprList)}
          {activeItem === 'overall' && eprList !== undefined ?
            <ExamPositionRequired eprList={eprList} /> : results}
        </Segment>
      </Grid.Column>
    </Grid>
  </Segment>
);

ViewResult.propTypes = {
  results: PropTypes.array.isRequired,
  activeItem: PropTypes.string.isRequired,
  changeActiveItem: PropTypes.func.isRequired,
  eprList: PropTypes.array.isRequired,
};

export default ViewResult;
