import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid, Menu } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';

const ViewResult = ({ results, activeItem, handleClickTabular }) => (
  <Segment>
    <Grid>
      <Grid.Column width={3}>
        <Menu fluid vertical tabular>
          <Menu.Item name="1" active={activeItem === '1'} onClick={handleClickTabular} />
          <Menu.Item name="2" active={activeItem === '2'} onClick={handleClickTabular} />
          <Menu.Item name="3" active={activeItem === '3'} onClick={handleClickTabular} />
          <Menu.Item name="4" active={activeItem === '4'} onClick={handleClickTabular} />
        </Menu>
      </Grid.Column>
      <Grid.Column stretched width={12}>
        <Segment>
          <p>this is description!</p>
          {console.log(results, activeItem, handleClickTabular)}
        </Segment>
      </Grid.Column>
    </Grid>
  </Segment>
);

ViewResult.propTypes = {
  results: PropTypes.array.isRequired,
  activeItem: PropTypes.string.isRequired,
  handleClickTabular: PropTypes.func.isRequired,
};

export default ViewResult;
