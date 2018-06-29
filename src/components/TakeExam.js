import React from 'react';
import PropTypes from 'prop-types';
// import Modal from '../../components/modal';
import { Segment, Grid, Menu } from 'semantic-ui-react';

const TakeExam = ({
  cid,
  activeItem,
  changeActiveItem,
  eprList }) =>
  (
    <Segment.Group>
      <Segment>
        <h1>Timer here</h1>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={3}>
            <Menu fluid vertiacal tabular>
              <Menu.Item name="1" active={activeItem === '1'} onClick={() => changeActiveItem('1')} />
              {eprList && eprList.map(eachRow => (
                <Menu.Item
                  name={eachRow.category + eachRow.subCategory}
                  active={activeItem === eachRow.category + eachRow.subCategory}
                  onClick={() => changeActiveItem(eachRow.category + eachRow.subCategory)}
                />
              ))}
            </Menu>
          </Grid.Column>
          <Grid.Column width={12} stretched>
            <Segment>
              <div>{cid}</div>
            </Segment>
            {/* show exam according to 'activeMenuItem' below this */}
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );

TakeExam.propTypes = {
  cid: PropTypes.string.isRequired,
  activeItem: PropTypes.string.isRequired,
  changeActiveItem: PropTypes.func.isRequired,
  eprList: PropTypes.array.isRequired,
};

export default TakeExam;
