import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid, Menu } from 'semantic-ui-react';
import ViewResultOverall from './ViewResultOverall';
// import { Link } from 'react-router-dom';

const ViewResult = ({
  results,
  activeItem,
  changeActiveItem,
  eprList,
  onSearchChange,
  sortKey,
  handleSort,
  direction,
  onStartDateChange,
  onEndDateChange,
  startDate,
  endDate }) =>
  (
    <Segment>
      <Grid>
        <Grid.Column width={3}>
          <Menu fluid vertical tabular>
            {/* <Menu fluid vertical tabular> */}
            {/* A static home page tab */}
            <Menu.Item name="Profile" active={activeItem === 'profile'} onClick={() => changeActiveItem('profile')} />
            <Menu.Item name="Overall" active={activeItem === 'overall'} onClick={() => changeActiveItem('overall')} />
            {/* Change this to dynamic-with-exam-type tab */}
            {eprList.map(eachRow => (
              // eachRow.subCategory
              <Menu.Item
                name={eachRow.category + eachRow.subCategory}
                active={activeItem === eachRow.category + eachRow.subCategory}
                onClick={() => changeActiveItem(eachRow.category + eachRow.subCategory)}
              />
            ))}
          </Menu>
        </Grid.Column>
        <Grid.Column stretched width={12}>
          {/* {console.log(eprList)} */}
          {/* this is where to pick components to display
              that depend on current-tabular: activeItem */}
          {activeItem === 'overall' && eprList !== undefined ?
            <ViewResultOverall
              eprList={eprList}
              handleSort={handleSort}
              sortKey={sortKey}
              direction={direction}
              startDate={startDate}
              endDate={endDate}
              onSearchChange={onSearchChange}
              onStartDateChange={onStartDateChange}
              onEndDateChange={onEndDateChange}
            />
            : results}
          {/* change this results --------------------------^
              to some components */}
        </Grid.Column>
      </Grid>
    </Segment>
  );

ViewResult.propTypes = {
  results: PropTypes.array.isRequired,
  activeItem: PropTypes.string.isRequired,
  changeActiveItem: PropTypes.func.isRequired,
  eprList: PropTypes.array.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
};

export default ViewResult;
